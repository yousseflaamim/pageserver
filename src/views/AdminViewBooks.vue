<!--
  //
/*This code represents a Vue component named "AdminViewBooks" that displays a table of books and provides functionality to edit, delete, and add new books
The template defines the HTML structure of the component.
It includes an input field for searching, a button to add a new book, and a table to display the books.
The table has columns for book title, author, availability, order, and actions (edit and delete buttons).
The v-for directive is used to iterate over the books array and display each book as a table row.
The script section defines the component's behavior and data.
The data function returns an object with properties: books, showModal, modalMode, and selectedBook. These properties manage the state of the component.
The created lifecycle hook is used to fetch the books from the API when the component is created.
The methods section contains various methods that perform operations such as fetching books, editing, deleting, and adding books.
The editBook method sets the modal mode to "edit" and assigns the selected book to selectedBook. It then shows the modal for editing.
The deleteBook method removes the selected book from the books array.
The addNewBook method sets the modal mode to "add" and initializes selectedBook with default values. It then shows the modal for adding a new book.
The saveBook method saves the updated book. If in "add" mode, it assigns a new ID to the book and adds it to the books array. If in "edit" mode, it updates the existing book in the books array.
The cancelEditing method cancels the editing process by hiding the modal and resetting the selectedBook.
The increaseOrder and decreaseOrder methods modify the order value of a book.*/

-->
<template>

  <div>
    <h2 class="search-title">Search:</h2>
    <input type="text" v-model="searchQuery" class="search-input" placeholder="Enter search query">

    <button class="add-button" @click="addNewBook">Add New Book</button>

    <table class="books-table">
      <thead>
        <tr>
          <th>Book Title</th>
          <th>Book Author</th>
          <th>Availability</th>
          <th>Order</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.quantity }}</td>
          <td>
            <div class="order-container">
              <button class="order-button" @click="decreaseOrder(book)">-</button>
              <span class="order-number">{{ book.order }}</span>
              <button class="order-button" @click="increaseOrder(book)">+</button>
            </div>
          </td>
          <td>
            <button @click="editBook(book)">Edit</button>
            <button @click="deleteBook(book)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AdminViewEditingAddingBook
      v-if="showModal"
      :mode="modalMode"
      :book="selectedBook"
      @save="saveBook"
      @cancel="cancelEditing"
    />
  </div>
</template>

<script>


import axios from 'axios';
import AdminViewEditingAddingBook from './AdminViewEditingAddingBook.vue';


export default {
  name: 'AdminViewBooks',
  components: {
    AdminViewEditingAddingBook
  },
  data() {
    return {
      books: [
       
      ],
      showModal: false,
      modalMode: 'add',
      selectedBook: null
    };
    
  },
   created() {
    this.fetchBooks();
  },
  methods: {
      fetchBooks() {
      axios.get('http://localhost:8080/library/profile')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editBook(book) {
      this.modalMode = 'edit';
      this.selectedBook = { ...book };
      this.showModal = true;
    },
    deleteBook(book) {
      const index = this.books.findIndex(b => b.id === book.id);
      if (index !== -1) {
        this.books.splice(index, 1);
      }
    },
    addNewBook() {
      this.modalMode = 'add';
      this.selectedBook = { title: '', author: '', quantity: 0, order: 0 };
      this.showModal = true;
    },
    saveBook(updatedBook) {
      if (this.modalMode === 'add') {
        updatedBook.id = this.books.length + 1;
        this.books.push(updatedBook);
      } else {
        const index = this.books.findIndex(b => b.id === updatedBook.id);
        if (index !== -1) {
          this.books.splice(index, 1, updatedBook);
             }
      }
      this.showModal = false;
      this.selectedBook = null;
    },
    cancelEditing() {
      this.showModal = false;
      this.selectedBook = null;
    },
    increaseOrder(book) {
      book.order++;
    },
    decreaseOrder(book) {
      if (book.order > 0) {
        book.order--;
      }
    }
  }
}
</script>

<style scoped>
  .header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: #4CAF50;
  color: white;
  padding: 0 20px;
}

.title-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.title {
  font-size: 24px;
}

.logoin-button {
  display: flex;
  align-items: center;
}
h2 {
  align-content:center ;
  margin-top: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

button {
  padding: 8px 16px;
  background-color: #4287f5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>


