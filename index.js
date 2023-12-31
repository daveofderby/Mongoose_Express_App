const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const {category} = req.query;
    if (category) {
        const products = await Product.find({category})
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }    
    console.log('Path request: ', req.path)
    // console.log(products)
})

app.get('/products/new', (req, res) => {

    console.log('Path request: ', req.path)
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    console.log('Path request {POST}: ', req.path)
    const newProduct = new Product(req.body);
    await newProduct.save();
    // console.log(newProduct)
    res.redirect(`/products/${newProduct.id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log('Path request: ', req.path)
    // console.log(product)
    res.render('products/show', { product })
}
)

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log('Path request: ', req.path)
    res.render('products/edit', { product, categories })
}
)

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    console.log('Path request {PUT}: ', req.path)
    res.redirect(`/products/${product._id}`)
}
)

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndRemove(id)
    console.log('Path request {DELETE}: ', req.path)
    res.redirect(`/products/`)
}
)


app.get('/', (req, res) => {
    res.send('Silence')
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})