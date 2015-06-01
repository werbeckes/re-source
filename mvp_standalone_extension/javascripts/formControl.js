$(function() {
  console.log("hello?")
  $(document).on("submit", "form", function() {
    event.preventDefault();
    console.log("form submited!");
    // on form submit, submit user info to api auth route
    var auth_request = $.ajax({
                        url: "http://localhost:3000/api/snippets/login",
                        method: "GET",
                        data: $(this).serialize()
                      });

    auth_request.fail(function(response) {
      $("#errorMessage").show();

      console.log("User Not Logged In.");
      console.log(response);
    });

    auth_request.done(function (response) {
      $(".initiallyHidden").hide();
      // $("#saveMessage").show();
      $("#loginMessage").show();
      // store user token
        chrome.storage.sync.set({'resource_user_token': response.auth_token}, function() {
          // Notify that we saved.
          console.log('Settings saved');
          window.setTimeout(window.close, 2000);
        });

      console.log("User Logged In");
      console.log(response);
    });
  });
});