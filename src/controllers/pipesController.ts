import { Request, Response } from 'express';
import { fetchInsights, queryLLM } from '../services/analyticsServices';

/**
 * Controller for fetching general analytics insights.
 */
export const getInsights = async (req: Request, res: Response): Promise<void> => {
  try {
    const insights = await fetchInsights();
    res.status(200).json({ insights });
  } catch (error) {
    console.error('Error fetching analytics insights:', error);
    res.status(500).json({ message: 'Failed to fetch analytics insights.' });
  }
};

/**
 * Controller for performing an LLM-based query.
 */
export const performLLMQuery = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.body;

  if (!query) {
    res.status(400).json({ message: 'Query is required.' });
    return;
  }

  try {
    const response = await queryLLM(query);
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error performing LLM query:', error);
    res.status(500).json({ message: 'Failed to perform LLM query.' });
  }
};
