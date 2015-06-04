// Listens for a message from the bin object
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Got to the background!");
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.directive == "saveAsSnippet") {
      saveSnippet(request, sender, sendResponse);
      // sendResponse({farewell: stuff, recieved: request});
    }

    if (request.directive == "getUserToken") {
      chrome.storage.sync.get("resource_user_token", function(response) {
        sendResponse( {user_token: response.resource_user_token} );
        // THIS IS A CALL BACK FUNCTION.
      });
    }

    return true;
  });


// saves the snippet to the database. called from the initialAuthCheck callback function in event of successful authentication.
function saveSnippet(request, sender, sendResponse) {
      var user_token = request.user_token;
      var params = request.params;
      var request = $.ajax({
                      url: "http://localhost:3000/api/snippets",
                      method: "POST",
                      headers: { 'Authorization': ('Token token=' + user_token) },
                      data: params
                    });

      request.fail(function(response) {
        sendResponse({response: response});
        console.log("Something went wrong.");
        console.log(response);
      });

      request.done(function (response) {
        sendResponse({response: response});
        console.log("Saved!");
        console.log(response);
      });

}
