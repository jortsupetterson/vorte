const viewConstructors = {};

const structSpecifiedViewInMarkup = async ({ viewName, includeComponents }) => {
  const viewConstructor = viewConstructors[viewName];
  const view = viewConstructor(includeComponents);
  const clients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  for (const client of clients) {
    client.postMessage({
      viewHeadline: (await view).headline,
    });
  }
};
