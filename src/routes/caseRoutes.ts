import { Router } from 'express';
import { getInsights, performLLMQuery } from '../controllers/caseController';

const router = Router();

/**
 * Route to get general analytics insights
 * GET /case/insights
 */
router.get('/insights', getInsights);

/**
 * Route to perform an LLM-based query
 * POST /case/llm-query
 */
router.post('/llm-query', performLLMQuery);

export default router;
