"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/playground", label: "Playground" },
    { href: "/concepts", label: "Concepts" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-flow-surface border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-xl font-bold text-flow-accent-primary tracking-tight">
          FlowTrace
        </span>
        <div className="flex gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-flow-accent-primary"
                    : "text-flow-text-muted hover:text-flow-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
