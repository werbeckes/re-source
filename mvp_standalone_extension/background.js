// Listens for a message from the bin object
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello") {
      // saveSnippet(request.user_token, request.params);
      sendResponse({farewell: "goodbye", recieved: request});

    }

    if (request.directive == "saveASnippet") {
      saveSnippet(request.user_token, request.params);
      sendResponse({notice: "Snippet save requested"});
    }
  });


// saves the snippet to the database. called from the initialAuthCheck callback function in event of successful authentication.
function saveSnippet(user_token, params) {
      var request = $.ajax({
                      url: "http://localhost:3000/api/snippets",
                      method: "POST",
                      headers: { 'Authorization': ('Token token=' + user_token) },
                      data: params
                    });

      request.fail(function(response) {
        $("#saveMessage").text('Error saving: ');
        debugger;
        console.log("Something went wrong.");
        console.log(response);
      });

      request.done(function (response) {
        $("#saveMessage").text("Saved!");
        console.log("Saved!");
        console.log(response);
        window.setTimeout(window.close, 1000);
      });

}