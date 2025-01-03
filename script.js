(function () {
  const myLibrary = [
    {
      id: "0",
      title: "The Definitive Guide",
      author: "David Flanagan",
      pages: "704",
      status: "read",
      cover: "./assets/book-0.jpg",
    },
    {
      id: "1",
      title: "You Don't Know JS Yet",
      author: "Kyle Simpson",
      pages: "145",
      status: "read",
      cover: "./assets/book-1.jpg",
    },
    {
      id: "2",
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      pages: "474",
      status: "unread",
      cover: "./assets/book-2.jpg",
    },
    {
      id: "3",
      title: "The Road to React",
      author: "Robin Wieruch",
      pages: "412",
      status: "unread",
      cover: "./assets/book-3.jpg",
    },
  ];

  renderBooks();

  /* */
  const form = document.getElementById("book-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const status = form.status.value;
    const book = new Book(title, author, pages, status);
    addBookToLibrary(book);
    renderBooks();

    form.title.value = "";
    form.author.value = "";
    form.pages.value = "";
    form.status.value = "unread";
  });

  const formOpen = document.getElementById("form-open");
  const formClose = document.getElementById("form-close");

  formOpen.addEventListener("click", () => {
    form.style.display = "flex";
  });

  formClose.addEventListener("click", () => {
    form.style.display = "none";
  });

  window.addEventListener("resize", () => {
    form.style.display = window.innerWidth > 768 ? "flex" : "none";
  });

  /* */
  function Book(title, author, pages, status) {
    if (!new.target)
      throw new TypeError("Book must be called with new keyword");
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  /* */
  function addBookToLibrary(book) {
    book.id = myLibrary.length.toString();
    myLibrary.push(book);
  }

  /* */
  function renderBooks() {
    const bookList = document.getElementById("book-list");
    bookList.replaceChildren();
    myLibrary.forEach((book) => {
      const bookCard = createBookCard(book);
      bookList.appendChild(bookCard);
    });
  }

  /* */
  function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    //
    const bookCover = document.createElement("div");
    bookCover.className = "book-cover";
    const bookImage = document.createElement("img");
    bookImage.src = book.cover || "./assets/book-default.jpg";
    bookCover.appendChild(bookImage);
    //
    const bookTitle = document.createElement("p");
    bookTitle.className = "book-title";
    bookTitle.textContent = book.title;
    //
    const bookAuthor = document.createElement("p");
    bookAuthor.className = "book-author";
    bookAuthor.textContent = "By " + book.author;
    //
    const bookAttr = document.createElement("div");
    bookAttr.className = "book-attr";
    const bookIcon = document.createElement("img");
    bookIcon.src = "./assets/book.svg";
    const bookPages = document.createElement("p");
    bookPages.textContent = book.pages + " pages";
    const bookStatus = document.createElement("img");
    bookStatus.src = `./assets/book-${
      book.status === "read" ? "check" : "cancel"
    }.svg`;
    bookStatus.id = "book-status";
    bookStatus.setAttribute("data-id", book.id);
    bookAttr.appendChild(bookIcon);
    bookAttr.appendChild(bookPages);
    bookAttr.appendChild(bookStatus);
    //
    bookCard.appendChild(bookCover);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookAttr);
    //
    bookStatus.addEventListener("click", (e) => {
      const target = e.target;
      const id = target.getAttribute("data-id");
      const book = myLibrary.find((book) => book.id === id);
      book.status = book.status === "read" ? "unread" : "read";
      target.src = `./assets/book-${
        book.status === "read" ? "check" : "cancel"
      }.svg`;
    });
    //
    return bookCard;
  }
})();
