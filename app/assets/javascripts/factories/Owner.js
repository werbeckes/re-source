app.factory("Owner", function($resource) {
  return $resource("/api/checkOwner/:id", {id: "@id"},
    {
      'check':    { method: 'GET', isArray: false }
    }
  );
})
