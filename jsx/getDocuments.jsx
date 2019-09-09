(function(){
    $.writeln(app.documents.length);
    var fileList = app.document.thumbnail.children;
    var files = [];
    for(var i=0;i<fileList.length;i++){
        var fileData = {};
        fileData.path = fileList[i].path;
        fileData.name = fileList[i].name;
        files[i] = fileData;
    }

    return JSON.stringify(files);
})();