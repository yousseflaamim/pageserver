<!--
  This code represents a Vue component named "GuestView" that displays a guest view of a bookstore website
The template defines the HTML structure of the component.
It includes a header section, a search input, and a table to display book information.
The table has columns for Book Title, Book Author, and Availability.
Each book is rendered as a table row using v-for.
The availability is displayed based on the available property of each book object.
The script section defines the component's behavior and data.
The data function returns the initial data state, including the searchQuery (for filtering books) and books array (with sample book data).
The methods section includes the login, fetchBooks, and searchBooks methods:
login is a placeholder for the logic to handle login functionality.
fetchBooks is called when the component is created to fetch the book data from a server (using Axios in this case). The fetched data replaces the initial sample book data.
searchBooks is called when the search input value changes. It makes an HTTP request to search for books based on the entered query and updates the books array with the search results.
The created lifecycle hook is used to automatically fetch the initial book data when the component is created
-->
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

<script>
import axios from "axios";
export default {
  name:'GuestView',
  data() {
    return {
      searchQuery: '',
      books: [
        {
          id: 1,
          title: 'Book Title 1',
          author: 'Author 1',
          available: 5
        },
        {
          id: 2,
          title: 'Book Title 2',
          author: 'Author 2',
          available: 0
        },
      ]
    };
  },
  methods: {
    login() {
      // تنفيذ الخطوات اللازمة لتسجيل الدخول
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
  created() {
    this.fetchBooks();
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
