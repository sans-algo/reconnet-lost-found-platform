import React from 'react';

const ItemCard = ({ item, onDelete, showActions }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={styles.card}>
      <div style={{
        ...styles.badge,
        backgroundColor: item.status === 'lost' ? '#ff4444' : '#44aa44'
      }}>
        {item.status.toUpperCase()}
      </div>
      
      {/* Display image if exists */}
      {item.image && (
        <img 
          src={item.image} 
          alt={item.title} 
          style={styles.image}
        />
      )}
      
      <h3 style={styles.title}>{item.title}</h3>
      <p style={styles.description}>{item.description}</p>
      
      <div style={styles.info}>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date:</strong> {formatDate(item.date)}</p>
      </div>
      
      <div style={styles.contact}>
        <p><strong>Contact:</strong> {item.contactName}</p>
        <p><strong>Phone:</strong> {item.contactPhone}</p>
        <p><strong>Email:</strong> {item.contactEmail}</p>
      </div>

      {showActions && onDelete && (
        <button 
          onClick={() => onDelete(item._id)}
          style={styles.deleteButton}
        >
          Delete
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '4px',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem'
  },
  title: {
    marginBottom: '0.5rem',
    color: '#333'
  },
  description: {
    color: '#666',
    marginBottom: '1rem'
  },
  info: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  },
  contact: {
    fontSize: '0.9rem',
    color: '#555'
  },
  deleteButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ItemCard;
