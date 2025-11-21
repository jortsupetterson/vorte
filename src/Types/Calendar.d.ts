declare type Calendar = {
  config: {
    categories: {
      name: string;
      hex_color: string;
    }[];
    notifications: {
      push: boolean;
      email: boolean;
    };
    week_starts_on: "monday" | "sunday";
    displayed_on_week_view: {
      saturday: boolean;
      sunday: boolean;
    };
  };
  events: {
    [isoDate: string]: {
      host: string;
      invitees: object[];
      category: string;
      info: string;
      starts_at: string;
      duration_minutes: number;
    }[];
  };
};
