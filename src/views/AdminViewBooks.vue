
<template>
  <div class="header-container">
    <h1>AdminViewBooks</h1>
    <h3 class="search-title">Search:</h3>
   
    <input type="text" v-model="searchQuery" class="search-input" placeholder="Enter search query">
    <button class="add-button" @click="addNewBook">Add New Book</button>
        <button class="add-button" @click="singout">sing out</button>
  </div>
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
        { id: 1, title: 'londen 1', author: 'y1', quantity: 5, order: 1 },
        { id: 2, title: 'paris 2', author: 'you2', quantity: 8, order: 2 },
        { id: 1, title: 'milano 1', author: 'ssef1', quantity: 12, order: 3 },
        { id: 2, title: 'malmo 2', author: 'yoyof2', quantity: 200, order: 6 },
      ],
      showModal: false,
      modalMode: 'add',
      selectedBook: null,
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
    },
    singout() {
    
      this.$router.push('/'); 
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
  background: rgb(24, 25, 25);
}
#books{
  background: rgb(155, 159, 159);
}


</style>


