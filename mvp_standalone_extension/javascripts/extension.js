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
    // (preflight)
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
        // $("#loginContainer").show();
        getLoginForm();
        console.log("User Not Logged In.");
        console.log(response);
      });

      token_request.done(function (response) {
        $("#saveMessage").show();
        console.log("User Logged In");
        console.log(response);
        // if successful request, continue on with saving function.
        selectionDecision(user_token);
      });
}

function selectionDecision(user_token) {
  // get the selection, and do logic based upon if it is empty
  chrome.tabs.executeScript( {
    code: "document.getSelection().toString();"
  }, function(selection) {
    console.log(selection);
    var params = {};

    // get the url of the page, both methods need it.
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
      // console.log(tabs[0].url);
      params['snippetUrl'] = tabs[0].url;
      params['pageTitle'] = tabs[0].title;
      console.log(params);

    if (selection[0] !== "") {
      console.log ("saving with selection of: ");
      console.log(selection);
      // selection already exists, so no need to open the bin.
      params['body'] = selection[0];

      // send message to background to save
      sendSaveRequest(user_token, params);
    } else {
      // no selection found, so OPEN THE BIN
      displaySideBar();
      binOpen = true; // Should be global?
      console.log(binOpen);
      window.close(); // closes the popup window.
    }
    });
  });
}

function sendSaveRequest(user_token, params) {
  console.log("sending save message");
  chrome.runtime.sendMessage({
      directive: "saveAsSnippet",
      user_token: user_token,
      params: params
  },
    function(response) {
      console.log("Got a response!");
      console.log(response);

      if (response.response == "Created Snippet") {
        console.log("save successful!");
        $("#saveMessage").text('Saved!');
        window.setTimeout(window.close, 1000);
      } else {
        console.log("response wasn't 'Created Snippet' so something went wrong!");
        $("#saveMessage").text('Error saving');
      }
    });
}

function getLoginForm() {
  var loginFormHtml = "<div class='initiallyHidden' id='loginContainer'><h3>Log into your Re:Source account:</h3><form id='loginForm'><p><input type='text', name='email', placeholder='Enter Email'></p><p><input type='password', name='password', placeholder='Enter Password'></p><p><input type='submit' value='Log In'></p></form></div>"
  $("body").append(loginFormHtml);
}


//==================================
// bin code
function displaySideBar() {
  console.log("displaying sidebar");
  chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(
      //Selected tab id
      tab.id,
      //Params inside a object data
      {callFunction: "toggleSidebar"}
    );
  });
}