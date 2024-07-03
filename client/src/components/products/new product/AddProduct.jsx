import React from 'react'
import { useState } from 'react'
import '../../css/AddProduct.css';
import ImageUpload from '../../tools/ImageUpload';
function AddProduct({ setProductList, userIn, setShowForm }) {
    const [uploadPhoto, setUploadPhoto] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        pic: '',
        quantity: ''
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
                category: '',
                pic: '',
                quantity: ''
            });
            setUploadPhoto(data.insertedId);
        }).catch(error => {
            console.error('Error:', error);
        });
    };
    return (
        <div className="new-product-form">
            <i className="fas fa-times" onClick={() => setShowForm(false)}></i>
            <h2>Add New Product</h2>

            {!uploadPhoto && <form onSubmit={handleSubmit}>
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
                        Category:
                        <input
                            type="text"
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add Product</button>
            </form>}
            {uploadPhoto && <div>
                <ImageUpload type={"products"} url={`http://localhost:3305/${userIn}/products/${uploadPhoto}`} afterUpload={setShowForm} parametersAfterUpload={false}/>
            </div>}
        </div>
    )
}

export default AddProduct