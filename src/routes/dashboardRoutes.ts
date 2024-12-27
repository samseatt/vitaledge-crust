import { Router } from 'express';
import { getInsights, performLLMQuery } from '../controllers/dashboardController';

const router = Router();

/**
 * Route to get general analytics insights
 * GET /dashboard/insights
 */
router.get('/insights', getInsights);

/**
 * Route to perform an LLM-based query
 * POST /dashboard/llm-query
 */
router.post('/llm-query', performLLMQuery);

export default router;
