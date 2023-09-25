const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!!!!")
        console.log(err)
    })

const p = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})

p.save()
    .then(p => {
        console.log(p)
    }).catch(e => {
        console.log(e)
    })

const seedProducts = [
    {
        name: 'Tomatos',
        price: 1.50,
        category: 'fruit'
    },
    {
        name: 'Cucumber',
        price: 0.50,
        category: 'vegetable'
    },
    {
        name: 'Brie',
        price: 1.99,
        category: 'dairy'
    },
    {
        name: 'Lemon Chilli',
        price: 3.99,
        category: 'vegetable'
    },
    {
        name: 'Apple',
        price: 0.19,
        category: 'fruit'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    }).catch(e => {
        console.log(e)
    })