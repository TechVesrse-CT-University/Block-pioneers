import express from 'express';
import { 
  saveComponent, 
  getComponents, 
  searchComponents,
  likeComponent 
} from '../controllers/componentController.js';

const router = express.Router();

// Save a new component
router.post('/components', saveComponent);

// Get all components
router.get('/components', getComponents);

// Search components
router.get('/components/search', searchComponents);

// Like a component
router.patch('/components/:id/like', likeComponent);

export default router;
