window.onload = () =>{
    "use strict";
    const csInterface = new CSInterface();
    themeManager.init();
    const btn_test = document.getElementById("btn_test");
    const dropArea = document.getElementById("dropArea");
    const fileList = document.getElementById("fileList");
    const redLabel = document.getElementById("redLabel");
    const reset = document.getElementById("reset");
    const evenBtn = document.getElementById("evenBtn");
    const oddBtn = document.getElementById("oddBtn");
    const makeFolder = document.getElementById("makeFolder");
    const someName = document.getElementById("someName");
    const putIn = document.getElementById("putIn");
    const path = require("path");
    const fs = require("fs");
    const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    
    const getCurrentPathJsx = "getOpenedPath.jsx";
    const getSelectionJsx = "getSelect.jsx";
    
    const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
    const dir_desktop = require(`path`).join(dir_home, `Desktop`);//デスクトップパス
    
    class ButtonEvent{
        constructor(btn){
            this.btn = btn;
            this.btn.addEventListener("click",this);
        }
        
        handleEvent(){}
    }
    
    class SelectFiles extends ButtonEvent{
        constructor(btn,num){
            super(btn);
            this.num = {type:num};
        }
        
        handleEvent(){
            csInterface.evalScript(`selectFiles(${JSON.stringify(this.num)})`);
        }
    }
    
    const even = new SelectFiles(evenBtn,"even");
    const odd = new SelectFiles(oddBtn,"odd");
    
    class ResetDrop extends ButtonEvent{
        constructor(btn){
            super(btn);
        }
        
        handleEvent(){
            while(dropArea.firstChild){
                dropArea.removeChild(dropArea.firstChild);
            }
        }
    }
    const resetDrop = new ResetDrop(reset);
    
    class AddLabels extends ButtonEvent{
        constructor(btn){
            super(btn);
        }
        
        handleEvent(){
            const labelNumber = Array.from(document.getElementsByClassName("labelColor")).findIndex(v => v.checked);
            console.log(labelNumber);
            const liList = Array.from(dropArea.getElementsByTagName("li"));
            const pathList = liList.map(v =>  v.dataset.path);
            const obj = {
                pathList:pathList,
                number:labelNumber
            }
            csInterface.evalScript(`addLabel(${JSON.stringify(obj)})`,result=>{
                if(result){
                    resetDrop.handleEvent();
                }
            });
        }
    }
    
    const labels = new AddLabels(redLabel);
    
    
    class MakeFolder extends ButtonEvent{
        constructor(btn,jsx){
            super(btn);
            this.jsx = jsx;
        }
        
        async handleEvent(){
            if(this.isTextValue(someName.value)){ 
                alert("the value is invalid");    
                return false;
            }
            const textValue = someName.value;
            const currentPath = await this.getJsxData();
            console.log(currentPath);
            const res = this.createFolder(`${currentPath}/${textValue}`);
            console.log(res);
        }
        
        isTextValue(value){
            if(value === undefined || value === null || value === ""){
                return true;
            }
            return false;
        }
        
        getJsxData(){
            return new Promise(resolve=>{
                csInterface.evalScript(`$.evalFile("${extensionRoot}${this.jsx}")`,(o)=>{
                    console.log(o);
                    resolve(o);
                });
            });
        }
        
        createFolder(fPath){
            try{
                fs.statSync(fPath);
            }catch(e){
                fs.mkdirSync(fPath);
            }
        }
    }
    
    class MoveNewFolder extends MakeFolder{
        constructor(btn,jsx){
            super(btn,jsx);
            
        }
        
        async handleEvent(){
            if(this.isTextValue(someName.value)){ 
                alert("the value is invalid");    
                return false;
            }
            const textValue = someName.value;
            const selected = JSON.parse(await this.getJsxData());
            console.log(selected);
            selected.forEach(f=>{
                f.path = path.dirname(f.fullPath);
                const folderPath = `${f.path}/${textValue}`;
                console.log(f.path);
                this.createFolder(folderPath);
                fs.renameSync(`${f.path}/${f.name}`,`${folderPath}/${f.name}`);
            });
        }
    }
    
    const mkdir = new MakeFolder(makeFolder,getCurrentPathJsx);
    const sortFiles = new MoveNewFolder(putIn,getSelectionJsx);
    
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
    
    
    
    
    prevent_drag_event();
    function prevent_drag_event (){
        window.addEventListener(`drop`,prevent_dragnaddrop,false);
        window.addEventListener(`dragover`,prevent_dragnaddrop,false);
    
        function prevent_dragnaddrop(e){
            e.stopPropagation();
            e.preventDefault();
        }
    }
    
}