const DOM_Elements={
    controlElements:document.querySelectorAll("[data-role]"),
    dimBackground:document.querySelector('.body-overlay'),
    noteText:document.querySelector('.note-text'),
    notesContainer:document.querySelector('.notes-container')
}
const DOMControlFunctions={
    createTextElement(){
        DOM_Elements.noteText.innerHTML='<textarea name="note-content" id=""  rows="10"></textarea>';
        

    },
    createParagraph(content){
        DOM_Elements.noteText.innerHTML=`<p>${content}</p>`;
    }
    ,
    getNewContent(){
       return document.querySelector('textarea').value;
    },
    addPaperStacks(){
        /* add papers into the stack then run transformValues('add') */
        DOM_Elements.notesContainer.insertAdjacentHTML('afterbegin','<div class="back-notes"></div>');
        NotesData.transformValues('add')

    },
    removePaperStacks(){
        /* removes the first element in papers stacks */
        document.querySelector('.back-notes');
        NotesData.transformValues('remove');
    }
}
class Data{
    constructor(){
        this.notesList=['asdf','asdfasdf','asdfasdf'];
    }
    addNotes(note){
        this.notesList.unshift(note);
        return 'Note Added'
    }
    removeNotes(){
       return this.notesList.shift()
    }
    transformValues(role){
        /* create/remove a stack first */
        if(role==="add"){
            const notesStacks= document.querySelectorAll('.back-notes');
            console.log(notesStacks);
            let startLength=notesStacks.length-1;
            let currPercent=100;
             for(let i=startLength;i>0;i--){
     
                 notesStacks[startLength-i].style.width=`${currPercent-(i*3)}%`
             }
        }

    }
}
const NotesData=new Data;
console.log(NotesData)
DOM_Elements.controlElements.forEach(element=>element.addEventListener('click',handleClick));
function handleClick(e){
    switch(this.dataset.role){
        case 'add':addNote()
        break;
        case 'save':saveNote()
        break;
        case 'close':deleteNote()
        break;
    }
} 
let dimmed=false;
function addNote(){
    if(dimmed){return};
    toggleDim()
    /* show the textarea element instead of the  */
    DOMControlFunctions.createTextElement()
}
function saveNote(){
    if(!dimmed){return};
    toggleDim()
    /* get the new content in the editor */
    let newContent=DOMControlFunctions.getNewContent();
    NotesData.addNotes(newContent);
    console.log(NotesData.notesList)
    /* revert the ui from using text area to using paragraph */
    DOMControlFunctions.createParagraph(NotesData.notesList[0]);
    DOMControlFunctions.addPaperStacks()
}
function deleteNote(){
    
        NotesData.removeNotes();
        if(NotesData.notesList.length===0){
            DOMControlFunctions.createParagraph('<p class="note-paragraph">To <strong>Add</strong> a note press <i class="fa fa-plus" aria-hidden="true"></i> <br>To <strong>Delete</strong> a note press <i class="fa fa-trash" aria-hidden="true"></i></p>');
            return
        }
        console.log(NotesData.notesList)
        DOMControlFunctions.createParagraph(NotesData.notesList[0])
        NotesData.transformValues()
        
    /* retain the default state */


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