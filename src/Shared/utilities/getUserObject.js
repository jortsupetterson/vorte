export default async (isDemo) => {
  if (isDemo)
    return {
      id: "UUIDv4",
      firstname: DEFAULT_FIRSTNAME,
      lastname: DEFAULT_LASTNAME,
      widget_list: DEFAULT_WIDGET_LIST,
      my_vorte_app_list: DEFAULT_MY_VORTE_APP_LIST,
      vortepreneur_organization_list: DEAFULT_VORTEPRENEUR_ORGANIZATION_LIST,
    };
  const userRes = await negotiateCache(new Request(`/user.json`));
  const userBytes = await userRes.arrayBuffer();
  const user = await zipper.unzip(userBytes);
  return user;
};
import negotiateCache from "./negotiateCache";
import zipper from "../WebCrypto/zipper";
import {
  DEFAULT_WIDGET_LIST,
  DEFAULT_MY_VORTE_APP_LIST,
  DEAFULT_VORTEPRENEUR_ORGANIZATION_LIST,
  DEFAULT_FIRSTNAME,
  DEFAULT_LASTNAME,
} from "../CONFIG";
