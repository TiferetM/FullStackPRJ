import React from 'react'
import { useState } from 'react'

function AddProduct({ setProductList }) {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3305/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token'),
            },
            body: JSON.stringify(newProduct)
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log('Product added successfully:', data);
        }).catch(error => {
            console.error('Error:', error);
        });
        setProductList(productList => [...productList, { ...newProduct, price: parseFloat(newProduct.price) }]);
        setShowForm(false);
        setNewProduct({
            name: '',
            description: '',
            price: '',
            imageUrl: ''
        });
    };
    return (
        <div className="new-product-form">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="imageUrl"
                            value={newProduct.imageUrl}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct