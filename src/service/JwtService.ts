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
