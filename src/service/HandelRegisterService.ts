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
