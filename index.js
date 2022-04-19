const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookForm = document.getElementById('bookForm');
const bookRec = document.getElementById('books-record');

const booksrecord = JSON.parse(localStorage.getItem('bookArchive')) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = new Date().getTime().toString().concat(performance.now());
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
      Book.displayBook(book.title, book.author, book.id);
    });
  }

  static remove(button, key) {
    button.addEventListener('click', () => {
      if (key === 0) {
        booksrecord.splice(key, key + 1);
      } else {
        booksrecord.splice(key, key);
      }

      bookRec.innerHTML = '';
      localStorage.setItem('bookArchive', JSON.stringify(booksrecord));
      window.location.reload();
      localStorage.setItem('bookStorage', JSON.stringify(booksrecord));
    });
  }
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
    Book.getBooks();
  });

  localStorage.setItem('bookArchive', JSON.stringify(booksrecord));
  Book.getBooks();
}

insertBook();

const removeBtn = document.querySelectorAll('.remove-bttn');
removeBtn.forEach((btn, index) => {
  // const removeBtn = new Book();
  Book.remove(btn, index);
});