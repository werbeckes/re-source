app.filter('pretty', function(){
    return function(text) {
        return prettyPrintOne(text);
    }
})