
<template>
  <div>
    <header class="header-container">
      <div class="title-container">
        <h1 class="title">Bookstore</h1>
      </div>
      <div class="logout-button">
        <button class="btn" @click="logout">Logout</button>
      </div>
    </header>
    <h2 class="search-title">Search:</h2>
    <input type="text" v-model="searchQuery" class="search-input" placeholder="Enter search query">
    <table class="books-table">
      <thead id="tabelhead">
        <tr>
          <th>Book Title</th>
          <th>Book Author</th>
          <th>Availability</th>
          <th>Order</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>
            <span v-if="book.availableCopies > 0">{{ book.availableCopies }} copies left</span>
            <span v-else>Out of Stock</span>
          </td>
          <td>
            <button @click="decreaseOrder(book)">-</button>
            <span>{{ book.order }}</span>
            <button @click="increaseOrder(book)">+</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  
  name:'UserView',
  data() {
    return {
      searchQuery: '',
      books: [
        {
          id: 1,
          title: 'londen 1',
          author: 'yo1',
          availableCopies: 5,
          order: 0
        },
        {
          id: 2,
          title: 'milano2',
          author: 'you2',
          availableCopies: 0,
          order: 0
        },
      ]
    };
  },
  methods: {
     logout() {
    localStorage.removeItem('JWT_TOKEN');
    
    this.$router.push('/');
    },
       fetchBooks() {
      axios.get('http://localhost:8080/library/books')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    searchBooks() {
      axios.get(`http://localhost:8080/library/books/search?q=${this.searchQuery}`)
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
    increaseOrder(book) {
      if (book.availableCopies > 0) {
        book.order++;
        book.availableCopies--;
      }
    },
    decreaseOrder(book) {
      if (book.order > 0) {
        book.order--;
        book.availableCopies++;
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

.logout-button {
  display: flex;
  align-items: center;
}

.btn {
  margin-top: 1px;
  text-align: right;
}
.search-title {
  margin-top: 20px;
}

.search-input {
  width: 300px;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.books-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}
#tabelhead{
  background-color: gray;
}

.books-table th,
.books-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}




.btn {
  background-color: #00d0c9;
  border: 1;
  border-color: gold;
  border-radius: 60px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 17px;
  font-weight: 400;
  outline: 0;
  padding: 11px 19px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.btn:before {
  background-color: initial;
  background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
  border-radius: 125px;
  content: "";
  height: 50%;
  left: 4%;
  opacity: .5;
  position: absolute;
  top: 0;
  transition: all .3s;
  width: 92%;
}

.btn:hover {
  box-shadow: rgba(255, 255, 255, .2) 0 3px 15px inset, rgba(0, 0, 0, .1) 0 3px 5px, rgba(0, 0, 0, .1) 0 10px 13px;
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .btn {
    padding: 16px 48px;
  }

}

</style>
