import axios from 'axios';

const API_URL = 'http://todo-laravel.test/api';

export default store => axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${store.state.token}`,
  },
});
