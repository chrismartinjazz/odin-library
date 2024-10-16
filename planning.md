Current functions / objects

function Book(title, author, pages, read)

function addBookToLibrary(title, author, pages, read=false)

function removeBookFromLibrary(index)

function initializeMyLibrary()

function displayBooks()

function initializeDialog()

To reorganize into Classes maybe:

Class Library
  initializeMyLibrary --> constructor
  addBookToLibrary
  removeBookFromLibrary

Class Book
  Be a book

Class Display
  initializeDialog --> constructor
  displayBooks

class MyClass {
  // class methods
  constructor() { }
  method1() { }
  method2() { }
  method3() { }
  //...
}
