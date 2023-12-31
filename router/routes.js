const Customer = require('../controllers/customer')
const Order = require('../controllers/order')
const Product = require('../controllers/product')

const router = require('express').Router();

router.get('/v1/customer/:id', (req, res) => {
    Customer.getCustomer(req, res);
});

router.get('/v1/customers', (req, res) => {
    Customer.getCustomers(req, res);
});

router.post('/v1/customer-with-token', (req, res) => {
    Customer.getCustomerWithToken(req, res);
});



router.post('/v1/customer', (req, res) => {
    Customer.CreateCustomer(req, res)
});

router.patch('/v1/customer/:id', (req, res) => {
    Customer.updateCustomer(req, res)
});

router.delete('/v1/customer/:id', (req, res)=> {
    Customer.deleteCustomer(req, res);
})

// orders
router.get('/v1/order/:id', (req, res) => {
    Order.getOrder(req, res);
});

// get all orders with customer Id
router.post('/v1/orderWithCustomerId', (req, res) => {
    Order.getOrderWithCustomerId(req, res);
});

router.get('/v1/orders', (req, res) => {
    Order.getOrder(req, res);
});


router.post('/v1/order', (req, res) => {
    Order.CreateOrder(req, res)
});

router.post('/v1/orders-with-customerId', (req, res) => {
    Order.getOrders(req, res)
});

router.patch('/v1/order/:id', (req, res) => {
    Order.updateOrder(req, res)
});

// delete all order
router.delete('/v1/deleteOrders', (req, res)=> {
    Order.deleteOrders(req, res);
})

// delete a single order by id
router.delete('/v1/deleteAnOrder/:id', (req, res)=> {
    Order.deleteOrder(req, res);
})


//products
router.get('/v1/products', (req, res) => {
    Product.getProducts(req, res)
});

module.exports = router;