require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5001;

app.post('/get-insights', async (req, res) => {
    console.log("Received request:", req.body); // Log the request
    const { messages } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: messages
            })
        });

        const data = await response.json();
        console.log("OpenAI API response:", data); // Log the response

        if (!response.ok) {
            throw new Error(data.error?.message || "OpenAI API error");
        }

        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));