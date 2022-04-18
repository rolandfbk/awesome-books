const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookForm = document.getElementById('bookForm');
const bookRec = document.getElementById('books-record');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = new Date().getTime().toString().concat(performance.now());
  }
}

let booksrecord = JSON.parse(localStorage.getItem('bookArchive')) || [];

function displayBook(title, author, id) {
  const templateHTML = `
    ${title}<br>  
    ${author}<br>
    <button type='button' class="remove-bttn" id="${id}">Remove</button>
    <hr>`;

  bookRec.insertAdjacentHTML('beforeend', templateHTML);

  const removeBtn = document.querySelectorAll('.remove-bttn');
  removeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      booksrecord = booksrecord.filter((book) => book.id !== Number(btn.id));
      bookRec.innerHTML = '';
      booksrecord.forEach((book) => {
        displayBook(book.title, book.author, book.id);
      });
      localStorage.setItem('bookStorage', JSON.stringify(booksrecord));
    });
  });
}

function getBooks() {
  const storage = JSON.parse(localStorage.getItem('bookArchive'));
  storage.forEach((book) => {
    displayBook(book.title, book.author, book.id);
  });
}

function insertBook() {
  bookForm.addEventListener('submit', () => {
    const inputBook = new Book(bookTitle.value, bookAuthor.value);
    booksrecord.push(inputBook);
    bookTitle.value = '';
    bookAuthor.value = '';
    bookTitle.focus();
    bookAuthor.focus();
    localStorage.setItem('bookArchive', JSON.stringify(booksrecord));
    getBooks();
  });

  localStorage.setItem('bookArchive', JSON.stringify(booksrecord));
  getBooks();
}

insertBook();
