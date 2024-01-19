
<template>
  <div>
    <h1 class="register-title">Register</h1>
    <div class="login-container">
      <form @submit.prevent="registerUser" class="form-container">
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div v-if="message">{{ message }}</div>
        <button type="submit" class="signup-button">Login</button>
      </form>
    </div>
  </div>
  <h6 class="name"> © youssef laamim</h6>

</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
    };
  },
  methods: {
    registerUser() {
      console.log('Registering user...');
      this.$axios.post('http://localhost:3000/auth/register', {
        username: this.username,
        password: this.password,
      })
          .then(response => {
            console.log('Registration successful:', response.data);
            this.message = response.data.message;
            this.$router.push('/auth/login');
          })
          .catch(error => {
            console.error('Registration error:', error);
            this.message = `Error: ${error.message}`;
          });
    },
  },
};
</script>

<style scoped>
.register-title {
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
.name{
  margin-top: auto;
}
</style>
