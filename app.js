function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


function UI() {}  //empty contructor

// Add new Book to UI
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

// Error message
UI.prototype.showErrorSuccessMsg = function(msg, className){
  const div = document.createElement('div');

  // Add Class to div elm.
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));

  // Prepare DOM Elms in Vars
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  // Render Alert in Position
  container.insertBefore(div, form);

  // Remove Alert in 3s
  setTimeout(function (){
    document.querySelector('.alert').remove();
  }, 3000); 

}

UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}
// Clear Form Fields after new Book Submitted
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

  // Validate the Form Fields
  if(title === '' || author === '' || isbn === ''){
    ui.showErrorSuccessMsg('Please fill in all fields', 'error');
  } else {
    // Add new Instance to book-list using proto function
    ui.addBookToList(book);
    // Success Message
    ui.showErrorSuccessMsg('Book has been added', 'success');
    // And Clear Form
    ui.clearFields();
  }


  e.preventDefault();
  });

// Delete Feature

document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);

  ui.showErrorSuccessMsg('Book removed', 'success');
  e.preventDefault();
})
