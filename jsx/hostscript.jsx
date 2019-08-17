
function addLabel(obj){
    var prefs = app.preferences;
    //synchronousMode = true
    var doc = app.document;
    var allFileList = doc.thumbnail.children;
    var MyLabels = getLabels();

    for(var j=0;j<allFileList.length;j++){
        if(checkPath(allFileList[j],obj.pathList)){
            allFileList[j].label = MyLabels[obj.number];
        }
    }
    
    function allAddRed(){
        for(var i=0;i<allFileList.length;i++){
            $.writeln("path:" + allFileList[i].path);
            allFileList[i].label = MyLabels[0];
        }
    }

    function checkPath(file,array){
        for(var n =0;n<array.length;n++){
            if(file.path == array[n]){
                return true;
            }
        }
        return false;
    }

    function getLabels(){
        var labelNames = ["Label1","Label2","Label3","Label4","Label5"];
        var yourLabels = [];
        for(var n=0;n<labelNames.length;n++){
            yourLabels[n] = prefs[labelNames[n]];
            $.writeln(prefs[labelNames[n]]);
        }
        return yourLabels;
    }
    return true;
}