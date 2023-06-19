const JwtService = {
  setJwt(key: string, token: string): void {
    localStorage.setItem(key, token);
  },

  getJwt(key: string): string {
    return localStorage.getItem(key) || '';
  },

  deleteJwt(key: string): void {
    localStorage.removeItem(key);
  },

  decodeJwt(token: string) {
   
    // تنفيذ فك تشفير JWT هنا
  }
};

export default JwtService;
/**
 * This code snippet defines a JwtService object that provides utility functions for working with JSON Web Tokens (JWT). 
The JwtService object contains four methods: setJwt, getJwt, deleteJwt, and decodeJwt.
The setJwt method takes two parameters: key (string) and token (string). It stores the JWT token in the browser's local storage using localStorage.setItem.
The getJwt method takes a key parameter (string) and retrieves the JWT token from the local storage using localStorage.getItem. 
If the token is not found, it returns an empty string.
The deleteJwt method takes a key parameter (string) and removes the JWT token from the local storage using localStorage.removeItem.
The decodeJwt method takes a token parameter (string). This method is currently empty and serves as a placeholder for implementing the JWT decoding logic.
 You would need to add the implementation to decode the JWT and return the decoded data.
 */