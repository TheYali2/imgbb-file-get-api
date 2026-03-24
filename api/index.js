const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Missing URL' });
    }

    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(response.data);
        const directLink = $('meta[property="og:image"]').attr('content');

        if (!directLink) {
            return res.status(404).json({ error: 'link not found' });
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({ direct_link: directLink });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch image' });
    }
};
