import axios from 'axios';
import JwtService from './JwtService';
import UserDetails from '@/models/UserDetail';

const API_URL = 'http://localhost:3000/auth';

const HandelLoginService = {
  async login(userDetails: UserDetails): Promise<'Successfully' | 'Incorrect username or password'> {
    console.log('Login method in HandelLoginService called');
    try {
      const response = await axios.post(`${API_URL}/login`, userDetails);
      
      console.log(response); // Log the response for debugging
      JwtService.setJwt('jwt', response.data);

      return 'Successfully';
    } catch (error) {
      console.error(error);
      return 'Incorrect username or password';
    }
  },
};

export default HandelLoginService;

/**
 * This code snippet defines a HandelLoginService object that handles user login functionality. 
The axios library is imported to make HTTP requests.
The JwtService module is imported from the './JwtService' file. This module is responsible for handling JSON Web Tokens.
The UserDetails interface is imported from the '@/models/UserDetail' file. This interface represents the structure of user login details.
The API_URL constant holds the base URL for the authentication API. In this case, it is set to "http://localhost:3000/auth"
 */