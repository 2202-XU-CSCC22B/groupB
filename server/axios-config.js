const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3081' // Replace with your Node server URL
});

module.exports = instance;
