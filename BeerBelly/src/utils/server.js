  const express = require('express');
  const axios = require('axios');
  const NodeGeocoder = require('node-geocoder');

  const app = express();
  const port = 3001;

  const options = {
    provider: 'openstreetmap',
    httpAdapter: 'axios',
    axios: axios.create({
      timeout: 5000,
      retries: 3,
      retryDelay: 1000
    })
  };

  const geocoder = NodeGeocoder(options);

  app.use(express.json());

  app.post('/geocode', async (req, res) => {
    try {
      const { address } = req.body;
      const result = await geocoder.geocode(address);
      res.json(result);
    } catch (error) {
      console.error('Geocoding error:', error);
      res.status(500).json({ error: 'Geocoding failed', details: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
