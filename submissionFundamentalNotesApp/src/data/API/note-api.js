const BASE_URL = "https://notes-api.dicoding.dev/v2/";

class NoteApi {
  static async fetchNotes() {
    try {
      const response = await fetch(BASE_URL + "notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  }

  static async addNote(note) {
    try {
      const response = await fetch(BASE_URL + "notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  }

  static async updateNote(id, updatedNote) {
    try {
      const response = await fetch(BASE_URL + `notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(BASE_URL + `notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }
}

export default NoteApi;
