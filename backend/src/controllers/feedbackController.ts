import { Request, Response } from 'express';
import { fetchContentFromURL } from '../services/contentService';
import { givePageFeedback } from '../services/contentService';

const analyzeLandingPage = async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;

    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }

    try {
        // Fetch content from the URL
        const content = await fetchContentFromURL(url);

        // Analyze the content
        const feedback = await givePageFeedback(content);

        res.status(200).json({ feedback });
        return;
    } catch (error) {
        console.error('Error analyzing landing page:', error);
        res.status(500).json({ error: 'Failed to analyze landing page' });
        return;
    }
}

export { analyzeLandingPage }