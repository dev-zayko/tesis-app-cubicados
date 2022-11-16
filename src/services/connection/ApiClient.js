import axios from 'axios';
import React from 'react';

export default axios.create({
  baseURL: 'http://10.0.2.2:3131/api/',
  headers: {
    'Content-type': 'application/json',
  },
});
