import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ start false

  useEffect(() => {
    const cached = localStorage.getItem('myItems');
    if (cached) {
      setItems(JSON.parse(cached)); // instant render
    }

    fetchMyItems();
    // eslint-disable-next-line
  }, []);

  const fetchMyItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/items/user/my-items');
      setItems(response.data);
      localStorage.setItem('myItems', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false); // ✅ ALWAYS stop loading
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await api.delete(`/items/${itemId}`);
      const updatedItems = items.filter(item => item._id !== itemId);
      setItems(updatedItems);
      localStorage.setItem('myItems', JSON.stringify(updatedItems));
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  return (
    <div style={styles.container}>
      <h1>My Items</h1>

      {/* ✅ INLINE LOADING (non-blocking) */}
      {loading && <div style={styles.loading}>Loading your items...</div>}

      {items.length === 0 ? (
        <p style={styles.noItems}>You haven't posted any items yet</p>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  loading: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#555'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  noItems: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.1rem',
    color: '#666'
  }
};

export default MyItems;
