
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
import UserDetail from '../models/UserDetail';
export default {
 name :'LoginView',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const login = () => {
      if (username.value === 'youssef' && password.value === '1234') {
        router.push('/adminviewbooks');
      } else {
        alert('Invalid credentials');
      router.push('/register');

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






