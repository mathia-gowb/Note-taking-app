const DOM_Elements={
    controlElements:document.querySelectorAll("[data-role]"),
    dimBackground:document.querySelector('.body-overlay')
}
DOM_Elements.controlElements.forEach(element=>element.addEventListener('click',handleClick));
function handleClick(e){
    switch(this.dataset.role){
        case 'add':addNote()
        break;
        case 'save':saveNote()
        break;
        case 'delete':deleteNote()
        break;
    }
} 
let dimmed=false;
function addNote(){
    if(dimmed){return};
    toggleDim()
}
function saveNote(){
    if(!dimmed){return};
    toggleDim()
}
function deleteNote(){

}
function toggleDim(){
    if(dimmed){
        DOM_Elements.dimBackground.style.visibility="hidden";
        dimmed=false;
        return
    }
    DOM_Elements.dimBackground.style.visibility="visible";
    dimmed=true;
}