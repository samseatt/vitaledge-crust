import { Router } from 'express';
import analyticsRoutes from './analyticsRoutes';
import dashboardRoutes from './dashboardRoutes';
import houseRoutes from './houseRoutes';
import patientRoutes from './patientRoutes';
import caseRoutes from './caseRoutes';
import pipesRoutes from './pipesRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

router.use('/analytics', analyticsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/house', houseRoutes);
router.use('/patient', patientRoutes);
router.use('/case', caseRoutes);
router.use('/pipes', pipesRoutes);
router.use('/admin', adminRoutes);

export default router;
