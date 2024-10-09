# Planning for Odin Library

- Add function addBookToLibrary to main.js
- Set up table and classes in html
- Add books manually
- Write function displayBooks to add each book to the page
- Add NEW BOOK button allowing users to input a book.
  - Display this is a modal using `<dialog>` <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog>
  - `submit` will try to send to server
  - use `event.preventDefault();` <https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault>
- Add button for each book to remove it.
  - Associate DOM elements with actual books - give them a data-attribute corresponding to index of library array.
-Add button to change book to `read` (toggle)
- Make it look acceptable
