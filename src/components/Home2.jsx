import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home2 = () => {
  
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');

  // Fetch products 
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Fetch reviews only when a product is selected
  useEffect(() => {
    if (selectedProductId) {
      fetch(`http://localhost:3001/api/reviews?product_id=${selectedProductId}`)
        .then(response => response.json())
        .then(data => setReviews(data))
        .catch(error => console.error('Error fetching reviews:', error));
    }
  }, [selectedProductId]);

  // Handle product selection
  const handleProductChange = (event) => {
    setSelectedProductId(event.target.value);
  };
    
      return (
        <div>
        <h1>a</h1>
        <h1>a</h1>
        <Link className="press-button" to='/'>Home</Link>
          
          <h2 className='container2'>Product Reviews</h2>
    
          <select className="container1" onChange={handleProductChange}>
            <option className="select_a_product" value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
    
         
          
          {reviews.length > 0 && (
            <div className='inputs1'>
              <h3>Reviews:</h3>
              <ul>
                {reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.reviewer_name}:</strong> {review.review} (Rating: {review.rating})
                  </li>
                ))}
              </ul>
            </div>
          )}
    
         
          {selectedProductId && reviews.length === 0 && (
            <p>No reviews for this product.</p>
          )}
        </div>
      );
    }
    
    export default Home2;

