declare type Calendar = {
  config: {
    categories: {
      id: UUIDv4;
      name: string;
      hex_color: string;
    }[];
    notifications: {
      push: boolean;
      email: boolean;
    };
    week_starts_on: {
      monday: boolean;
      sunday: boolean;
    };
    displayed_on_week_view: {
      saturday: boolean;
      sunday: boolean;
    };
  };
  events: {
    [isoDate: string]: {
      event_host: string;
      event_invitees: string[];
      event_category: string;
      event_info: string;
      event_starts_at: string;
      event_duration_minutes: number;
    }[];
  };
};

declare type CalendarCellType = "prev" | "curr" | "next";

declare type CalendarCell = {
  d: number;
  type: CalendarCellType;
  date?: string;
};

declare type CalendarWeekInfo = {
  date: string; // ISO yyyy-mm-dd
  number: number; // ISO week number
};

declare type CalendarTableRow = Array<string | CalendarWeekInfo | CalendarCell>;

declare type CalendarMonthTable = CalendarTableRow[];
