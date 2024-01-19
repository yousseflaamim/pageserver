<!-- youssef laamim-->
<template>
  <div class="header-container">
    <h1>AdminViewUsers</h1>
    <h3 class="search-title">Search:</h3>

    <input v-model="searchQuery" @input="handleSearch" placeholder="Search by title" />


    <button class="add-button" @click="singout">sing out</button>
  </div>
  <!-- 2 -->

  <EditUserForm v-if="showEditUserModal" @edit-book="handleEditUser" />

  <div v-if="showEditUserModal" class="modal-overlay">
    <div class="modal">
      <button @click="closeEditUserModal">Close</button>
      <AdminViewEditUser @save="saveUser" @cancel="closeEditUserModal" />
    </div>

  </div>
  <!-- 2 -->
  <div class="button-container" style="text-align: right;">
    <button id="user" @click="viewUser">User</button>
    <button id="books" @click="viewBooks">Books</button>
  </div>

  <div>

    <table class="books-table">

      <thead class="headtable">
      <tr>
        <th>Username</th>
        <th>Role</th>
        <th>Purchases</th>
        <th>Availability</th>
      </tr>
      </thead>

      <tbody>

      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.purchases }}</td>
       <td>

          <button @click="toggleEditUserForm">Edit</button>
          <button @click="deleteUser(user)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
  <h6 class="name"> © youssef laamim</h6>
</template>

<script>
import axios from 'axios';

import AdminViewEditUser from "@/components/AdminViewEditUser.vue";

export default {
  components: {

    AdminViewEditUser,
  },
  data() {

    return {
      version: null,
      users: [],
      searchQuery: '',
      showEditUserForm: false,
      showEditUserModal: false,

    };
  },
  mounted() {
    this.fetchUserList();
  },
  methods: {


    fetchUserList() {
      const authToken = localStorage.getItem('authToken');
      const url = this.searchQuery
          ? `http://localhost:3000/admin/users/search?q=${this.searchQuery}`
          : 'http://localhost:3000/admin/users';

      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
          .then(response => {
            this.version = response.data.version;
            this.users = response.data.users;
          })
          .catch(error => {
            console.error('Error fetching user list', error.response.data);
          });
    },

    singout() {

      this.$router.push('/auth/login');
    },
    viewBooks(){
      this.$router.push('/library/books');
    },

    handleSearch() {
      this.fetchUserList();
    },
    toggleEditUserForm() {
      this.showEditUserModal = !this.showEditUserModal;
    },

    closeEditUserModal() {
      this.showEditUserModal = false;
    },

    deleteUser(user) {
      const authToken = localStorage.getItem('authToken');
      console.log('authToken:', authToken);

      const confirmed = window.confirm('Are you sure you want to delete this user?');

      if (confirmed) {
        axios.delete('http://localhost:3000/admin/users', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          },
          data: {
            username: user.username
          }
        })
            .then(response => {
              if (response.status === 200) {
                const backToDeleted = window.confirm('User deleted successfully! Do you want to go back?');
                this.fetchUserList();
              } else if (response.status === 404) {
                alert('User not found!');
              } else {
                console.error('Error deleting user:', response);
              }
            })
            .catch(error => {
              console.error('Error deleting user:', error);
            });
      }
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
#user{
  background: rgb(24, 25, 25);
}
#books{
  background: rgb(155, 159, 159);
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