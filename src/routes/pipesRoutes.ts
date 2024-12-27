import { Router } from 'express';
import { getInsights, performLLMQuery } from '../controllers/pipesController';

const router = Router();

/**
 * Route to get general analytics insights
 * GET /pipes/insights
 */
router.get('/insights', getInsights);

/**
 * Route to perform an LLM-based query
 * POST /pipes/llm-query
 */
router.post('/llm-query', performLLMQuery);

export default router;
