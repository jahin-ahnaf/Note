const noteInput = document.querySelector(".note-input");
const noteEdit = document.querySelector(".note-edit");
let currentNote = null;

document.addEventListener("DOMContentLoaded", loadNotes);

function newNote() {
    noteInput.style.visibility = "visible";
}

function closeNote() {
    noteInput.style.visibility = "hidden";
}

function closeEdit() {
    noteEdit.style.visibility = "hidden";
}


function createNewNote() {
    let empty = document.querySelector(".empty");

    if (empty) {
        empty.remove();
    }

    let noteTitle = document.querySelector(".title").value;
    let noteBody = document.querySelector(".body").value;

    let noteContainer = document.createElement("div");
    noteContainer.classList.add("note");

    let titleElement = document.createElement("h3");
    let titleNode = document.createTextNode(noteTitle);
    titleElement.appendChild(titleNode);
    noteContainer.appendChild(titleElement);

    let bodyElement = document.createElement("p");
    let bodyNode = document.createTextNode(noteBody);
    bodyElement.appendChild(bodyNode);
    noteContainer.appendChild(bodyElement);

    let editNoteBtn = document.createElement("button");
    editNoteBtn.classList.add("edit");
    editNoteBtn.innerHTML = '<i class="fi fi-br-edit"></i>'; // Flaticon edit icon
    editNoteBtn.addEventListener("click", function () {
        noteEdit.style.visibility = "visible";
        document.querySelector(".titleEdit").value = titleElement.textContent;
        document.querySelector(".bodyEdit").value = bodyElement.textContent;
        currentNote = noteContainer;
    });
    noteContainer.appendChild(editNoteBtn);

    let deleteNoteBtn = document.createElement("button");
    deleteNoteBtn.classList.add("delete");
    deleteNoteBtn.innerHTML = '<i class="fi fi-br-trash"></i>'; // Flaticon delete icon
    deleteNoteBtn.addEventListener("click", function () {
        noteContainer.remove();
        saveNotes();
        checkEmptyNotes();
    });
    noteContainer.appendChild(deleteNoteBtn);

    const element = document.querySelector(".notes");
    element.appendChild(noteContainer);

    document.querySelector(".title").value = "";
    document.querySelector(".body").value = "";

    closeNote();
    saveNotes();
}


function editNote() {
    let newTitle = document.querySelector(".titleEdit").value;
    let newBody = document.querySelector(".bodyEdit").value;

    currentNote.querySelector("h3").textContent = newTitle;
    currentNote.querySelector("p").textContent = newBody;

    closeEdit();
    saveNotes();
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note").forEach(note => {
        const title = note.querySelector("h3").textContent;
        const body = note.querySelector("p").textContent;
        notes.push({ title, body });
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes && savedNotes.length > 0) {
        document.querySelector(".empty").remove();
        savedNotes.forEach(noteData => {
            let noteContainer = document.createElement("div");
            noteContainer.classList.add("note");

            let titleElement = document.createElement("h3");
            let titleNode = document.createTextNode(noteData.title);
            titleElement.appendChild(titleNode);
            noteContainer.appendChild(titleElement);

            let bodyElement = document.createElement("p");
            let bodyNode = document.createTextNode(noteData.body);
            bodyElement.appendChild(bodyNode);
            noteContainer.appendChild(bodyElement);

            let editNoteBtn = document.createElement("button");
            editNoteBtn.classList.add("edit");
            editNoteBtn.innerHTML = '<i class="fi fi-br-edit"></i>'; // Flaticon edit icon
            editNoteBtn.addEventListener("click", function () {
                noteEdit.style.visibility = "visible";
                document.querySelector(".titleEdit").value = titleElement.textContent;
                document.querySelector(".bodyEdit").value = bodyElement.textContent;
                currentNote = noteContainer;
            });
            noteContainer.appendChild(editNoteBtn);

            let deleteNoteBtn = document.createElement("button");
            deleteNoteBtn.classList.add("delete");
            deleteNoteBtn.innerHTML = '<i class="fi fi-br-trash"></i>'; // Flaticon delete icon
            deleteNoteBtn.addEventListener("click", function () {
                noteContainer.remove();
                saveNotes();
                checkEmptyNotes();
            });
            noteContainer.appendChild(deleteNoteBtn);

            const element = document.querySelector(".notes");
            element.appendChild(noteContainer);
        });
    }
}


function checkEmptyNotes() {
    const notes = document.querySelectorAll(".notes .note");
    if (notes.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.classList.add("empty");
        emptyMessage.textContent = "No notes found.";
        document.querySelector(".notes").appendChild(emptyMessage);
    }
}
