const Order = require('../model/order')
const Product = require('../model/product')

exports.getOrder = async (req, res) => {
    //get Order
    try {
        const { customer_id } = req.query;

        if (!customer_id) {
            return res.status(400).json({ message: 'customer_id is required' });
        }

        // Query the database to retrieve all orders for the given customer
        const orders = await Order.query()
            .where('customer_id', customer_id)
            .orderBy('id');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this customer' });
        }

        // Return the orders as a JSON response
        res.status(200).json({ message: 'Orders retrieved successfully', orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getOrders = async (req, res) => {
    try {

        //get Orders
        const { customer_id } = req.body;

        if (!customer_id) {
            return res.status(409).json({ message: 'request must have have customer_id ' })
        }
        const order = await Order.query()
            .where('customer_id', customer_id)
            .orderBy('id');

        if (!order) {
            throw new Error('customer id deosnt exit')
        }
        res.status(200).json({ message: 'orders from customer', order });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error'); //error
    }

}

exports.CreateOrder = async (req, res) => {
    //create
    try {
        const { product_id, customer_id } = req.body;

        if (product_id != '' || customer_id != '') {

            if (typeof (product_id == Number) || typeof (customer_id == Number)) {
                // getting the price
                const product = await Product.query().findById(product_id);
                console.log(product)

                if (product.price) {
                    //check if order is already inserted
                    const productId = await Order.query()
                        .where({ product_id: product_id, customer_id: customer_id })
                        .first();
                    if (productId) {
                        return res.status(409).json({ message: "product already added to cart" })
                    }

                    // product.id while false
                    //create
                    const order = await Order.query().insertGraph({
                        product_id: product_id,
                        customer_id: customer_id,
                        price: product.price
                    });
                    if (!order) {
                        throw new Error("check db connection, order table doesn't exit")
                    }
                    return res.status(200).json(order)
                }

            }

        }// if condition ends here

        return res.status(409).json({ message: "cannot create order without customer id or product id" })

    } catch (error) {
        console.error(error); // Log the error message
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getOrderWithCustomerId = async (req, res) => {
    try {
        const { customer_id } = req.body;

        const orders = await Order.query()
            .where('customer_id', customer_id)
            .withGraphFetched('products')
            .orderBy('id')

        return res.status(200).json(orders)
    } catch (error) {
        console.error(error); // Log the error message
        res.status(500).json({ error: 'Server error' });
    }

}

// delete order with customer id
exports.deleteOrders = async (req, res) => {
    try {
        const { customer_id } = req.query; // Get customer_id from query parameters

        if (!customer_id) {
            return res.status(400).json({ message: "Missing or undefined customer_id" });
        }

        // Use the `where` clause to specify the condition for deletion
        const deletedOrder = await Order.query()
            .where('customer_id', customer_id)
            .delete();

        if (!deletedOrder) {
            return res.status(404).json({ message: "No orders found for the specified customer_id" });
        }

        return res.status(200).json({ message: "Orders deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// delete a single order by id
exports.deleteOrder = async (req, res) => {
    //    write a similar thing to delete a single order by id from a customers orders
    try {
        const { id } = req.params; // Get the order_id from route parameters
        if (!id) {
            return res.status(400).json({ message: "Missing or undefined id" });
        }

        // Use the `deleteById` method to delete the order with the specified `order_id`
        const deletedOrder = await Order.query()
            .deleteById(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateOrder = async (req, res) => {

}

