const Order = require('../model/order')
const Product = require('../model/product')

exports.getOrder = async (req, res) => {

    //get Order
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
    const { customer_id } = req.body;
    const orders = await Order.query()
        .where('customer_id', customer_id)
        .withGraphFetched('products')
        .orderBy('id')
    return res.status(200).json(orders)
}

exports.deleteOrder = async (req, res) => {
    try {
        const { product_id, customer_id } = req.body;

        if (product_id != '' || customer_id != '') {

            const order = await Order.query().findById('product_id');

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            const deletedOrder = await Order.query()
                .where({ id: product_id })
                .deleteById('product_id');

            if (!deletedOrder) {
                throw new Error("Failed to delete order");
            }

            return res.status(200).json({ message: "Order deleted" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateOrder = async (req, res) => {

}


// const Order = require('../model/order')

// exports.getOrder = async (req, res) => {
//     //get an Order
//     try {
//         const { id } = req.params;
//         const order = await Order.query().findById(id);
//         if (!order) {
//             throw new Error("failed to get order, id not found");
//         }
//         res.status(200).json(order)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error'); //error
//     }
// }

// exports.getOrders = async (req, res) => {
//     //get all Orders
//     try {
//         const orders = await Order.query();
//         if (!orders) {
//             throw new Error("check db connection, order table doesn't exit")
//         }
//         res.status(200).json(orders)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error'); //error
//     }
// }



// exports.CreateOrder = async (req, res) => {
//     //create new order
//     try {
//         if (req.body.price != '' || req.body.customer_id != '') {
//             //create
//             const order = await Order.query().insertGraph({
//                 customer_id: req.body.customer_id,
//                 price: req.body.price,
//                 product: req.body.product

//             });
//             if (!order) {
//                 throw new Error("check db connection, order table doesn't exit")
//             }
//             return res.status(200).json(order)
//         }// if condition ends here

//         return res.status(409).json({ message: "please fill all fields" })

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error'); //error
//     }
// }

// exports.deleteOrder = async (req, res) => {
//     //delete Order
//     try {
//         const id = req.params.id;

//         const order = await Order.query().findById(id);
//         if (!order) {
//             return res.status(204).json({ message: "order already deleted" })
//         }

//         const deleted = await Order.query().deleteById(id);
//         if (!deleted) {
//             throw new Error("check db connection, failed to delete order")
//         }
//         return res.status(200).json({ message: "order deleted" })

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error'); //error
//     }
// }

// exports.updateOrder = async (req, res) => {
//     // update an order
//     try {
//         const id = req.params.id;
//         const updatedEmployee = req.body;

//         const order = await Order.query().findById(id).update(updatedEmployee);
//         if (!order) {
//             throw new Error("check db connection, failed to update order")
//         }
//         return res.status(200).json({ message: "order updated successfully" })

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error'); //error
//     }

// }

