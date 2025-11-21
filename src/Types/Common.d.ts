// Types/types.d.ts
declare namespace Common {
  type Language = "fi" | "sv" | "en";
  type MascotName = "vor" | "vortiina" | "vortius";
  type ViewName =
    | "home"
    | "calendar"
    | "calendar_day"
    | "calendar_week"
    | "calendar_month"
    | "calendar_config";
  type HTMLText = "</>";
  type CSSText = "CSSSelector {}";
  type UUIDv4 = `${string}-${string}-${string}-${string}-${string}`;
  type HEX_COLOR = "#rrggbb";
  type ISO_DATE = "YYYY-MM-DD";
}
