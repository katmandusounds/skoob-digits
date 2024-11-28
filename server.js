const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mailchimp Configuration
const apiKey = 'a861519b1ab0e787893c9bff487740fe-us16'; // Replace with your Mailchimp API key
const serverPrefix = 'us16'; // Replace with your Mailchimp server prefix
const listId = '9bebefc8ca'; // Replace with your Mailchimp audience ID



// API Route to Collect Email and Forward to Mailchimp
app.post('/api/collect-email', async (req, res) => {
  const { email, firstName, lastName } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const response = await axios.post(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.status(200).json({ message: 'Successfully subscribed.' });
  } catch (error) {
    console.error('Error subscribing:', error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.detail || 'Failed to subscribe. Please try again.';
    res.status(500).json({ error: errorMessage });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
