import Book from './modules/book.js';
import Store from './modules/store.js';
import { DateTime } from './modules/luxon.js';

const dateTime = () => {
  const today = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  document.getElementById('clock').innerHTML = today;
};
setInterval(dateTime, 1000);

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete text-white">X</a></td>
          `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// ///// Events

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// event.addEventlist('click', UI.displayBooks, document);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if (title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if (!title === '' || !author === '') {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});

const listBtn = document.querySelector('.list');
const addBtn = document.querySelector('.add-book');
const contact = document.querySelector('.contact');

const toList = document.querySelector('table');
const toAdd = document.querySelector('form');
const toContact = document.querySelector('#contact');

listBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toList.classList.remove('d-none');
  toContact.classList.add('d-none');
  toAdd.classList.add('d-none');
});

// Go to add list
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toAdd.classList.remove('d-none');
  toList.classList.add('d-none');
  toContact.classList.add('d-none');
});
// Go to contacts
contact.addEventListener('click', (e) => {
  e.preventDefault();
  toContact.classList.remove('d-none');
  toList.classList.add('d-none');
  toAdd.classList.add('d-none');
});
