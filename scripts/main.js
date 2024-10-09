const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}.`
  }
}

function addBookToLibrary(title, author, pages, read = false) {
  myLibrary.push(new Book(title, author, pages, read));
}

console.log(myLibrary);
addBookToLibrary("Test Title 1", "Test Author 1", 123, false);
addBookToLibrary("Test Title 2", "Test Author 2", 456, true);
addBookToLibrary("Test Title 3", "Test Author 3", 789);

console.log(myLibrary);