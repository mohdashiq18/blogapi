const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/linkedin-data', async (req, res) => {
  const { url } = req.body;

  try {
    const linkedinResponse = await axios.get(url);
    const html = linkedinResponse.data;

    // Load the HTML content into cheerio
    const $ = cheerio.load(html);

    // Extract the image URL
    const imageUrl = $('meta[property="og:image"]').attr('content');

    // Extract the description
    const description = $('meta[property="og:description"]').attr('content');

    // Extract the heading (title of the webpage)
    const heading = $('title').text();

    // Create a JSON response object with labels
    const responseData = {
      imageUrl,
      description,
      heading,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching LinkedIn data' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
