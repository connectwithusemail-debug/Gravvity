import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { wings } from "@/lib/data";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Brand */}
          <div className="flex sm:block flex-col items-center">
            <div >
            <Link href="/" className="flex items-center my-4 gap-2">
            <img
              src="/gravity-logo.ico"
              alt="Gravity Logo"
              className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(124,92,255,0.3)] transition-transform duration-200 ease-out hover:scale-105"
            />
            <span className="font-bold text-xl gradient-text">
              GRAVITY
            </span>
          </Link></div>
            <p className="text-foreground/60 text-sm">
              Technical Society for Innovation & Excellence
            </p>
            <a
              href="https://iiita.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 text-sm mt-2 hover:text-foreground transition"
            >
              IIIT Allahabad
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col text-sm items-center md:items-start">
              <Link
                href="/about"
                className="block text-foreground/70 w-fit hover:text-foreground transition py-1"
              >
                About
              </Link>
              <Link
                href="/events"
                className="block w-fit text-foreground/70 hover:text-foreground transition py-1"
              >
                Events
              </Link>
              <Link
                href="/projects"
                className="block w-fit text-foreground/70 hover:text-foreground transition py-1"
              >
                Projects
              </Link>
              <Link
                href="/blogs"
                className="block w-fit text-foreground/70 hover:text-foreground transition py-1"
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="block w-fit text-foreground/70 hover:text-foreground transition py-1"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Wings (link to filtered members page) */}
          <div>
            <h4 className="font-semibold mb-4">Wings</h4>
            <div className="space-y-2 text-sm flex flex-col items-center md:items-start">
              {wings.map((w) => (
                <Link
                  key={w.id}
                  href={`/members?wing=${encodeURIComponent(w.name)}`}
                  className="block w-fit text-foreground/70 hover:text-foreground transition"
                >
                  {w.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                aria-label="Gravity on GitHub"
                className="text-foreground/60 hover:text-primary transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/gravity-iiit-allahabad/"
                aria-label="Gravity on LinkedIn"
                className="text-foreground/60 hover:text-primary transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/gravityiiita/"
                aria-label="Gravity on Instagram"
                className="text-foreground/60 hover:text-primary transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:gravity@iiita.ac.in"
                aria-label="Contact Gravity"
                className="text-foreground/60 hover:text-primary transition"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Removed lower legal section per request */}
      </div>
    </footer>
  );
}
