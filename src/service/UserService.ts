import axios from 'axios';
import UserDetails from '@/models/UserDetail';


const BASE_USER_URL = 'http://localhost:3000/users';

const UserService = {
  async fetchAll(): Promise<UserDetails[]> {
    try {
      const response = await axios.get(BASE_USER_URL);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async fetchById(id: string): Promise<UserDetails | null> {
    try {
      const response = await axios.get(`${BASE_USER_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async createUser(userDetails: UserDetails): Promise<UserDetails | null> {
    try {
      const response = await axios.post(BASE_USER_URL, userDetails);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export default UserService;

/**
 * This code  UserService object that interacts with a user-related API endpoint
The UserService object contains three asynchronous methods: fetchAll, fetchById, and createUser.
The fetchAll method retrieves all user details from the specified API endpoint.
The fetchById method retrieves the user details of a specific user based on the provided id.
The createUser method creates a new user by sending a POST request to the API endpoint with the provided user details.
Each method uses axios to send HTTP requests and handles the responses and errors accordingly.
The UserService object is exported as the default export of the module, making it accessible in other parts of the codebase.
This code provides an abstraction layer for performing common user-related operations, such as fetching all users, fetching a user by ID, and creating a new user. It utilizes axios for making HTTP requests to the specified API endpoint and handles the responses and errors appropriately.
 */