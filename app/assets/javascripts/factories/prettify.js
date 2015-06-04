app.filter('pretty', function(){
    return function(text) {
        return prettyPrintOne(text);
    }
})

app.filter('youtube', function(){
  var regtube = /(youtu\.?be(\.com\/watch\?v=)?\/?)(\w{11})/
  return function(text) {
      if (text.match(regtube)) {
        var tubeId = text.match(regtube).pop();
        var tubeHtml = "<div class='video'><iframe width=320 height=180 src=https://www.youtube.com/embed/" + tubeId + " frameborder=0 allowfullscreen></iframe></div>"
         return tubeHtml
      } else {
        return text
      }
    }
})

// ng-bind-html="to_trusted(('<iframe width=1280 height=750 src=https://www.youtube.com/embed/X9wHzt6gBgI frameborder=0 allowfullscreen></iframe>'))"
