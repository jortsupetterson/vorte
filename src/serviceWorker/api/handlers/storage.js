/**
 * @typedef {object} rpc
 * @property {"CalendarObject"|"UserObject"} namespace
 * @property {"create"|"read"|"update"|"delete"} operation
 * @property {string[]} path
 * @property {string} [search]
 * @property {any} [value]
 */

/**
 * @param {rpc}
 */
export default ({ namespace, operation, path, search, value, isDemo }) => {
  const stub = storage[namespace][operation];
  stub({ path, search, value, isDemo });
};

const storage = Object.freeze({
  CalendarObject,
  UserObject,
});

import CalendarObject from "../../../Shared/Utilities/Storage/CalendarObject";
import UserObject from "../../../Shared/Utilities/Storage/UserObject";
