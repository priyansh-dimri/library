// Main container
const mainContainer = document.getElementsByClassName("main")[0];

// Sidebar catalog container
const catalogList = document.getElementById("catalog-list");

// Add Book button
const addBookButton = document.getElementById("add-book-button");

// Book Form dialog
const bookFormDialog = document.getElementById("book-form-dialog");

// Confirm Button in Book Form Dialog
const confirmButton = document.getElementById("confirm-button");

// Library Class
class Library {
  #booksList = [];

  addBookToLibrary = (book) => this.#booksList.push(book);
  removeBookFromLibrary = (idx) => {
    this.#booksList.splice(idx, 1);
    mainContainer.replaceChildren();
    this.displayLibrary();

    catalogList.replaceChildren();
    this.displayCatalog();
  };

  displayLibrary = () => {
    this.#booksList.forEach((book, idx) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";

      const bookTitle = document.createElement("div");
      bookTitle.className = "book-card-title";
      bookTitle.textContent = book.title;
      bookCard.appendChild(bookTitle);

      const bookAuthor = document.createElement("div");
      bookAuthor.className = "book-card-author";
      bookAuthor.textContent = `by ${book.author}`;
      bookCard.appendChild(bookAuthor);

      const bookPages = document.createElement("div");
      bookPages.className = "book-card-pages";
      bookPages.textContent = `${book.pages} pages`;
      bookCard.appendChild(bookPages);

      const bookRead = document.createElement("div");
      bookRead.className = "book-card-read";
      bookRead.id = `book-card-read-${idx}`;
      bookRead.textContent = `Read?: ${book.read ? "Yes" : "No"}`;
      bookCard.appendChild(bookRead);

      const bookToggle = document.createElement("button");
      bookToggle.className = "add-book-button";
      bookToggle.type = "button";
      bookToggle.value = `idx-${idx}`;
      bookToggle.textContent = "Toggle Read Status";
      bookToggle.addEventListener("click", (e) => {
        this.toggleReadStatus(parseInt(e.target.value.split("-")[1]));
      });
      bookCard.appendChild(bookToggle);

      mainContainer.appendChild(bookCard);
    });
  };

  displayCatalog = () => {
    this.#booksList.forEach((book, idx) => {
      const catalogListElement = document.createElement("li");
      catalogListElement.className = "catalog-list-element";

      const catalogListElementTitle = document.createElement("div");
      catalogListElementTitle.className = "catalog-list-element-title";
      catalogListElementTitle.textContent = book.title;
      catalogListElement.appendChild(catalogListElementTitle);

      const deleteIcon = document.createElement("img");
      deleteIcon.className = "delete-icon";
      deleteIcon.src = "./assets/delete.svg";
      deleteIcon.alt = "Delete icon";
      deleteIcon.setAttribute("data-value", idx);
      deleteIcon.addEventListener("click", (e) => {
        let idxToDelete = e.target.getAttribute("data-value");
        this.removeBookFromLibrary(idxToDelete);
      });
      catalogListElement.appendChild(deleteIcon);

      catalogList.appendChild(catalogListElement);
    });
  };

  toggleReadStatus = (idx) => {
    let updatedReadStatus = !this.#booksList[idx].read;
    this.#booksList[idx].read = updatedReadStatus;

    const bookCardToUpdate = document.getElementById(`book-card-read-${idx}`);
    bookCardToUpdate.textContent = `Read?: ${updatedReadStatus ? "Yes" : "No"}`;
  };
}

// Book Class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const library = new Library();

const bookTitle = document.getElementById("title"),
  bookAuthor = document.getElementById("author"),
  bookPages = document.getElementById("pages"),
  errorMessage = document.getElementById("error-message");

function getBookFormDialogData() {
  if (!bookTitle.checkValidity()) {
    errorMessage.textContent = "Please enter a book title!";
    return false;
  } else if (!bookAuthor.checkValidity()) {
    errorMessage.textContent = "Please enter a book author!";
    return false;
  } else if (!bookPages.checkValidity()) {
    errorMessage.textContent = "Please enter a valid page number!";
    return false;
  }
  let title = bookTitle.value,
    author = bookAuthor.value,
    pages = bookPages.value,
    read =
      document.querySelector('input[name="read"]:checked').value === "yes"
        ? true
        : false;

  const bookToAdd = new Book(title, author, pages, read);
  library.addBookToLibrary(bookToAdd);

  return true;
}

addBookButton.addEventListener("click", () => {
  bookFormDialog.showModal();
});

confirmButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (getBookFormDialogData()) {
    bookFormDialog.close(true);

    mainContainer.replaceChildren();
    library.displayLibrary();

    catalogList.replaceChildren();
    library.displayCatalog();
  }
});
