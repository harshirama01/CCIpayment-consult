import Link from "next/link";
import { ROUTES } from "@/lib/content";
import { Info } from "./ui";

export default function Footer() {
  return (
    <footer>
      <div className="c">
        <div>
          <h2>CCI Payments</h2>
          <p>Making international payments easier, one transaction at a time.</p>
        </div>
        <div>
          <h2>Pages</h2>
          <ul id="fl">
            {ROUTES.map((r) => <li key={r.href}><Link href={r.href}>{r.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2>Reach us</h2>
          <div id="fr"><Info /></div>
        </div>
      </div>
    </footer>
  );
}
