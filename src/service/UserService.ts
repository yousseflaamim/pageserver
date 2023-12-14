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

