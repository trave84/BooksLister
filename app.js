function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


function UI() {}  //empty contructor

// Add Function to UI Object
UI.prototype.addBookToList = function(book){
  console.log('Added Book: ', book);
  const list  = document.getElementById('book-list');

  // Create DOM Element
  const row = document.createElement('tr'); 
  console.log('Added tr: ', row);

  // Prepare HTML
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">delete<a></td>
  `;

  // Add DOM Elm to HTML
  list.appendChild(row);
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = "";
}

document.getElementById('book-form').addEventListener('submit', function(e){ 
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
  
  const book = new Book(title, author, isbn); // instantiate with Form Data Vars
  console.log('New Book object: ', book);

  const ui = new UI();

  ui.addBookToList(book);   // add new Instance to book-list using proto function

  ui.clearFields();
  e.preventDefault();
  });

