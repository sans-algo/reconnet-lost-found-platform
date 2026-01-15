import api from './api';

// Get all items
export const getAllItems = async () => {
  try {
    const response = await api.get('/items');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch items'
    };
  }
};

// Get lost items
export const getLostItems = async () => {
  try {
    const response = await api.get('/items/lost');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch lost items'
    };
  }
};

// Get found items
export const getFoundItems = async () => {
  try {
    const response = await api.get('/items/found');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch found items'
    };
  }
};

// Get single item by ID
export const getItemById = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch item'
    };
  }
};

// Create new item
export const createItem = async (itemData) => {
  try {
    const response = await api.post('/items', itemData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create item'
    };
  }
};

// Update item
export const updateItem = async (id, itemData) => {
  try {
    const response = await api.put(`/items/${id}`, itemData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update item'
    };
  }
};

// Delete item
export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete item'
    };
  }
};

// Get user's items
export const getMyItems = async () => {
  try {
    const response = await api.get('/items/user/my-items');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch your items'
    };
  }
};

// Search items
export const searchItems = async (query) => {
  try {
    const response = await api.get(`/items/search?q=${query}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Search failed'
    };
  }
};

// Filter items by category
export const filterItems = async (category, status) => {
  try {
    let url = '/items/filter?';
    if (category) url += `category=${category}&`;
    if (status) url += `status=${status}`;
    
    const response = await api.get(url);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Filter failed'
    };
  }
};