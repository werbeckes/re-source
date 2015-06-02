var test = chrome.contextMenus.create({"title": "Logout", "contexts":["browser_action"], "onclick": genericOnClick});

function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
}