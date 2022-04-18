class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const bookTitle = document.getElementById('bookTitle').value;
const bookAuthor = document.getElementById('bookAuthor').value;
const ourForm = document.getElementById('ourForm');

class BookArchive {
  constructor()
}

ourForm.addEventListener('click', function() {
  setbookAuthor
});
function setContent() {
  const setBookContent = JSON.parse(JSON.stringify(localStorage.getItem('bookContent')));
  const newBookObj = JSON.parse(setBookContent);

  bookTitle = newBookObj.title;
  bookAuthor = newBookObj.author;
}

function populateStorage() {
  const bookObj = {
    title: bookTitle,
    author: bookAuthor,
  };

  localStorage.setItem('bookContent', JSON.stringify(bookObj));

  setContent();
}

if (!localStorage.getItem('bookContent')) {
  populateStorage();
} else {
  setContent();
}