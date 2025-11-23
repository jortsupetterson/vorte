export default async ({ type, params }) => {
  handlers[type](params);
};

const handlers = Object.freeze({
  render,
  storage,
});

import render from "./handlers/render";
import storage from "./handlers/storage";
