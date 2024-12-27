import { Router } from 'express';
import { getInsights, performLLMQuery } from '../controllers/analyticsController';

const router = Router();

/**
 * Route to get general analytics insights
 * GET /analytics/insights
 */
router.get('/insights', getInsights);

/**
 * Route to perform an LLM-based query
 * POST /analytics/llm-query
 */
router.post('/llm-query', performLLMQuery);

export default router;
