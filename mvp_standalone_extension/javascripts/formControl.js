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
      getLoginHtml();
      $("#errorMessage").show();
      console.log("User Not Logged In.");
      console.log(response);
    });

    auth_request.done(function (response) {
      getLoginHtml();
      // $("#saveMessage").show();
      $("#loginMessage").show();
      // store user token
        chrome.storage.sync.set({'resource_user_token': response.auth_token}, function() {
          // Notify that we saved.
          $("body #loginContainer").remove();
          console.log('Settings saved');
          window.setTimeout(function(){
            removeLoginHtml();
            window.close();
          }, 1000);
          // removeLoginHtml();
        });

      console.log("User Logged In");
      console.log(response);
    });
  });
});

function getLoginHtml() {
  var loginMessageHtml = "<h3 class='initiallyHidden tempMessage' id='errorMessage'>Invalid Email/Password</h3><h3 class='initiallyHidden tempMessage' id='loginMessage'>Logged In!</h3>"
  $('body').prepend(loginMessageHtml);
  $(".tempMessage").hide();
}

function removeLoginHtml() {
  $('.tempMessage').remove();

}