/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request,
	//These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
	sender, sendResponse
	) {
	if (request.callFunction == "toggleSidebar")
		toggleSidebar();
}
chrome.extension.onRequest.addListener(handleRequest);
var selection;
/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarOpen = false;
function toggleSidebar() {
	if(sidebarOpen) {
		var el = document.getElementById('resource-sidebar');
		$('#resource-sidebar').slideToggle("slow");
		el.parentNode.removeChild(el);
		sidebarOpen = false;
	}
	else {
		css = "<link rel='stylesheet' type='text/css' href=" + chrome.extension.getURL('base_dom/sidebar-style.css') + ">"
		$("head").prepend(css);
		image = chrome.extension.getURL('images/re_icon.png');
		api_html = "<script type='text/javascript' src=" + chrome.extension.getURL('custom_scripts/first_draft.js') + "></script>"
		$("head").prepend(api_html);
		var sidebar = document.createElement('div');
		sidebar.id = "resource-sidebar";
		sidebar.class="drag-hover";
		sidebar.innerHTML = "<img id='re-logo' src='" + image + "' />\
		<h1>Drop what you found here</h1>";
		//.ui-draggable-dragging
		$("head").after(sidebar);
		styleBar("#" + sidebar.id);
		sidebarOpen = true;
//Clean all me up later

		$(document).mouseup(function (event) {
// getSelection.toString
			//make it so the target from user selection is the only thing that becomes draggable
			$(event.target).attr("id", "selected-resource");
			selection = document.getSelection().toString();
			var dragger = $("#selected-resource").draggable({
				helper: "clone",
				appendTo: "#resource-sidebar",
				zIndex: 100000
			});
		});


	}
};

function styleBar (id) {
	$(id).droppable({
		activeClass: "drag-highlight",
		hoverClass: "drag-hover",
		drop: function (event, ui) {
			// api(selection);
			// alert("dropped")
			// send message back to extension.js
			console.log("Object drop detected");
			chrome.runtime.sendMessage({directive: "getUserToken"}, function(token_response) {
			  console.log("received response: ");
			  console.log(token_response);
			  console.log("calling next part of message ");
			  chrome.runtime.sendMessage({
			  	directive: "saveAsSnippet",
			  	user_token: token_response.user_token,
			  	params: {body: selection, snippetUrl: document.URL, pageTitle: token_response.pageTitle}
			  }, function(response) {
				  console.log("received response: ");
				  console.log(response);
				  // after dropping, close bin.
				  console.log(event.target);
				  $(document.getElementById("resource-sidebar")).hide("fast", function() {
				  	console.log("finished hiding");
				  	console.log(this);
				  	// $(this).remove();
				  });
				});
			});

		}
	})
	var bodyText = $(id).children();
	$(id).toggle();
	$(id).css({"height": "5em"});
  $(id).slideToggle("slow");
};












// .id{
//   animation: slideIn ease-in-out 1s;
//   animation-iteration-count: 1;
//   transform-origin: 50% 50%;
//   animation-fill-mode:forwards; /*when the spec is finished*/
//   -webkit-animation: slideIn ease-in-out 1s;
//   -webkit-animation-iteration-count: 1;
//   -webkit-transform-origin: 50% 50%;
//   -webkit-animation-fill-mode:forwards; /*Chrome 16+, Safari 4+*/
// }

// @keyframes slideIn{0% {transform:translate(-1px,0px);}52% {transform:translate(-194px,1px);}70% {transform:translate(-178px,0px);}100%{transform:translate(-183px,1px);}}

// @-webkit-keyframes slideIn {
//   0% {
//     -webkit-transform:  translate(-1px,0px)  ;
//   }
//   52% {
//     -webkit-transform:  translate(-194px,1px)  ;
//   }
//   70% {
//     -webkit-transform:  translate(-178px,0px)  ;
//   }
//   100% {
//     -webkit-transform:  translate(-183px,1px)  ;
//   }
// }

