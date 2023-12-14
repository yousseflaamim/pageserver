import axios from 'axios';
import JwtService from './JwtService';
import UserDetails from '@/models/UserDetail';

const API_URL = 'http://localhost:3000/auth';

const HandelLoginService = {
  async login(userDetails: UserDetails): Promise<'Successfully' | 'Incorrect username or password'> {
    console.log('Login method in HandelLoginService called');
    try {
      const response = await axios.post(`${API_URL}/login`, userDetails);
      
      console.log(response); 
      JwtService.setJwt('jwt', response.data);

      return 'Successfully';
    } catch (error) {
      console.error(error);
      return 'Incorrect username or password';
    }
  },
};

export default HandelLoginService;

