// for testing purposes to reset chrome storage
// chrome.storage.sync.set({'resource_user_token': "wrong"}, function() {
//           // Notify that we saved.
//           console.log('Settings saved');
//           // window.setTimeout(window.close, 2000);
// });

// make sure document is ready
$(function(){
  // setup popup view
  // $("#saveMessage").hide();
  // $("#loginContainer").hide();
  $(".initiallyHidden").hide();
  //check to make sure user is logged in
  // store user token in variable if present
  var user_token

  chrome.storage.sync.get("resource_user_token", function(response) {
    user_token = response.resource_user_token;
    // THIS IS A CALL BACK FUNCTION. THE REST OF THE AUTH CALL GETS EXECUTED HERE
    initialAuthCheck(user_token);
  });





});


function initialAuthCheck(user_token) {
  // headers: { 'Authorization': 'Token token=c29491c8ab2b4fdca224e39064c2bfaf' }
  var token_request = $.ajax({
                      url: "http://localhost:3000/api/snippets",
                      method: "GET",
                      headers: { 'Authorization': ('Token token=' + user_token) }
                    });

      token_request.fail(function(response) {
        $("#loginContainer").show();
        console.log("User Not Logged In.");
        console.log(response);
      });

      token_request.done(function (response) {
        $("#saveMessage").show();
        console.log("User Logged In");
        console.log(response);
        // if successful request, continue on with saving function.
        saveSnippet(user_token);
      });
}

// saves the snippet to the database. called from the initialAuthCheck callback function in event of successful authentication.
function saveSnippet(user_token) {
  // =============
  //get highlighted text, and current url, and send them to create#snippets
  chrome.tabs.executeScript( {
    code: "document.getSelection().toString();"
  }, function(selection) {
    console.log(selection);
    var params = {};

    if (selection !== undefined) {
      params['body'] = selection[0];
    } else {
      console.log("Nothing found");
    }

    // get the url of the page
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
      // console.log(tabs[0].url);
      params['snippetUrl'] = tabs[0].url;
      console.log(params);


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

    });

  });
}