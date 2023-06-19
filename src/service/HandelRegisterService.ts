import axios from 'axios';
import JwtService from './JwtService';
import UserDetails from '@/models/UserDetail';

const API_URL = 'http://localhost:3000/auth';

const HandelRegisterService = {
  async register(userDetails: UserDetails) {
    try {
      const response = await axios.post(`${API_URL}/register`, userDetails);
      JwtService.setJwt('jwt', response.data);
    } catch (error) {
      console.error(error);
      return 'Account already exists!';
    }
  },
};

export default HandelRegisterService;
/**
 * This code snippet defines a HandelregisterService object that handles user register functionality. 
The axios library is imported to make HTTP requests.
The JwtService module is imported from the './JwtService' file. This module is responsible for handling JSON Web Tokens.
The UserDetails interface is imported from the '@/models/UserDetail' file. This interface represents the structure of user login details.
The API_URL constant holds the base URL for the authentication API. In this case, it is set to "http://localhost:3000/auth"
 */