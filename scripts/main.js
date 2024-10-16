class Library {
  #books = []

  addBook(book) {
    this.#books.push(book);
  }

  removeBook(index) {
    this.#books.splice(index, 1);
  }

  getBooks() {
    return this.#books;
  }
}

class Book {
  static maxInputLength = 80;

  constructor(title, author, pages, read) {
    this.title = this.#limitStringLength(title, Book.maxInputLength);
    this.author = this.#limitStringLength(author, Book.maxInputLength);
    this.pages = isNaN(parseInt(pages)) ? "" : parseInt(pages);
    this.read = read ? true : false;
  }

  getInfo() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}.`;
  }

  toggleRead() {
    this.read ? this.read = false : this.read = true;
  }

  #limitStringLength(string, maxInputLength) {
    return string.length > maxInputLength ? string.slice(0, maxInputLength) + "..." : string;
  }
}

class Display {
  constructor(library) {
    this.library = library;
    this.libraryTable = document.querySelector(".library-table");
    this.libraryTableHeaderHTML =
      `<tr class="library-table__header">
        <th></th>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Read</th>
        <th></th>
      </tr>`

    this.dialog = document.querySelector("dialog");
    this.form = document.querySelector("form");

    this.#initializeDialog();
  }

  displayBooks() {
    this.libraryTable.innerHTML = this.libraryTableHeaderHTML;

    this.library.getBooks().forEach((book, index) => {
      this.#displayBookRow(book, index);
    });
  }

  #displayBookRow(book, index) {
    const row = this.libraryTable.insertRow(index + 1);
    row.setAttribute('id', `books${index}`)

    const cellReadToggle = row.insertCell(0);
    cellReadToggle.innerHTML = `<button class="btn read-book" id = ${index}">Toggle Read</button>`;
    cellReadToggle.addEventListener("click", () => {
      book.toggleRead();
      this.displayBooks();
    });

    this.#displayBookCell(row, book.title, 1);
    this.#displayBookCell(row, book.author, 2);
    this.#displayBookCell(row, book.pages, 3);
    this.#displayBookCell(row, book.read ? 'Yes' : 'No', 4);

    const cellRemove = row.insertCell(5);
    cellRemove.innerHTML = `<button class="btn remove-book" id="${index}">Remove</button>`;
    cellRemove.addEventListener("click", () => {
      this.library.removeBook(index);
      this.displayBooks();
    });
  }

  #displayBookCell(row, text, position) {
    const cell = row.insertCell(position);
    cell.innerHTML = text;
  }

  #initializeDialog() {
    this.#initializeOpenClose();
    this.#initializeSubmitForm();
  }

  #initializeOpenClose() {
    const newBookButton = document.querySelector(".new-book");
    const closeButton = document.querySelector(".close-dialog");

    newBookButton.addEventListener("click", () => {
      this.dialog.showModal();
    });

    closeButton.addEventListener("click", () => {
      this.dialog.close();
    });
  }

  #initializeSubmitForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = document.getElementById("newBookTitle").value;
      const author = document.getElementById("newBookAuthor").value;
      const pages = document.getElementById("newBookPages").value;
      const read = document.querySelector('input[name="read"]:checked').value;

      const newBook = new Book(title, author, pages, read === 'yes' ? true : false);
      this.library.addBook(newBook);
      this.dialog.close();
      this.form.reset();
      this.displayBooks();
    });
  }
}

const myLibrary = new Library()
myLibrary.addBook(new Book("Runes for Beginners", "Lisa Chamberlain", 136, true));
myLibrary.addBook(new Book("All about Ravens", "Arvaaq Press", 16, true));
myLibrary.addBook(new Book("Magnus Chase and the Hammer of Thor", "Rick Riordan", 496));

new Display(myLibrary).displayBooks();