const saveService = {
  setLocal(key: string, data: any): void {
    if (data !== undefined) {
      try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
      } catch (error) {
        console.error("Failed to save data to local storage:", error);
      }
    }
  },

  getLocal(key: string) {
    try {
      const serializedData = localStorage.getItem(key) || "{}";
      return JSON.parse(serializedData);
    } catch (error) {
      console.error("Failed to retrieve data from local storage:", error);
      return {};
    }
  },

  clearLocal(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Failed to clear local storage:", error);
    }
  },
};

export default saveService;

