import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const response = await api.get('/items/user/my-items');
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await api.delete(`/items/${itemId}`);
      setItems(items.filter(item => item._id !== itemId));
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>My Items</h1>

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
    padding: '3rem',
    fontSize: '1.2rem'
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
