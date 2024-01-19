<template>
  <div v-if="showPage">
    <div >
      <h2>Edit Book</h2>
      <form @submit.prevent="editBook">
        <div class="form-group">
          <label for="title">Book Title:</label>
          <input v-model="newBook.title" type="text" id="title" required />
        </div>

        <div class="form-group">
          <label for="author">Book Author:</label>
          <input v-model="newBook.author" type="text" id="author" required />
        </div>

        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input v-model="newBook.quantity" type="number" id="quantity" required min="0" />
        </div>

        <button class="add" type="submit">Save Change</button>
      </form>


    </div>
  </div>
  <h6 class="name"> © youssef laamim</h6>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showPage: true,
      newBook: {
        title: '',
        author: '',
        quantity: 0,
      },
    };
  },

  methods: {
    editBook() {
      if (!this.newBook.title) {
        console.error('Book title is undefined. Aborting editBook.');
        return;
      }

      const authToken = localStorage.getItem('authToken');

      const requestBody = {
        previous: {
          title: this.newBook.title,
        },
        current: {
          title: this.newBook.title,
          author: this.newBook.author,
          quantity: this.newBook.quantity,
        },
      };

      axios.put(`http://localhost:3000/admin/books`, requestBody, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
          .then(response => {
            if (response.status === 200) {
              alert('Book edited successfully!');
            } else {
              console.error('Error editing book:', response);
            }
          })
          .catch(error => {
            console.error('Error editing book:', error);
          });

    },


    discardChanges() {
      this.newBook = {
        title: '',
        author: '',
        quantity: 0,
      };


      this.showPage = false;
      this.$router.push('/library/books');
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

.form-group {
  margin-bottom: 15px;
}
.name{
  margin-top: auto;
}
</style>

