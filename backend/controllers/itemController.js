const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('userId', 'name email phone').sort('-createdAt');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get lost items only
// @route   GET /api/items/lost
// @access  Public
const getLostItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'lost' }).populate('userId', 'name email phone').sort('-createdAt');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get found items only
// @route   GET /api/items/found
// @access  Public
const getFoundItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'found' }).populate('userId', 'name email phone').sort('-createdAt');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'name email phone');
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new item (WITH IMAGE SUPPORT)
// @route   POST /api/items
// @access  Private
const createItem = async (req, res) => {
  try {
    const { title, description, category, status, location, date, 
            contactName, contactPhone, contactEmail, image } = req.body;

    // Validate all required fields
    if (!title || !description || !category || !status || !location || 
        !date || !contactName || !contactPhone || !contactEmail) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create item (image is optional)
    const item = await Item.create({
      title,
      description,
      category,
      status,
      location,
      date,
      contactName,
      contactPhone,
      contactEmail,
      image: image || null, // Image is optional
      userId: req.user.id
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user owns this item
    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    // Update item
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {
        new: true,
        runValidators: true
      }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user owns this item
    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's items
// @route   GET /api/items/my-items
// @access  Private
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id }).sort('-createdAt');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search items by title or description
// @route   GET /api/items/search?q=wallet
// @access  Public
const searchItems = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (!searchQuery) {
      return res.status(400).json({ message: 'Please provide search query' });
    }

    const items = await Item.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    }).populate('userId', 'name email phone').sort('-createdAt');

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Filter items by category
// @route   GET /api/items/filter?category=Electronics
// @access  Public
const filterItems = async (req, res) => {
  try {
    const { category, status } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const items = await Item.find(filter).populate('userId', 'name email phone').sort('-createdAt');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};