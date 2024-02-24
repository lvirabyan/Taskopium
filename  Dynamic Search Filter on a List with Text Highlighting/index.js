const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
  ];
  
  let debounceTimer;
  
  function renderBooks(bookList, searchKeyword) {
    const booksContainer = document.getElementById("books-container");
  
    while (booksContainer.firstChild) {
      booksContainer.removeChild(booksContainer.firstChild);
    }
  
    if (bookList.length === 0) {
      const noBooksRow = document.createElement("tr");
      const noBooksCell = document.createElement("td");
      noBooksCell.colSpan = 4;
      noBooksCell.textContent = "No books found.";
      noBooksRow.appendChild(noBooksCell);
      booksContainer.appendChild(noBooksRow);
      return;
    }
  
    const table = document.createElement("table");
    table.setAttribute("id", "books-table");
  
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["ID", "Title", "Author", "Year"].forEach(headerText => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    const tbody = document.createElement("tbody");
    bookList.forEach(book => {
      const title = highlightText(book.title, searchKeyword);
      const author = highlightText(book.author, searchKeyword);
  
      const bookRow = document.createElement("tr");
  
      const idCell = document.createElement("td");
      const titleCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const yearCell = document.createElement("td");
  
      idCell.textContent = book.id;
      titleCell.innerHTML = title;
      authorCell.innerHTML = author;
      yearCell.textContent = book.year;
  
      bookRow.appendChild(idCell);
      bookRow.appendChild(titleCell);
      bookRow.appendChild(authorCell);
      bookRow.appendChild(yearCell);
  
      tbody.appendChild(bookRow);
    });
  
    table.appendChild(tbody);
    booksContainer.appendChild(table);
  }
  
  function searchBooks() {
    const searchKeyword = document.getElementById("search").value.toLowerCase();
  
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const matchingBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchKeyword) ||
        book.author.toLowerCase().includes(searchKeyword)
      );
      renderBooks(matchingBooks, searchKeyword);
    }, 300);
  }
  
  function highlightText(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
  
  renderBooks(books, "");
  