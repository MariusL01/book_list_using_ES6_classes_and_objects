const titleEl = document.querySelector("#title");
const authorEl = document.querySelector("#author");
const isbnEl = document.querySelector("#isbn");
const submitButtonEl = document.querySelector("#submitButton");
const tableEl = document.querySelector("table");

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static createBook() {
    const title = titleEl.value;
    const author = authorEl.value;
    const isbn = isbnEl.value;
    if (title != "" && author != "" && isbn != "") {
      const book = new Book(title, author, isbn);
      UI.addBookToTable(book);
      UI.clearFields();
      UI.message("confirm");
    } else {
      UI.message("error");
    }
  }

  static addBookToTable(book) {
    const newRow = document.createElement("tr");
    const newCell1 = document.createElement("td");
    const newCell2 = document.createElement("td");
    const newCell3 = document.createElement("td");
    const newCell4 = document.createElement("td");
    newCell1.textContent = book.title;
    newCell2.textContent = book.author;
    newCell3.textContent = book.isbn;
    newCell4.innerHTML = `<i class="fas fa-window-close close"></i>`;
    tableEl.append(newRow);
    newRow.append(newCell1);
    newRow.append(newCell2);
    newRow.append(newCell3);
    newRow.append(newCell4);
  }

  static clearFields() {
    titleEl.value = "";
    authorEl.value = "";
    isbnEl.value = "";
  }
  static removeBook(book) {
    if (book.classList.contains("close")) {
      book.parentNode.parentNode.remove();
    }
  }
  static addBookWithEnter(event) {
    if (event === "Enter") {
      submitButtonEl.click();
    }
  }
  static message(message) {
    const formEl = document.querySelector(".form");
    const newP = document.createElement("p");
    newP.classList.add("message");
    if (message === "confirm") {
      newP.textContent = "Book Added";
    } else {
      newP.textContent = "Complete all fields";
      newP.classList.add("message-error");
    }
    formEl.prepend(newP);

    const mesaggeEl = document.querySelectorAll(".message");
    setTimeout(() => {
      mesaggeEl.forEach((el) => el.remove());
    }, 2000);
  }

  static eventListeners() {
    submitButtonEl.addEventListener("click", () => UI.createBook());
    tableEl.addEventListener("click", (event) => UI.removeBook(event.target));
    isbnEl.addEventListener("keypress", (event) =>
      UI.addBookWithEnter(event.key)
    );
  }
}

UI.eventListeners();
