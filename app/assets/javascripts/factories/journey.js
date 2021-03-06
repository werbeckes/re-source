app.factory("Journey", function($resource) {
  return $resource("/api/journeys/:id?:u_id", {id: "@id", u_id: "@user_id"},
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );
})
