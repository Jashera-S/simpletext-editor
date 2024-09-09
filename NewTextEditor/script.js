let isbold=false,isitalic=false,isdragging=false,isunderline=false;
let selectedElement=null;
let offx;
let offy;
let undostack=[];
let redostack=[];

const fontsize=document.getElementById('fontsize');
const canvas=document.getElementById('canvas');
const fontstyle=document.getElementById('fontstyle');
  
function savestate(){
    undostack.push(canvas.innerHTML);
    redostack=[];
}
function addtext(){
savestate();
const newText = document.createElement('div');
newText.contentEditable=true;
newText.classList.add('editor');
newText.innerText='Your Text';
newText.style.top ='50px';
newText.style.left='50px';
newText.style.fontFamily='fontFamily.value';
newText.onmousedown =startDrag;

canvas.appendChild(newText);
selectedElement=newText;
}

function updateTextStyle(){
    if(selectedElement){
    selectedElement.style.fontSize=fontsize.value+ 'px';
    savestate();
    }
}
function updateFontStyle(){
    selectedElement.style.fontFamily=fontstyle.value;
    savestate();
}
function togglebold(){
    if(selectedElement){
        isbold=!isbold;
        selectedElement.style.fontWeight=isbold ? 'bold' : 'normal';
        savestate();
    }
}

function toggleitalic(){
    if(selectedElement){
    isitalic =!isitalic;
    selectedElement.style.fontStyle=isitalic ? 'italic' : 'normal';
    savestate();
}
}
function toggleunderline(){
    if(selectedElement){
    isunderline =!isunderline;
    selectedElement.style.textDecoration=isunderline ? 'underline' : 'none';
    savestate();
}
}

function alignText(alignment){
if(selectedElement){
    selectedElement.style.textAlign = alignment;
    savestate();

}
}

function undo(){
    if(undostack.length){
      redostack.push(canvas.innerHTML);
      canvas.innerHTML=undostack.pop();
      addDragEvents();
    }
}
function redo(){
    if(redostack.length){
        undostack.push(canvas.innerHTML);
        canvas.innerHTML=redostack.pop();
        addDragEvents();
    }
}

function startDrag(e){
    isdragging = true;
    selectedElement=e.target;
    offx =e.clientX-selectedElement.offsetLeft;
    offy=e.clientY-selectedElement.offsetTop;

    document.addEventListener('mousemove',onDrag);
    document.addEventListener('mouseup',stopDrag);
    }

    function onDrag(e){
        if(isdragging && selectedElement){
           let x = e.clientX-offx;
           let y = e.clientY-offy;


           const canvasRect = canvas.getBoundingClientRect();
           const editorRect= selectedElement.getBoundingClientRect();
           
           x= Math.max(0,Math.min(x,canvasRect.width - editorRect.width));
           y=Math.max(0, Math.min (y,canvasRect.height - editorRect.height));

           selectedElement.style.left = x+'px';
           selectedElement.style.top = y+'px';}

        }

    function stopDrag(){
        isdragging = false;
        document.removeEventListener('mousemove',onDrag);
        document.removeEventListener('mouseup',stopDrag);
        savestate();
    
    }
     function addDragEvent(){
        document.querySelectorAll('.editor').forEach(el =>el.onemousedown=startDrag);
     }
