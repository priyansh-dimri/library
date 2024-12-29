// library array contains all Book objects
const library = [];

// Main container
const mainContainer = document.getElementsByClassName("main")[0];

// Constructor function for Book object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
}

function displayLibrary() {
    library.forEach((book, idx) => {
        console.log(book, idx);
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        const bookTitle = document.createElement('div');
        bookTitle.className = 'book-card-title';
        bookTitle.textContent = book.title;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement('div');
        bookAuthor.className = 'book-card-author';
        bookAuthor.textContent = `by ${book.author}`;
        bookCard.appendChild(bookAuthor);

        const bookPages = document.createElement('div');
        bookPages.className = 'book-card-pages';
        bookPages.textContent = `${book.pages} pages`;
        bookCard.appendChild(bookPages);

        const bookRead = document.createElement('div');
        bookRead.className = 'book-card-read';
        bookRead.textContent = `Read?: ${book.read ? "Yes" : "No"}`;
        bookCard.appendChild(bookRead);

        const bookToggle = document.createElement('button');
        bookToggle.className = 'add-book-button';
        bookToggle.type = 'button';
        bookToggle.value = `idx-${idx}`;
        bookToggle.textContent = "Toggle Read Status";
        bookCard.appendChild(bookToggle);

        mainContainer.appendChild(bookCard);
    })
}

// Test data for Book objects
addBookToLibrary(new Book("To Kill a thousand Mockingbird", "Harper Lee", 281, true));
addBookToLibrary(new Book("1984", "George Orwell", 328, false));
addBookToLibrary(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true));
addBookToLibrary(new Book("Harry Potter", "J. K. Rowling", 635, false));
addBookToLibrary(new Book("Pride and Prejudice", "Jane Austen", 279, true));

displayLibrary();