import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import { getAllItems, getLostItems, getFoundItems, searchItems, filterItems } from '../services/itemService';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchItems();
  }, [filter]);

  const fetchItems = async () => {
    setLoading(true);
    let result;
    
    if (filter === 'lost') {
      result = await getLostItems();
    } else if (filter === 'found') {
      result = await getFoundItems();
    } else {
      result = await getAllItems();
    }
    
    if (result.success) {
      setItems(result.data);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      fetchItems();
      return;
    }

    const result = await searchItems(searchQuery);
    if (result.success) {
      setItems(result.data);
    }
  };

  const handleCategoryFilter = async () => {
    if (!category) {
      fetchItems();
      return;
    }

    const result = await filterItems(category, null);
    if (result.success) {
      setItems(result.data);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Lost & Found Items</h1>

      <div style={styles.filterButtons}>
        <button 
          onClick={() => setFilter('all')}
          style={{
            ...styles.filterButton,
            backgroundColor: filter === 'all' ? '#007bff' : '#ddd'
          }}
        >
          All Items
        </button>
        <button 
          onClick={() => setFilter('lost')}
          style={{
            ...styles.filterButton,
            backgroundColor: filter === 'lost' ? '#ff4444' : '#ddd'
          }}
        >
          Lost Items
        </button>
        <button 
          onClick={() => setFilter('found')}
          style={{
            ...styles.filterButton,
            backgroundColor: filter === 'found' ? '#44aa44' : '#ddd'
          }}
        >
          Found Items
        </button>
      </div>

      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          Search
        </button>
      </div>

      <div style={styles.categoryFilter}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Documents">Documents</option>
          <option value="Accessories">Accessories</option>
          <option value="Clothing">Clothing</option>
          <option value="Others">Others</option>
        </select>
        <button onClick={handleCategoryFilter} style={styles.searchButton}>
          Filter
        </button>
        <button 
          onClick={() => {
            setCategory('');
            setSearchQuery('');
            fetchItems();
          }} 
          style={styles.clearButton}
        >
          Clear Filters
        </button>
      </div>

      {items.length === 0 ? (
        <p style={styles.noItems}>No items found</p>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <ItemCard key={item._id} item={item} showActions={false} />
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
  filterButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  filterButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold'
  },
  searchBar: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  searchButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  categoryFilter: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem'
  },
  select: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  clearButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  noItems: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.1rem',
    color: '#666'
  }
};

export default Dashboard;
