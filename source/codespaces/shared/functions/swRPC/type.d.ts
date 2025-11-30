declare type DataStore = "CalendarStore";
declare type DataDiff = "HomeNavigationData";
declare type CRUDOperation = "read" | "update" | "write" | "delete";
declare type RPC = `diff.${DataDiff}` | `${DataStore}.${CRUDOperation}`;
