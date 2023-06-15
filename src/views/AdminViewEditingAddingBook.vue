<template>
  <div class="modal">
    <div class="modal-content">
      <h3>{{ mode === 'add' ? 'Add New Book' : 'Edit Book' }}</h3>
      <label for="title">Title:</label>
      <input type="text" v-model="localBook.title" id="title" placeholder="Book Title">
      <label for="author">Author:</label>
      <input type="text" v-model="localBook.author" id="author" placeholder="Book Author">
      <label for="quantity">Quantity:</label>
      <input type="number" v-model="localBook.quantity" id="quantity" placeholder="Quantity">
      <div class="button-container">
        <button @click="saveBook">{{ mode === 'add' ? 'Add' : 'Save' }}</button>
        <button @click="cancelBook">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminViewEditingAddingBook',
  props: {
    mode: String, // 'add' or 'edit'
    book: Object // book object to edit (if mode is 'edit')
  },
  data() {
    return {
      localBook: { ...this.book }
    };
  },
  methods: {
    saveBook() {
      this.$emit('save', this.localBook);
    },
    cancelBook() {
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
/* Add your custom styles for the component here */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #4287f5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3366cc;
}

button:disabled {
  background-color: #c7c7c7;
  cursor: not-allowed;
}

</style>
