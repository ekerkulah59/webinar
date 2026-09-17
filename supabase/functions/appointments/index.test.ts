import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  getBusy: vi.fn(),
  computeSlots: vi.fn(),
  createEvent: vi.fn(),
  deleteEvent: vi.fn(),
  sendConfirmation: vi.fn(),
  sendOwnerNotification: vi.fn(),
  sendCancellation: vi.fn(),
}));
vi.mock("npm:@supabase/supabase-js@2", () => ({
  createClient: mocks.createClient,
}));
vi.mock("./google.ts", () => mocks);
vi.mock("./email.ts", () => mocks);
vi.mock("./slots.ts", () => ({ computeSlots: mocks.computeSlots }));
vi.mock("./config.ts", () => ({
  BOOKING: {
    ownerTimeZone: "America/New_York",
    slotMinutes: 30,
    maxAdvanceDays: 30,
    videoMeetingUrl: "",
    appointmentTitle: "Intro call",
  },
}));

let api: (request: Request) => Promise<Response>;
const existing = {
  id: "test",
  name: "Test",
  email: "test@example.com",
  phone: "2025550100",
  meeting_mode: "phone",
  starts_at: "2026-09-15T16:00:00.000Z",
  ends_at: "2026-09-15T16:30:00.000Z",
  status: "confirmed",
  manage_token: "a".repeat(48),
  google_event_id: "old-event",
};
const newStart = "2026-09-16T16:00:00.000Z";
let mutations: Record<string, unknown>[];
let updateError: { code: string; message: string } | null;

beforeAll(async () => {
  vi.stubGlobal("Deno", {
    env: { get: () => "test" },
    serve: (handler: typeof api) => {
      api = handler;
    },
  });
  await import("./index");
});
beforeEach(() => {
  vi.clearAllMocks();
  mutations = [];
  updateError = null;
  mocks.getBusy.mockResolvedValue([]);
  mocks.computeSlots.mockReturnValue([{ startsAt: newStart }]);
  mocks.createEvent.mockResolvedValue("new-event");
  mocks.createClient.mockReturnValue({
    from: () => {
      let update: Record<string, unknown> | null = null;
      const query: any = {
        select: () => query,
        eq: () => query,
        lt: () => query,
        gt: () => query,
        update: (value: Record<string, unknown>) => {
          update = value;
          mutations.push(value);
          return query;
        },
        maybeSingle: async () => ({ data: existing }),
        single: async () => ({
          data: { ...existing, ...update },
          error: updateError,
        }),
        then: (resolve: (value: unknown) => void) =>
          Promise.resolve({
            data: [],
            error: update ? updateError : null,
          }).then(resolve),
      };
      return query;
    },
  });
});
const request = (action: string, extra = {}) =>
  api(
    new Request("https://test.invalid", {
      method: "POST",
      body: JSON.stringify({
        action,
        token: existing.manage_token,
        startsAt: newStart,
        ...extra,
      }),
    })
  );

describe("reschedule preserves the original appointment on failure", () => {
  it("does not change the booking if calendar availability fails", async () => {
    mocks.getBusy.mockRejectedValue(new Error("google_not_configured"));
    expect((await request("reschedule")).status).toBe(503);
    expect(mutations).toEqual([]);
    expect(mocks.deleteEvent).not.toHaveBeenCalled();
  });
  it("does not release the existing appointment for an unavailable time", async () => {
    mocks.computeSlots.mockReturnValue([]);
    expect((await request("reschedule")).status).toBe(409);
    expect(mutations).toEqual([]);
    expect(mocks.deleteEvent).not.toHaveBeenCalled();
  });
  it("keeps the old calendar event if another visitor wins the slot", async () => {
    updateError = { code: "23P01", message: "overlap" };
    expect((await request("reschedule")).status).toBe(409);
    expect(mutations.some(value => value.status === "cancelled")).toBe(false);
    expect(mocks.deleteEvent).not.toHaveBeenCalled();
    expect(mocks.sendConfirmation).not.toHaveBeenCalled();
  });
  it("moves the booking before replacing the calendar event", async () => {
    expect((await request("reschedule")).status).toBe(200);
    expect(mutations[0]).toMatchObject({
      starts_at: newStart,
      status: "confirmed",
    });
    expect(mocks.deleteEvent).toHaveBeenCalledWith(
      expect.anything(),
      "old-event"
    );
    expect(mocks.createEvent).toHaveBeenCalledOnce();
    expect(mocks.sendConfirmation).toHaveBeenCalledOnce();
  });
  it("does not delete the calendar event when cancellation cannot be saved", async () => {
    updateError = { code: "offline", message: "database unavailable" };
    expect((await request("cancel")).status).toBe(500);
    expect(mocks.deleteEvent).not.toHaveBeenCalled();
    expect(mocks.sendCancellation).not.toHaveBeenCalled();
  });
});
