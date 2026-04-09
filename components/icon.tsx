import type { SVGProps } from "react";

type IconName =
  | "analytics"
  | "archive"
  | "arrow-right"
  | "arrow-up-right"
  | "bell"
  | "check-circle"
  | "clock"
  | "database"
  | "document"
  | "download"
  | "flask"
  | "globe"
  | "history"
  | "list"
  | "search"
  | "server"
  | "settings"
  | "share"
  | "shield"
  | "shield-alert"
  | "shield-heart"
  | "sliders"
  | "user"
  | "warning";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, className, ...props }: IconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
    ...props,
  };

  switch (name) {
    case "analytics":
      return (
        <svg {...common}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20v-11" />
        </svg>
      );
    case "archive":
      return (
        <svg {...common}>
          <path d="M4 7h16v4H4z" />
          <path d="M6 11h12v9H6z" />
          <path d="M10 15h4" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M7 17 17 7" />
          <path d="M9 7h8v8" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      );
    case "check-circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12 2.2 2.2 4.8-4.8" />
        </svg>
      );
    case "clock":
    case "history":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M8 3h6l4 4v14H8z" />
          <path d="M14 3v5h5" />
          <path d="M10 13h6" />
          <path d="M10 17h6" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 4v10" />
          <path d="m8 10 4 4 4-4" />
          <path d="M5 20h14" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common}>
          <path d="M10 3v5l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
          <path d="M8 13h8" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a15 15 0 0 1 0 18" />
          <path d="M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M9 6h11" />
          <path d="M9 12h11" />
          <path d="M9 18h11" />
          <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      );
    case "server":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="6" rx="1.5" />
          <rect x="4" y="14" width="16" height="6" rx="1.5" />
          <path d="M8 7h.01" />
          <path d="M8 17h.01" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.7Z" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="2" />
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="19" r="2" />
          <path d="m8 11 8-5" />
          <path d="m8 13 8 5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.4 3 8.4 7 9 4-0.6 7-4.6 7-9V6l-7-3Z" />
        </svg>
      );
    case "shield-alert":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.4 3 8.4 7 9 4-0.6 7-4.6 7-9V6l-7-3Z" />
          <path d="M12 8v5" />
          <path d="M12 16h.01" />
        </svg>
      );
    case "shield-heart":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.4 3 8.4 7 9 4-0.6 7-4.6 7-9V6l-7-3Z" />
          <path d="m12 16-2.2-2.1a1.7 1.7 0 0 1 2.4-2.4l.1.1.1-.1a1.7 1.7 0 1 1 2.4 2.4L12 16Z" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <path d="M4 6h8" />
          <path d="M16 6h4" />
          <path d="M4 12h4" />
          <path d="M12 12h8" />
          <path d="M4 18h10" />
          <path d="M18 18h2" />
          <circle cx="14" cy="6" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="16" cy="18" r="2" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path d="M12 4 3 20h18L12 4Z" />
          <path d="M12 10v4" />
          <path d="M12 17h.01" />
        </svg>
      );
  }
}
