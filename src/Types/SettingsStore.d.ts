declare type SettingsStore = {
  language: Language;
  baseColor: HexColor;
  tintColor: HexColor;
  contentColor: HexColor;
  feature_flags: {
    use: { views: { public_profile: boolean } };
    my_vorte: {
      disabled: boolean;
      views: {
        tasks: boolean;
        calendar: boolean;
        time_tracking: boolean;
        networking: boolean;
        rte: boolean;
      };
    };
    vortepreneur: {
      disabled: boolean;
      views: { organization: boolean };
    };
  };
};
