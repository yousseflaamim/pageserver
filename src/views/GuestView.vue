
<template>
  <div>
    <header class="header-container">
      <div class="title-container">
        <h1 class="title">Bookstore gus</h1>
      </div>
      <div class="login-button">
        <button class="btn" @click="login">login</button>
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>
            <span v-if="book.available">{{ book.available }} left</span>
            <span v-else>Out of Stock</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from "axios";
const API_URL = 'http://localhost:8080/library';
export default {
  name:'GuestView',
  data() {
    return {
      searchQuery: '',
      books: [
        {
          id: 1,
          title: 'londen1',
          author: 'yu1',
          available: 5
        },
        {
          id: 2,
          title: 'milano2',
          author: 'you2',
          available: 0
        },
      ]
    };
  },
methods: {
  login() {
    if (this.username === 'youssef' && this.password === '1234') {
      alert('Login successful!');
      this.$router.push('/adminviewbooks');
    } else {
      alert('Invalid credentials');
      this.$router.push('/register');
      }
      }
    },
      fetchBooks() {
      axios.get(`${API_URL}/books`)
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    searchBooks() {
      axios.get(`${API_URL}/books/search?q=${this.searchQuery}`)
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error(error);
        });
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

.btn {
  margin: 0px;
  text-align: right;
}
.guest-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.page-title {
  text-align: center;
}

.login-button {
  margin: 0px;
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
#tabelhead{
  background-color: grey;
}

.books-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
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

