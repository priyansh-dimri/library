// library array contains all Book objects
const library = [];

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