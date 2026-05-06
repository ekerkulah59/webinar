import { Link } from "wouter";
import { Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-2 border-accent/50 bg-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <img src="/logo-full-dark.svg" alt="EaseIntoAI" className="h-14 w-auto" />
            <p className="text-sm text-background/60 leading-relaxed max-w-sm">
              AI Educator &amp; Builder. Hosting free, practical webinars to
              help people navigate the world of artificial intelligence with
              clarity and confidence.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-background/60" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4 text-background/60" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-background">Quick Links</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-background/60 hover:text-background transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/past-webinars" className="text-sm text-background/60 hover:text-background transition-colors">
                  Past Webinars
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm text-background/60 hover:text-background transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-background">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:theaibootcamp09@gmail.com"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  theaibootcamp09@gmail.com
                </a>
              </li>
            </ul>
            <div className="pt-4">
              <a
                href="https://www.easetranslate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Check out EaseTranslate →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} EaseIntoAI. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            Built with purpose. Powered by curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
