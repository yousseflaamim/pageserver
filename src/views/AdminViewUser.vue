<!--
  This code represents a Vue component named "AdminViewRemovingPromoting" that displays a confirmation dialog for deleting a
The template defines the HTML structure of the dialog.
The dialog is conditionally rendered based on the dialog prop. It appears as an overlay when dialog is true.
Inside the dialog, there is a v-card component from Vuetify library, which contains the confirmation message and action buttons.
The username of the selected user is displayed within the message using string interpolation ({{ selectedUser.username }}).
The Cancel button triggers the closeDialog method when clicked, emitting a custom event named 'close-dialog'.
The Confirm button triggers the deleteUser method when clicked, emitting a custom event named 'delete-user' and passing the selected user object as the payload.
The script section defines the component's behavior and data.
The props property defines the expected props for the component: dialog (a boolean indicating whether the dialog should be displayed) and selectedUser (the user object selected for deletion).
The methods section contains two methods:
closeDialog emits a custom event named 'close-dialog', indicating that the user wants to close the dialog without deleting the user.
deleteUser emits a custom event named 'delete-user' and passes the selectedUser object as the payload, indicating that the user wants to proceed with the deletion
-->
<template>
  <div>
    <header class="header-container">
      <div class="title-container">
        <h1 class="title">Bookstore Admin User</h1>
      </div>
      <div class="login-button">
        <button class="btn" @click="login">Login</button>
      </div>
    </header>
    <h2 class="search-title">Search:</h2>
    <input type="text" v-model="searchQuery" class="search-input" placeholder="Enter search query">
    <div class="button-container">
      <button id="user" @click="viewUser">User</button>
      <button @click="viewBooks">Books</button>
    </div>
    <table class="books-table">
      <thead id="tablehead">
        <tr>
          <th>Username</th>
          <th>Role</th>
          <th>Purchases</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.purchases }}</td>
          <td>
          <button id="btn1" @click="promoteUser(user)">Promote</button>

            <button @click="showDeleteConfirmation(user)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add the delete confirmation dialog component here -->
    <admin-view-removing-promoting-user
      :dialog="showConfirmationDialog"
      :selectedUser="selectedUser"
       @close-dialog="closeDeleteConfirmationDialog"
       @delete-user="deleteUser"
      ></admin-view-removing-promoting-user>

  </div>
</template>

<script>
import AdminViewRemovingPromotingUser from "../views/AdminViewRemovingPromotingUser.vue";

export default {
  name:'AdminViewUser',
  data() {
    return {
      searchQuery: "",
      users: [
        {
          id: 1,
          username: "User 1",
          role: "Role 1",
          purchases: 3
        },
        {
          id: 2,
          username: "User 2",
          role: "Role 2",
          purchases: 5
        }
      ],
      showConfirmationDialog: false,
      selectedUser: null
    };
  },
  components: {
    AdminViewRemovingPromotingUser
  },
  methods: {
    login() {
      // Add your login logic here
    },
    viewUser() {
      // Add your viewUser logic here
    },
    viewBooks() {
      // Add your viewBooks logic here
    },
    promoteUser() {
      // Add your promoteUser logic here
    },
    showDeleteConfirmation() {
      this.selectedUser = '';
      this.showConfirmationDialog = true;
    },
    closeDeleteConfirmationDialog() {
      this.selectedUser = null;
      this.showConfirmationDialog = false;
    },
    deleteUser() {
      const index = this.findIndex(u => u.id === '');
      if (index !== -1) {
        this.splice(index, 1);
      }
      this.closeDeleteConfirmationDialog();
    }
  }
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

.btn {
  margin-top: px;
  text-align: right;
}

.user-view {
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
  margin: 0;
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
  background-color: gray;
}

.books-table {
  width: 100%;
  margin-top: 0.1px;
  border-collapse: collapse;
}

.books-table th,
.books-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}
.button-container {
  display: flex;
  justify-content: right;;
  margin-bottom: 1px;
  
}
#user{
  background-color: black;
  color: aliceblue;
}


.button-container button {
  width: 150px;
  font-size: 18px; 
}
#btn1{
  margin: 12px;
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
