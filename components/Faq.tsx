"use client";

import { useState } from "react";
import { FAQ } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq">
      {FAQ.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className={`card fq rv${isOpen ? " o" : ""}`}>
            <h3 style={{ font: "inherit" }}>
              <button
                className="q"
                aria-expanded={isOpen}
                aria-controls={`fa${i}`}
                id={`fb${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {q}
                <span aria-hidden="true">+</span>
              </button>
            </h3>
            <div className="fa" id={`fa${i}`} role="region" aria-labelledby={`fb${i}`}>
              <div><p>{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
