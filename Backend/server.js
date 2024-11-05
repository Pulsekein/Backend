// server.js
const express = require('express');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());

// Mock data

let cart = [];
const products=[
    {
        imageUrl:"https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?cs=srgb&dl=pexels-pixabay-277319.jpg&fm=jpg",
        name:"watch",
        id:1,
        price:"200 $"
    },
    {
        imageUrl:"https://images.bestsellerclothing.in/data/selected/09-Aug-2023/213334601_g6.jpg?width=1080&height=1355&mode=fill&fill=blur&format=auto",
        name:"shirt",
        id:2,
        price:"200 $"
    },{
        imageUrl:"https://fullyfilmy.in/cdn/shop/products/New-Mockups---no-hanger---TShirt-Written-and-Directed-by-chennai.jpg?v=1662807782",
        name:"tshirt",
        id:3,
        price:"200 $"
    },{
        imageUrl:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
        name:"shoe",
        id:4,
        price:"200 $"
    },{
        imageUrl:"https://m.media-amazon.com/images/I/614+6kcDXOL.jpg",
        name:"perfum",
        id:5,
        price:"200 $"
    },{
        imageUrl:"https://5.imimg.com/data5/SELLER/Default/2022/8/RZ/RJ/GZ/136711916/gold-standard-100-whey-protein-500x500.jpg",
        name:"protein",
        id:6,
        price:"200 $"
    }
];

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get product details
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) res.json(product);
    else res.status(404).send('Product not found');
});

// Add to cart
app.post('/api/cart', (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        res.json({ message: 'Product added to cart', cart });
    } else {
        res.status(404).send('Product not found');
    }
});

// Checkout
app.post('/api/checkout', (req, res) => {
    const { success } = req.body;
    cart = [];
    if (success) res.json({ message: 'Payment successful!' });
    else res.json({ message: 'Payment failed.' });
});
const PORT=5000 || process.env.PORT;
app.listen(PORT, () => console.log('Server running on port 5000'));
