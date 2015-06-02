var test = chrome.contextMenus.create({"title": "Logout", "contexts":["browser_action"], "onclick": logout});

function logout() {
  var request = $.ajax({
    url: "http://localhost:3000/api/snippets/logout",
  });

  request.fail(function(response){
    console.log("Couldn't log out... you're in my house now.");
    console.log(response);
  });

  request.done(function(response){
    console.log("got response from context menu");
    console.log(response);
  });
}