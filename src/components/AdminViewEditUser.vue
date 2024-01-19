<template>
  <div >
    <h2>Edit User</h2>
    <form  @submit.prevent="editUser">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <button class="btn" type="submit">Edit User</button>
    </form>
  </div>
  <h6 class="name"> © youssef laamim</h6>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      error: null,
    };
  },
  methods: {
    fetchUserList() {
      console.log("Fetching user list");
    },
    editUser() {
      const authToken = localStorage.getItem('authToken');
      console.log('authToken:', authToken);

      if (!this.username.trim()) {
        this.error = "Username is required";
        return;
      }

      this.error = null;

      const confirmed = window.confirm('Are you sure you want to edit this user?');

      if (confirmed) {
        axios.put('http://localhost:3000/admin/users', {
          username: this.username
        }, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
            .then(response => {

              console.log(response.data);

            })
            .catch(error => {

              console.error('Error editing user:', error.response.data);
              this.error = "Failed to edit user. Please try again.";
            });
      }
    }

  },
};
</script>

<style scoped>

.error {
  color: red;
  margin-top: 5px;
}
.btn{
  background-color: #4CAF50;
}
.name{
  margin-top: auto;
}
</style>
