import { Router } from 'express';
import { getInsights, performLLMQuery } from '../controllers/adminController';

const router = Router();

/**
 * Route to get general analytics insights
 * GET /admin/insights
 */
router.get('/insights', getInsights);

/**
 * Route to perform an LLM-based query
 * POST /admin/llm-query
 */
router.post('/llm-query', performLLMQuery);

export default router;
