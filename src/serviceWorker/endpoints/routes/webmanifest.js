req.event.respondWith(
  new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      "content-type": "application/manifest+json",
    },
  })
);
