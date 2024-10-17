const maxInputLength = 80;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}.`;
  };
  this.toggleRead = function () {
    this.read ? this.read = false : this.read = true;
  };
}

function addBookToLibrary(title, author, pages, read = false) {
  const parsedTitle = title.length > maxInputLength ? title.slice(0, maxInputLength) + "..." : title;
  const parsedAuthor = author.length > maxInputLength ? title.slice(0, maxInputLength) + "..." : title;
  const parsedPages = isNaN(parseInt(pages)) ? "" : parseInt(pages);
  const parsedRead = read ? true : false;
  myLibrary.push(new Book(parsedTitle, parsedAuthor, parsedPages, parsedRead));
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function initializeMyLibrary() {
  addBookToLibrary("Runes for Beginners", "Lisa Chamberlain", 136, true);
  addBookToLibrary("All about Ravens", "Arvaaq Press", 16, true);
  addBookToLibrary("Magnus Chase and the Hammer of Thor", "Rick Riordan", 496);
}

function displayBooks() {
  const library = document.querySelector(".library");
  library.innerHTML = `<tr class="library__header">
        <th></th>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Read</th>
        <th></th>
      </tr>`;

  myLibrary.forEach((book, index) => {
    const row = library.insertRow(index + 1);
    row.setAttribute('id', `myLibrary${index}`)
    const cellReadToggle = row.insertCell(0);
    cellReadToggle.innerHTML = `<button class="btn read-book" id = ${index}">Toggle Read</button>`;
    cellReadToggle.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });
    const cellTitle = row.insertCell(1);
    cellTitle.innerHTML = book.title;
    const cellAuthor = row.insertCell(2);
    cellAuthor.innerHTML = book.author;
    const cellPages = row.insertCell(3);
    cellPages.innerHTML = book.pages;
    const cellRead = row.insertCell(4);
    cellRead.innerHTML = book.read ? 'Yes' : 'No';
    const cellRemove = row.insertCell(5);
    cellRemove.innerHTML = `<button class="btn remove-book" id="${index}">Remove</button>`;
    cellRemove.addEventListener("click", () => {
      removeBookFromLibrary(index);
      displayBooks();
    });
  });
}

function initializeDialog() {
  const dialog = document.querySelector("dialog");
  const newBookButton = document.querySelector(".new-book");
  const closeButton = document.querySelector(".close-dialog");
  const form = document.querySelector("form");

  // Open and close the dialog using buttons.
  newBookButton.addEventListener("click", () => {
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  // Add submitted form data to myLibrary
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("newBookTitle").value;
    const author = document.getElementById("newBookAuthor").value;
    const pages = document.getElementById("newBookPages").value;
    const read = document.querySelector('input[name="read"]:checked').value;

    addBookToLibrary(title, author, pages, read === 'yes' ? true : false);

    dialog.close();

    form.reset();

    displayBooks();
  });
}

const myLibrary = [];
initializeDialog();
initializeMyLibrary();
displayBooks();