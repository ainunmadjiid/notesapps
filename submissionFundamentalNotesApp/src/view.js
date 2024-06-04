import NoteApi from "./data/API/note-api.js";

async function displayNotes() {
  const noteList = document.getElementById("noteList");
  const loadingIndicator = document.querySelector("loading-indicator");
  loadingIndicator.style.display = "block;";

  noteList.innerHTML = "";

  const notes = await NoteApi.fetchNotes();
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note-item");
    noteElement.setAttribute("data-note-id", note.id);

    const body = note.body ? note.body : "";
    const description = note.description ? note.description : "";

    noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${body ? body + " " : ""}${description}</p>
            <button class="delete-button">Delete</button>
        `;
    noteList.appendChild(noteElement);
  });

  loadingIndicator.style.display = "none";
}

document
  .getElementById("formNote")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (title && description) {
      const newNote = {
        title: title,
        body: description,
      };
      await NoteApi.addNote(newNote);
      await displayNotes();
      document.getElementById("formNote").reset();
    } else {
      alert("Judul dan catatan tidak boleh kosong!");
    }
  });

document.getElementById("noteList").addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-button")) {
    const noteId = event.target.parentElement.getAttribute("data-note-id");
    await NoteApi.deleteNote(noteId);
    await displayNotes();
  }
});

displayNotes();
