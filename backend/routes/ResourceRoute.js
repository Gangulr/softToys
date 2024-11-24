import express from 'express';
import {
  addResources,
  fetchAllResources,
  fetchResourceById,
  updateResource,
  deleteResource
} from '../controllers/ResourcesController.js';

const router = express.Router();

router.post('/', addResources);
router.get('/', fetchAllResources);
router.get('/:resourceId', fetchResourceById);
router.put('/:resourceId', updateResource);
router.delete('/:resourceId', deleteResource);

export default router;
