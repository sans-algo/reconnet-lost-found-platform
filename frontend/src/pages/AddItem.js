import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'lost',
    location: '',
    date: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Base64 helper (REQUIRED FIX)
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.location ||
      !formData.date ||
      !formData.contactName ||
      !formData.contactPhone ||
      !formData.contactEmail
    ) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      let dataToSend = { ...formData };

      if (image) {
        dataToSend.image = await toBase64(image);
      }

      await api.post('/items', dataToSend);

      alert('Item added successfully!');
      navigate('/my-items');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false); // ✅ ALWAYS stops loading
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2>Add Lost/Found Item</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Item Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            <p style={styles.helpText}>Max size: 5MB. JPG, PNG, GIF</p>
          </div>

          {imagePreview && (
            <div style={styles.imagePreviewContainer}>
              <img
                src={imagePreview}
                alt="Preview"
                style={styles.imagePreview}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                style={styles.removeImageButton}
              >
                Remove Image
              </button>
            </div>
          )}

          <div style={styles.formGroup}>
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ ...styles.input, minHeight: '100px' }}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Documents">Documents</option>
              <option value="Accessories">Accessories</option>
              <option value="Clothing">Clothing</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Contact Name *</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Contact Phone *</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              style={styles.input}
              maxLength="10"
            />
          </div>

          <div style={styles.formGroup}>
            <label>Contact Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '2rem'
  },
  formBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  fileInput: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  helpText: {
    fontSize: '0.85rem',
    color: '#666'
  },
  imagePreviewContainer: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '8px'
  },
  removeImageButton: {
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginTop: '1rem'
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  }
};

export default AddItem;
