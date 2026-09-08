// Default Books

let books = JSON.parse(localStorage.getItem("pageNestBooks")) || [

    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        borrowed: false
    },

    {
        id: 2,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        borrowed: false
    },

    {
        id: 3,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        borrowed: false
    },

    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        borrowed: false
    },

    {
        id: 5,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        borrowed: false
    },

    {
        id: 6,
        title: "The Selfish Gene",
        author: "Richard Dawkins",
        category: "Science",
        borrowed: false
    },

    {
        id: 7,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "History",
        borrowed: false
    },

    {
        id: 8,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        category: "Technology",
        borrowed: false
    },

    {
        id: 9,
        title: "Jane Eyre",
        author: "Charlotte Bronte",
        category: "Romance",
        borrowed: false
    },

    {
        id: 10,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fiction",
        borrowed: false
    }

];


let history =
    JSON.parse(localStorage.getItem("pageNestHistory")) || [];


// Elements

const bookContainer =
    document.getElementById("bookContainer");

const historyContainer =
    document.getElementById("historyContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const totalBooks =
    document.getElementById("totalBooks");

const availableBooks =
    document.getElementById("availableBooks");

const borrowedBooks =
    document.getElementById("borrowedBooks");

const addBookBtn =
    document.getElementById("addBookBtn");

const bookModal =
    document.getElementById("bookModal");

const closeModal =
    document.getElementById("closeModal");

const bookForm =
    document.getElementById("bookForm");


// Save Data

function saveData() {

    localStorage.setItem(
        "pageNestBooks",
        JSON.stringify(books)
    );

    localStorage.setItem(
        "pageNestHistory",
        JSON.stringify(history)
    );

}


// Display Books

function displayBooks() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;


    const filteredBooks = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


    bookContainer.innerHTML = "";


    if (filteredBooks.length === 0) {

        bookContainer.innerHTML =
            `<p class="empty-message">No books found.</p>`;

        return;
    }


    filteredBooks.forEach(book => {

        const card =
            document.createElement("div");

        card.className = "book-card";


        card.innerHTML = `

            <div class="book-icon">📖</div>

            <h3>${book.title}</h3>

            <p class="author">
                By ${book.author}
            </p>

            <span class="category">
                ${book.category}
            </span>

            <p class="status ${
                book.borrowed
                    ? "borrowed"
                    : "available"
            }">

                ${
                    book.borrowed
                        ? "Currently Borrowed"
                        : "Available"
                }

            </p>

            <div class="book-buttons">

                <button
                    onclick="toggleBorrow(${book.id})"
                >

                    ${
                        book.borrowed
                            ? "Return"
                            : "Borrow"
                    }

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteBook(${book.id})"
                >
                    Delete
                </button>

            </div>

        `;


        bookContainer.appendChild(card);

    });

}


// Update Statistics

function updateStats() {

    totalBooks.textContent =
        books.length;


    const available =
        books.filter(book => !book.borrowed).length;


    const borrowed =
        books.filter(book => book.borrowed).length;


    availableBooks.textContent =
        available;

    borrowedBooks.textContent =
        borrowed;

}


// Borrow / Return Book

function toggleBorrow(id) {

    const book =
        books.find(book => book.id === id);


    if (!book) return;


    book.borrowed =
        !book.borrowed;


    const action =
        book.borrowed
            ? "Borrowed"
            : "Returned";


    const date =
        new Date().toLocaleDateString();


    history.unshift({

        title: book.title,
        action: action,
        date: date

    });


    saveData();

    displayBooks();

    updateStats();

    displayHistory();

}


// Delete Book

function deleteBook(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this book?"
        );


    if (!confirmDelete) return;


    books =
        books.filter(book => book.id !== id);


    saveData();

    displayBooks();

    updateStats();

}


// Display History

function displayHistory() {

    historyContainer.innerHTML = "";


    if (history.length === 0) {

        historyContainer.innerHTML =
            `<p class="empty-message">
                No borrowing history yet.
            </p>`;

        return;
    }


    history.forEach(item => {

        const historyItem =
            document.createElement("div");

        historyItem.className =
            "history-item";


        historyItem.innerHTML = `

            <strong>${item.title}</strong>

            was

            <strong>${item.action}</strong>

            on ${item.date}

        `;


        historyContainer.appendChild(
            historyItem
        );

    });

}


// Open Modal

addBookBtn.addEventListener(
    "click",
    () => {

        bookModal.style.display = "flex";

    }
);


// Close Modal

closeModal.addEventListener(
    "click",
    () => {

        bookModal.style.display = "none";

    }
);


// Close Modal Outside

window.addEventListener(
    "click",
    (event) => {

        if (event.target === bookModal) {

            bookModal.style.display = "none";

        }

    }
);


// Add New Book

bookForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const title =
            document.getElementById(
                "bookTitle"
            ).value;

        const author =
            document.getElementById(
                "bookAuthor"
            ).value;

        const category =
            document.getElementById(
                "bookCategory"
            ).value;


        const newBook = {

            id: Date.now(),

            title: title,

            author: author,

            category: category,

            borrowed: false

        };


        books.push(newBook);


        saveData();

        displayBooks();

        updateStats();


        bookForm.reset();

        bookModal.style.display =
            "none";

    }
);


// Search

searchInput.addEventListener(
    "input",
    displayBooks
);


// Category Filter

categoryFilter.addEventListener(
    "change",
    displayBooks
);


// Initial Display

displayBooks();

updateStats();

displayHistory();