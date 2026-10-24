import { ICON_PATHS, type IconKey } from "@/lib/content";

export function Icon({ k, size }: { k: IconKey; size?: number }) {
  return (
    <svg className="i" viewBox="0 0 24 24" aria-hidden="true" {...(size ? { width: size, height: size } : {})}>
      <path d={ICON_PATHS[k]} />
    </svg>
  );
}
