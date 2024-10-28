import React, { Component } from 'react';
import axios from 'axios';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      userId: 'ed177aae-aaca-4e80-afcc-83e467f7ee97', // Pre-filled User ID
      category: '',
      imageUrl: '',
      successMessage: '',
      errorMessage: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, userId, category, imageUrl } = this.state;

    // Title validation
    if (!title || typeof title !== 'string') {
      this.setState({ errorMessage: 'Title should not be empty and must be a string!' });
      return;
    }

    // Price validation
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) {
      this.setState({ errorMessage: 'Price must be a number greater than or equal to 0!' });
      return;
    }

    // User ID validation
    if (!userId) {
      this.setState({ errorMessage: 'User ID should not be empty!' });
      return;
    }

    // Other field validations
    if (!category || !imageUrl || !description) {
      this.setState({ errorMessage: 'All fields are required!' });
      return;
    }

    const productData = {
      title,
      description,
      price: priceValue, // Use the parsed price value
      userId,
      category,
      imageUrl,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/products/create-product',
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.setState({
        successMessage: 'Product created successfully!',
        errorMessage: '',
        title: '',
        description: '',
        price: '',
        userId: 'ed177aae-aaca-4e80-afcc-83e467f7ee97',  // Reset to pre-filled User ID
        category: '',
        imageUrl: '',
      });
      console.log('Response data:', response.data);
    } catch (error) {
      this.setState({
        errorMessage: error.response?.data?.message || 'Failed to create product. Please try again.',
        successMessage: '',
      });
      console.log(error);
    }
  };

  render() {
    const { title, description, price, userId, category, imageUrl, errorMessage, successMessage } = this.state;

    return (
      <div className="create-product-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h1>Create Product</h1>
        <form onSubmit={this.handleFormSubmit}>
          {/* Title Field */}
          <div>
            <input
              type="text"
              name="title"
              placeholder="Enter product title"
              value={title}
              onChange={this.handleInputChange}
              required
              style={{ padding: '10px', width: '100%', margin: '10px 0' }}
            />
          </div>

          {/* Description Field */}
          <div>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={description}
              onChange={this.handleInputChange}
              required
              style={{ padding: '10px', width: '100%', margin: '10px 0' }}
            />
          </div>

          {/* Price Field */}
          <div>
            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={price}
              onChange={this.handleInputChange}
              required
              style={{ padding: '10px', width: '100%', margin: '10px 0' }}
            />
          </div>

          {/* User ID Field */}
          <div>
            <input
              type="text"
              name="userId"
              placeholder="Enter your User ID"
              value={userId}
              onChange={this.handleInputChange}
              required
              style={{ padding: '10px', width: '100%', margin: '10px 0' }}
            />
          </div>

          {/* Category Field */}
          <div>
            <input
              type="text"
              name="category"
              placeholder="Enter product category"
              value={category}
              onChange={this.handleInputChange}
              required
              style={{ padding: '10px', width: '100%', margin: '10px 0' }}
            />
          </div>

          {/* Image URL Field */}
          <div>
            <input
              type="text"
              name="imageUrl"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={this.handleInputChange}
              required
              style={{ padding: '10px', width: '100%', margin: '10px 0' }}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Create Product
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <div style={{ color: 'green', marginTop: '10px' }}>
            <p>{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
}

export default CreateProduct;


