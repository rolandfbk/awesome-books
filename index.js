/* eslint-disable max-classes-per-file */

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

class Booksdatabase {
  constructor() {
    this.booksrecord = JSON.parse(localStorage.getItem('bookArchive')) || [];
  }

  static displayBook(title, author, id) {
    const templateHTML = `
      <tr>
        <td class="table-item">
          "${title}" by ${author}
          <button type='button' class="remove-bttn" id="${id}">Remove</button>
        </td>
      </tr>`;

    bookRec.insertAdjacentHTML('beforeend', templateHTML);
  }

  static getBooks() {
    const storage = JSON.parse(localStorage.getItem('bookArchive'));
    storage.forEach((book) => {
      Booksdatabase.displayBook(book.title, book.author, book.id);
    });
  }

  remove(button, key) {
    button.addEventListener('click', () => {
      if (key === 0) {
        this.booksrecord.splice(key, key + 1);
      } else {
        this.booksrecord.splice(key, 1);
      }

      bookRec.innerHTML = '';
      localStorage.setItem('bookArchive', JSON.stringify(this.booksrecord));
      window.location.reload();
      localStorage.setItem('bookArchive', JSON.stringify(this.booksrecord));
    });
  }

  insertBook() {
    bookForm.addEventListener('submit', () => {
      const inputBook = new Book(bookTitle.value, bookAuthor.value);
      this.booksrecord.push(inputBook);
      localStorage.setItem('bookArchive', JSON.stringify(this.booksrecord));
      bookTitle.value = '';
      bookAuthor.value = '';
      bookTitle.focus();
      bookAuthor.focus();
      Booksdatabase.getBooks();
    });

    localStorage.setItem('bookArchive', JSON.stringify(this.booksrecord));
    Booksdatabase.getBooks();
  }
}

const record = new Booksdatabase();

record.insertBook();

const removeBtn = document.querySelectorAll('.remove-bttn');
removeBtn.forEach((btn, index) => {
  // const removeBtn = new Book();
  record.remove(btn, index);
});