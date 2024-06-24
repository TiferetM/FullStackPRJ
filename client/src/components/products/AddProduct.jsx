import React from 'react'
import { useState } from 'react'

function AddProduct({ setProductList, userIn }) {
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
        fetch(`http://localhost:3305/${userIn}/products`, {
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
            setProductList(productList => [...productList, { ...newProduct, price: parseFloat(newProduct.price) }]);
            setNewProduct({
                name: '',
                description: '',
                price: '',
                imageUrl: ''
            });
        }).catch(error => {
            console.error('Error:', error);
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