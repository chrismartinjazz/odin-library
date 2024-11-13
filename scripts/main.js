class Library {
  #books = [];

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
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = isNaN(parseInt(pages)) ? "" : parseInt(pages);
    this.read = read ? true : false;
  }

  getInfo() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }.`;
  }

  toggleRead() {
    this.read ? (this.read = false) : (this.read = true);
  }
}

class Display {
  constructor(library) {
    this.library = library;
    this.libraryTable = document.querySelector(".library-table");
    this.libraryTableHeaderHTML = `<tr class="library-table__header">
        <th></th>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Read</th>
        <th></th>
      </tr>`;

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
    row.setAttribute("id", `books${index}`);

    const cellReadToggle = row.insertCell(0);
    cellReadToggle.innerHTML = `<button class="btn read-book" id = ${index}">Toggle Read</button>`;
    cellReadToggle.addEventListener("click", () => {
      book.toggleRead();
      this.displayBooks();
    });

    this.#displayBookCell(row, book.title, 1);
    this.#displayBookCell(row, book.author, 2);
    this.#displayBookCell(row, book.pages, 3);
    this.#displayBookCell(row, book.read ? "Yes" : "No", 4);

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
      this.#resetForm();
      this.dialog.close();
    });
  }

  #initializeSubmitForm() {
    const title = document.getElementById("newBookTitle");
    const titleError = document.querySelector("#newBookTitle + span.error");
    const author = document.getElementById("newBookAuthor");
    const authorError = document.querySelector("#newBookAuthor + span.error");
    const pages = document.getElementById("newBookPages");
    const pagesError = document.querySelector("#newBookPages + span.error");
    const read = document.querySelector('input[name="read"]:checked');

    this.#initializeInputError(title, titleError, "Title");
    this.#initializeInputError(
      author,
      authorError,
      "Author",
      "No numeric characters allowed in author's name!"
    );
    this.#initializeInputError(
      pages,
      pagesError,
      "Pages",
      "Books in the library must have more than 10, and less than 10000 pages."
    );

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!title.validity.valid) {
        this.#showTextError(title, titleError, "Title");
        return;
      }
      if (!author.validity.valid) {
        this.#showTextError(
          author,
          authorError,
          "Author",
          "No numbers allowed in the author's name."
        );
        return;
      }
      if (!pages.validity.valid) {
        this.#showTextError(
          pages,
          pagesError,
          "Pages",
          "Books in the library must have more than 10, and less than 10000 pages."
        );
        return;
      }

      const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.value === "yes" ? true : false
      );
      this.library.addBook(newBook);
      this.dialog.close();
      this.#resetForm();
      this.displayBooks();
    });
  }

  #initializeInputError(input, inputError, inputName, regExValidationMessage) {
    input.addEventListener("input", (event) => {
      if (input.validity.valid) {
        inputError.textContent = "";
        inputError.className = "error";
      } else {
        this.#showTextError(
          input,
          inputError,
          inputName,
          regExValidationMessage
        );
      }
    });
  }

  #showTextError(textField, textError, fieldName, patternMismatchErrorString) {
    if (textField.validity.valueMissing) {
      textError.textContent = `${fieldName} is required.`;
    } else if (textField.validity.tooShort) {
      textError.textContent = `${fieldName} should be at least ${textField.minLength} characters - you entered ${textField.value.length}.`;
    } else if (textField.validity.patternMismatch) {
      if (isNaN(textField.value.slice(-1))) {
        textField.value = textField.value.slice(0, -1);
        return;
      }
      textError.textContent = patternMismatchErrorString;
    }
    textError.className = "error active";
  }

  #resetForm() {
    this.form.reset();
    const titleError = document.querySelector("#newBookTitle + span.error");
    const authorError = document.querySelector("#newBookAuthor + span.error");
    const pagesError = document.querySelector("#newBookPages + span.error");

    titleError.textContent = "";
    titleError.className = "error";
    authorError.textContent = "";
    authorError.className = "error";
    pagesError.textContent = "";
    pagesError.className = "error";
  }
}

const myLibrary = new Library();
myLibrary.addBook(
  new Book("Runes for Beginners", "Lisa Chamberlain", 136, true)
);
myLibrary.addBook(new Book("All about Ravens", "Arvaaq Press", 16, true));
myLibrary.addBook(
  new Book("Magnus Chase and the Hammer of Thor", "Rick Riordan", 496)
);

new Display(myLibrary).displayBooks();
