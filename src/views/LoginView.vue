<!--
  This code represents a Vue component for a login form in a bookstore website
The template defines the HTML structure of the component.
It includes a header section with the bookstore title and a main section for the login form.
The login form consists of two input fields for username and password, a link to the registration page, and a login button.
The form uses Vue directives (v-model, v-bind, v-on) for data binding and event handling.
The script section defines the component's behavior and data using the Composition API.
The setup function is used to set up the component.
ref is imported from the Vue package and used to create reactive variables for username and password.
The login function is defined to handle the login logic.
Inside the login function, a UserDetail object is created with the entered username and password values.
The HandelLoginService (assumed to be a custom login service) is imported and used to attempt a login with the user details.
If the login is successful (result === 'Successfully'), the router is used to navigate to the admin view of books.
If the login fails, an alert is shown with the message "The user does not exist".
Overall, this component represents a login form for the bookstore website. It allows users to enter their username and password, attempts to log them in,
 and provides a link to the registration page for new users. The login logic is handled by an external service, and upon successful login, the user is redirected to the admin view of books.
-->
<template>
  <div>
    <header class="header-container">
      <h1 class="title">Bookstore</h1>
    </header>
    <main class="content-container">
      <div class="form-container">
        <h2 class="form-title">Login</h2>
        <form class="login-form">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <div class="form-group">
            <p class="account-question">Don't have an account?</p>
            <router-link to="/register" class="signup-link">Click here</router-link>
          </div>
    <button class="login-button" @click="login">Login</button>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: #4CAF50;
  color: white;
}

.title {
  font-size: 24px;
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.form-container {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-title {
  font-size: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.account-question {
  font-size: 14px;
  margin-bottom: 5px;
}

.signup-link {
  font-size: 14px;
  text-decoration: none;
}

.login-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>



<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HandelLoginService from '../service/HandelLoginService';
import  UserDetail  from '../models/UserDetail';

export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const login = async () => {
      const userDetails: UserDetail = {
        username: username.value,
        password: password.value,
        role: '' 
      };

      const result = await HandelLoginService.login(userDetails);

      if (result === 'Successfully') {
        const router = useRouter();
        router.push('/adminviewbooks');
      } else {
            alert("The user does not exist"); 
      }
    };

    return {
      username,
      password,
      login
    };
  },
};
</script>






