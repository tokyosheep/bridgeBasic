<<<<<<< HEAD
=======

>>>>>>> origin/master
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

function selectFiles(num){
    var doc = app.document;
    var fileList = doc.thumbnail.children;
    for(var i=0;i<fileList.length;i++){

        if((i % 2) != 0 && num.type === "odd"){
            doc.select(fileList[i]);
        }
        
        if((i % 2) == 0 && num.type === "even"){
            doc.select(fileList[i]);
        }
    }

    
    /*隠しファイル削除関数
    function removeHideFile(array){
        for(var n=0;n<array.length;n++){
            if(ishidingFile(array[n].name)){
                array.splice(n,1);
            }
        }
        return array;
    }
 
    function ishidingFile(name){
        $.writeln(name);
        if(name[0] == "."){
            return true;
        }
        return false;
    }
    */
}