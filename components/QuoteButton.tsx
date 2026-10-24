"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

export const GO_FORM_EVENT = "cci:go-form";

/** "Request a Quote" link. On /contact it focuses the form; elsewhere it navigates there and the form takes focus. */
export default function QuoteButton({
  label = "Request a Quote",
  variant = "p",
  arrow = true,
  onNavigate,
  className = "",
}: {
  label?: string;
  variant?: "p" | "";
  arrow?: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      className={`btn ${variant} ${className}`.trim()}
      href="/contact#quote"
      onClick={(e) => {
        onNavigate?.();
        if (pathname === "/contact") {
          e.preventDefault();
          window.dispatchEvent(new Event(GO_FORM_EVENT));
        }
      }}
    >
      {label}
      {arrow ? <Icon k="arrow" /> : null}
    </Link>
  );
}
