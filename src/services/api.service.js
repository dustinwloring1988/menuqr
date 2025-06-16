import axios from 'axios';

const apiService = {
  getMenuItems() {
    return axios.get('/api/menu-items');
  },
};

export default apiService;