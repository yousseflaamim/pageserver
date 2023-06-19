import { BookDetail } from '../models/BookDetail';

const BASE_BOOK_URL = "http://localhost:3000/library";

export default {
  async fetchAll(): Promise<Array<BookDetail>> {
    try {
      const response = await fetch(BASE_BOOK_URL + "/");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch books");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
