// Library Class
class Library {
  #booksList = [];

}

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

// Book Class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(book) {
  library.push(book);
}

function removeBookFromLibrary(idx) {
  library.splice(idx, 1);

  mainContainer.replaceChildren();
  displayLibrary();

  catalogList.replaceChildren();
  displayCatalog();
}

function displayLibrary() {
  library.forEach((book, idx) => {
    console.log(book, idx);
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
      toggleReadStatus(parseInt(e.target.value.split("-")[1]));
    });
    bookCard.appendChild(bookToggle);

    mainContainer.appendChild(bookCard);
  });
}

function displayCatalog() {
  library.forEach((book, idx) => {
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
      removeBookFromLibrary(idxToDelete);
    });
    catalogListElement.appendChild(deleteIcon);

    catalogList.appendChild(catalogListElement);
  });
}

function toggleReadStatus(idx) {
  let updatedReadStatus = !library[idx].read;
  library[idx].read = updatedReadStatus;

  const bookCardToUpdate = document.getElementById(`book-card-read-${idx}`);
  bookCardToUpdate.textContent = `Read?: ${updatedReadStatus ? "Yes" : "No"}`;
}

function getBookFormDialogData() {
  let bookTitle = document.getElementById("title").value,
    bookAuthor = document.getElementById("author").value,
    bookPages = document.getElementById("pages").value,
    bookRead =
      document.querySelector('input[name="read"]:checked').value === "yes"
        ? true
        : false;

  const bookToAdd = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  addBookToLibrary(bookToAdd);

  return "added";
}

addBookButton.addEventListener("click", () => {
  bookFormDialog.showModal();
});

bookFormDialog.addEventListener("close", (e) => {
  if (bookFormDialog.returnValue !== "default") {
    mainContainer.replaceChildren();
    displayLibrary();

    catalogList.replaceChildren();
    displayCatalog();
  }
});

confirmButton.addEventListener("click", (e) => {
  e.preventDefault();

  bookFormDialog.close(getBookFormDialogData());
});
