import { Router } from 'express';
import { getInsights, performLLMQuery } from '../controllers/houseController';

const router = Router();

/**
 * Route to get general analytics insights
 * GET /house/insights
 */
router.get('/insights', getInsights);

/**
 * Route to perform an LLM-based query
 * POST /house/llm-query
 */
router.post('/llm-query', performLLMQuery);

export default router;
