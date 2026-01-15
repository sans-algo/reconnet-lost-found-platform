const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getLostItems,
  getFoundItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getMyItems,
  searchItems,
  filterItems
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllItems);
router.get('/lost', getLostItems);
router.get('/found', getFoundItems);
router.get('/search', searchItems);
router.get('/filter', filterItems);
router.get('/:id', getItemById);






// Protected routes (require authentication)
router.post('/', protect, createItem);
router.get('/user/my-items', protect, getMyItems);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;