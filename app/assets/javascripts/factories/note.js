app.factory("Note", function($resource) {
  return $resource("/api/journeys/:journey_id/categories/:category_id/notes/:id", {journey_id: "@journey_id", category_id: "@category_id", id: "@id"},
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );
})
