# Supabase setup (form intake)

## 1. Create a project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a project.
2. In **Project Settings → API**, copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 2. Run the migration

In the Supabase dashboard, open **SQL Editor** and run the contents of:

`supabase/migrations/20260521000000_create_leads.sql`

Or, with the [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## 3. Configure the landing page

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Restart `pnpm dev`.

## 4. View signups

**Table Editor → `leads`** in the Supabase dashboard, or SQL:

```sql
select * from leads order by created_at desc;
```

## Security

- RLS allows **insert only** for anonymous users (no public read of emails).
- Never put the **service_role** key in the Vite app.
- Use the service role only in server-side scripts or Edge Functions if you add an admin export later.
