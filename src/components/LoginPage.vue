<template>
  <div>
    <h1 class="login-title">Login</h1>
    <div class="login-container">
      <form @submit.prevent="login" class="form-container">
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div class="form-group">
          <p class="account-question">Don't have an account?</p>
          <router-link to="/auth/register" class="signup-link">Click here</router-link>
        </div>
        <button type="submit" class="signup-button">Login</button>
        <button class="gust" @click="gustUser">proceed as Gust user</button>
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
      username: '',
      password: '',
      loginError: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          username: this.username,
          password: this.password,
        });

        const authToken = response.data.accessToken;

        localStorage.setItem('authToken', authToken);

        const storedToken = localStorage.getItem('authToken');

        this.$router.push('/library/books');
      } catch (error) {
        if (error.response) {
          this.loginError = `Login error: ${error.response.data.error}`;
        } else if (error.request) {
          this.loginError = 'No response received from the server';
        } else {
          this.loginError = 'Error setting up the request';
        }
      }
    },
    gustUser(){
      this.$router.push('/gust');
    }
  },
};
</script>
<style scoped>
.login-title {
  text-align: center;
  margin: 0;
  background-color: #4CAF50
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.form-container {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  margin-top: 29px;

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
.gust{
  margin-top: 12px;
  width: 100%;
}
.name{
  margin-top: auto;
}
</style>
