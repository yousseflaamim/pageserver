<!--
  This code represents a Vue component for a registration form in a bookstore website
The template defines the HTML structure of the component.
It includes a header section with the bookstore title and a main section for the registration form.
The registration form consists of two input fields for username and password, a checkbox for agreeing to the terms and conditions, and a signup button.
The form uses Vue directives (v-model, v-bind, v-on) for data binding and event handling.
The script section defines the component's behavior and data.
The component is given the name "RegisterView".
The data function returns the initial data state, including username, password, and agreeTerms variables.
The signup method is defined to handle the signup logic.
Inside the signup method, an HTTP POST request is made to the server's registration endpoint (http://localhost:3000/auth/register).
The username and password are sent in the request body.
Depending on the response status, appropriate alerts are shown to the user.
If the registration is successful (response.status === 201), an alert is shown with the message "Registration successful!", and the user is redirected to 
the admin view of books.
If the registration fails due to a duplicate username (error.response.status === 403), an alert is shown to choose a different username.
If any other error occurs during registration, a generic error alert is shown.
Overall, this component represents a registration form for the bookstore website. It allows users to enter a username and password, agree to the terms and conditions, and sign up for a new account. The registration 
logic is handled by an external API using axios. Upon successful registration, the user is alerted and redirected to the admin view of books.
-->
<template>
  <div>
    <header class="header-container">
      <h1 class="title">Bookstore</h1>
    </header>
    <main class="content-container">
      <div class="form-container">
        <h2 class="form-title">Register a new account</h2>
        <form class="signup-form">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          
          <div class="form-group">
            <label for="terms">I have read and agree to the Terms and Conditions</label>
            <input type="checkbox" id="terms" v-model="agreeTerms">
          </div>
          <button class="signup-button" :disabled="!agreeTerms" @click="signup">Signup</button>
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
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 20px;
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

.signup-button {
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

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      password: '',
      
      agreeTerms: false
    };
  },
  methods: {
  signup() {
  axios
    .post('http://localhost:3000/auth/register', {
      username: this.username,
      password: this.password
    })
    .then(response => {
      if (response && response.status === 201) {
        alert('Registration successful!');
        // Redirect the user to the login page or AdminViewBooks page
        this.$router.push('/adminviewbooks');
      } else {
        alert('An error occurred during registration!');
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        alert('Username already exists. Please choose a different username.');
      } else {
        alert('An error occurred during registration. Please try again later.');
      }
    });
    }
  }
};

</script>
