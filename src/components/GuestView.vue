<template>
  <div class="header-container">

        <h1>gust view user</h1>
        <h3 class="search-title">Search:</h3>

        <input v-model="searchQuery" @input="handleSearch" placeholder="Search by title" />

        <button class="add-button" @click="singout">sing out</button>
      </div>
      <div>

        <table class="books-table">

          <thead class="headtable">
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
            <td>{{ book.quantity }}</td>

          </tr>
          </tbody>
        </table>



      </div>

  <h6 class="name"> © youssef laamim</h6>

    </template>

      <script lang="ts">
        import axios from 'axios';


        export default {

          data() {

            return {
              version: null,
              books: [],
              searchQuery: '',


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


            singout() {

              this.$router.push('/auth/login');
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
