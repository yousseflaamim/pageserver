<!--
  //**
This code represents a Vue component named "AdminViewEditingAddingBook" that serves as a modal for adding or editing a book
The template defines the HTML structure of the modal.
It includes input fields for the book's title, author, and quantity.
The modal content is conditionally rendered based on the mode prop. If the mode is "add", it displays "Add New Book" in the header; otherwise, it displays "Edit Book".
The Save and Cancel buttons trigger corresponding methods when clicked.
The script section defines the component's behavior and data.
The props property defines the expected props for the component: mode (indicating the mode of the modal) and book (the book object to edit, only applicable in "edit" mode).
The data function returns an object with a localBook property, which is a copy of the book prop. This allows the modal to have its own local state to track changes.
The methods section contains two methods:
saveBook emits a custom event named 'save' and passes the localBook object as the payload. This event is intended to be caught by the parent component, triggering the appropriate action for saving the book.
cancelBook emits a custom event named 'cancel', indicating that the user wants to cancel the editing or adding process.

 */
-->
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
