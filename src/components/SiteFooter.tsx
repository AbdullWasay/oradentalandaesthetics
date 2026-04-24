import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/ora-logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ORA" className="h-10 w-10" width={40} height={40} loading="lazy" />
            <div className="leading-tight">
              <div className="font-display text-2xl">ORA</div>
              <div className="font-sans-tight text-[0.6rem] text-muted-foreground">Dental & Aesthetic Clinic</div>
            </div>
          </div>
          <p className="mt-6 max-w-md font-display text-2xl leading-snug text-foreground/80">
            A quieter way to care for your smile — sculpted in light, guided by science.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="rounded-full border border-foreground/30 p-3 transition-colors hover:bg-foreground hover:text-background"><Instagram className="h-4 w-4" /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="rounded-full border border-foreground/30 p-3 transition-colors hover:bg-foreground hover:text-background"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-sans-tight text-muted-foreground">Visit</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> F-7 Markaz, Islamabad, Pakistan</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 text-accent" /> +92 51 000 0000</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent" /> hello@oraclinic.pk</li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans-tight text-muted-foreground">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/treatments" className="hover:text-accent">Treatments</Link></li>
            <li><Link to="/reviews" className="hover:text-accent">Reviews</Link></li>
            <li><Link to="/atelier" className="hover:text-accent">Atelier</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center font-sans-tight text-muted-foreground lg:px-10">
        © {new Date().getFullYear()} ORA Dental & Aesthetic Clinic — All rights reserved
      </div>
    </footer>
  );
}
