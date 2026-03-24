const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/get-direct', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: 'Missing URL' });

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const directLink = $('meta[property="og:image"]').attr('content');

        res.json({ direct_link: directLink });
    } catch (err) {
        res.status(500).json({ error: 'Failed' });
    }
});

app.listen(3000);
