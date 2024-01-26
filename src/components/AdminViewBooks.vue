<template>
  <div class="header-container">
    <h1>AdminViewBooks</h1>
    <h3 class="search-title">Search:</h3>

    <input v-model="searchQuery" @input="handleSearch" placeholder="Search by title" />
    <button class="add-button" @click="toggleAddBookForm">Add New Book</button>

    <AddBookForm v-if="showAddBookForm" @add-book="handleAddBook" />

    <AddBookForm v-if="showAddBookForm" @add-book="handleAddBook" />
    <button class="add-button" @click="singout">sing out</button>
  </div>
  <!-- Modal -->
  <div v-if="showAddBookModal" class="modal-overlay">
    <div class="modal">
      <button @click="closeAddBookModal">Close</button>
      <AdminViewEditingAddingBook @save="saveBook" @cancel="closeAddBookModal" />
    </div>
  </div>
  <!-- 2 -->
  <EditBookForm v-if="showEditBookForm" @edit-book="handleEditBook" />
  <div v-if="showEditBookModal" class="modal-overlay">
    <div class="modal">
      <button @click="closeEditBookModal">Close</button>
      <AdminViewEdit @save="saveBook" @cancel="closeEditBookModal" />
    </div>
  </div>
  <!-- 2 -->
  <div class="button-container" style="text-align: right;">
    <button id="user" @click="viewUser">User</button>
    <button id="books" @click="viewBooks">Books</button>
  </div>

  <div>

    <table class="books-table">

      <thead class="headtable">
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
            <button class="order-button" @click="decreaseOrder(book.quantity)">-</button>
            <span class="order-number">{{ book.order }}</span>
            <button class="order-button" @click="increaseOrder(book.quantity)">+</button>
          </div>
        </td>
        <td>
          <button @click="toggleEditBookForm">Edit</button>
          <button @click="deleteBook(book)">Delete</button>

        </td>
      </tr>
      </tbody>
    </table>

    <h6 class="name"> © youssef laamim</h6>

  </div>
</template>

<script lang="ts">
import axios from 'axios';
import AdminViewEditingAddingBook from '@/components/AdminViewEditingAddingBook.vue';
import AdminViewEdit from "@/components/AdminViewEditBook.vue";

export default {
  components: {
    AdminViewEditingAddingBook,
    AdminViewEdit,
  },
  data() {

    return {
      version: null,
      books: [],
      searchQuery: '',
      showAddBookForm: false,
      showAddBookModal: false,
      showEditBookForm: false,
      showEditBookModal: false,

    };
  },
  mounted() {
    this.fetchBookList();
  },
  methods: {


    fetchBookList() {
      const authToken = localStorage.getItem('authToken');
      const url = this.searchQuery
          ? `http://localhost:3000/library/books/search?q=${this.searchQuery}`
          : 'http://localhost:3000/library/books';

      axios.get(url)
          .then(response => {
            this.version = response.data.version;
            this.books = response.data.books;
          })
          .catch(error => {
            console.error('Error fetching book list', error.response.data);
          });
    },

    handleSearch() {
      this.fetchBookList();
    },
    increaseOrder(book) {
      book.order++;
    },
    decreaseOrder(book) {
      if (book.order > 0) {
        book.order--;
      }
    },
    singout() {

      this.$router.push('/auth/login');
    },
    viewUser(){
      this.$router.push('/admin/users');
    },

    toggleAddBookForm() {
      this.showAddBookModal = !this.showAddBookModal;
    },

    closeAddBookModal() {
      this.showAddBookModal = false;
    },
    toggleEditBookForm() {
      this.showEditBookModal = !this.showEditBookModal;
    },

    closeEditBookModal() {
      this.showEditBookModal = false;
    },
    deleteBook(book) {
      const authToken = localStorage.getItem('authToken');


      const confirmed = window.confirm('Are you sure you want to delete this book?');

      if (confirmed) {
        axios.delete('http://localhost:3000/admin/books', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
          data: {
            title: book.title
          }
        })
            .then(response => {
              if (response.status === 200) {
                const backToDeleted = window.confirm('Book deleted successfully! Do you want to go back?');


                this.fetchBookList();
              } else if (response.status === 404) {
                alert('Book not found!');
              } else {
                console.error('Error deleting book:', response);
              }
            })
            .catch(error => {
              console.error('Error deleting book:', error);
            });
      }
    },
  },
};
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
  border-collapse: collapse;
  width: 100%;
  color: #000;
}


th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  background-color: #4CAF50;
  color: white;
}

button {
  padding: 8px 16px;
  background-color: #4287f5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.order-button{
  background: rgb(100, 101, 100);
}
#user{
  background: rgb(155, 159, 159);
}
#user:active{
  background: rgb(24, 25, 25);
}
#books{
  background-color: rgb(24, 25, 25);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 7px;
}
.name{
  margin-top: auto;
}
</style>
