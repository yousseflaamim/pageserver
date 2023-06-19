import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
/**
 * The code you provided sets up a Vue application with routing
createApp is a function from the Vue package used to create a new Vue application instance.
App is imported from the './App.vue' file. It represents the root component of the application.
router is imported from the './router' file. It represents the Vue Router instance.
createApp(App) creates a new Vue application instance, passing the root component App as an argument.
.use(router) registers the Vue Router instance with the Vue application, allowing it to handle routing.
.mount('#app') mounts the Vue application to the DOM element with the id 'app'. This is the element where the application will be rendered.
By using createApp, registering the router with .use(router), and mounting the application with .mount('#app'), you are setting up the Vue application to use the Vue Router 
and rendering it in the specified DOM element.
 */