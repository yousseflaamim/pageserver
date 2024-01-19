<!-- youssef laamim-->
<template>
  <div>
    <h2>Add New Book</h2>
    <form @submit.prevent="addBook">
      <div class="form-group">
        <label for="title">Book Title:</label>
        <input v-model="newBook.title" type="text" id="title" required />
      </div>

      <div class="form-group">
        <label for="author">Book Author:</label>
        <input v-model="newBook.author" type="text" id="author" required />
      </div>

      <div class="form-group">
        <label for="availability">Quantity:</label>
        <input v-model="newBook.quantity" type="number" id="quantity" required min="0" />
      </div>


      <button class="add" type="submit">Add Book</button>
    </form>
  </div>
  <h6 class="name"> © youssef laamim</h6>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      newBook: {
        title: '',
        author: '',
        quantity: 0,
      },
    };
  },
  methods: {
    addBook() {
      const authToken = localStorage.getItem('authToken');

      if (this.newBook.quantity <= 0) {
        alert('Quantity must be greater than zero or over.');
        return;
      }

      axios.post('http://localhost:3000/admin/books', {
        title: this.newBook.title,
        author: this.newBook.author,
        quantity: this.newBook.quantity,
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              alert('Book added successfully!');
              this.clearForm();
            } else {
              console.error('Error adding book:', response);
            }
          })
          .catch(error => {
            console.error('Error adding book:', error);
          });
    },

    clearForm() {
      this.newBook = {
        title: '',
        author: '',
        quantity: 0,
      };
    },

  },
};
</script>

<style scoped>
h2 {
  background-color: #4CAF50;
}

.add {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1px;
}
.name{
  margin-top: auto;
}
</style>

