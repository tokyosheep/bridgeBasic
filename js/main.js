window.onload = () =>{
    "use strict";
    const csInterface = new CSInterface();
    themeManager.init();
    const btn_test = document.getElementById("btn_test");
    const dropArea = document.getElementById("dropArea");
    const fileList = document.getElementById("fileList");
    const redLabel = document.getElementById("redLabel");
    const reset = document.getElementById("reset");
    const path = require("path");
    const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    
    console.log(__dirname);
    
    reset.addEventListener("click",resetDrop);
    
    redLabel.addEventListener("click",()=>{
        const labelNumber = Array.from(document.getElementsByClassName("labelColor")).findIndex(v => v.checked);
        console.log(labelNumber);
        const liList = Array.from(dropArea.getElementsByTagName("li"));
        const pathList = liList.map(v =>  v.dataset.path);
        const obj = {
            pathList:pathList,
            number:labelNumber
        }
        csInterface.evalScript(`addLabel(${JSON.stringify(obj)})`,result=>{
            console.log(result);
            if(result){
                resetDrop();
            }
        });
    });
    
    prevent_drag_event();
    class Drag{
        constructor(area,list){
            this.area = area;
            this.list = list;
            
            this.area.addEventListener("dropover",this.handleDragOver);
            this.area.addEventListener("drop",this);
        }
        
        handleDragOver(e){
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
        }
        
        handleEvent(e){
            e.stopPropagation();
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files);
            console.log(files);
            /*
            while(this.area.firstChild){
                this.area.removeChild(this.area.firstChild);
            }
            */
            files.forEach(v=>{
                const li = document.createElement("li");
                li.textContent = v.name;
                li.dataset.path = v.path;
                this.area.appendChild(li);
            });
        }
    }
    const drag = new Drag(dropArea,fileList);
    
    
    function prevent_drag_event(){
        window.addEventListener(`drop`,prevent_dragnaddrop,false);
        window.addEventListener(`dragover`,prevent_dragnaddrop,false);
    
        function prevent_dragnaddrop(e){
            e.stopPropagation();
            e.preventDefault();
        }
    }
    
    function resetDrop(){
        while(dropArea.firstChild){
            dropArea.removeChild(dropArea.firstChild);
        }
    }
    
}