const Order = require('../model/order')

exports.getOrder = async (req, res) => {

    //get Order
}

exports.getOrders = async (req, res) => {
    try{

    //get Orders
    const { customer_id } = req.body;

   if(!customer_id){
    return res.status(409).json({message : 'request must have have customer_id '})
   }
    const order  = await Order.query()
    .where('customer_id', customer_id)
     .orderBy('id');
     
     if(!order){
         throw new Error('customer id doesnt exist')
        }
    res.status(200).json({message : 'orders from customer', order} );
    
    }catch (error) {
    console.log(error);
    res.status(500).send('Server error'); //error
}

}



exports.CreateOrder = async (req, res) => {
    //create
    try {
        // const {name , city} = req.body;
        if(req.body.product_id != '' || req.body.customer_id != ''){
            //create
            const order = await Order.query().insertGraph({
                product_id: req.body.product_id,
                customer_id: req.body.customer_id,
                price: req.body.price
            });
            if(!order){
                throw new Error("check db connection, customer table doesn't exit")
            }
           return res.status(200).json(order)
        }// if condition ends here
        
          return  res.status(409).json({message: "cannot create order without customer id or product id"})
            
        }catch (error) {
            console.log(error);
            res.status(500).send('Server error'); //error
        }
}

exports.getOrderWithCustomerId = async (req, res) => {
    const {customerId } = req.params;
    const orders = Order.query().select('*').where('customer_id', customerId).orderBy('id');
    return res.status(200).json(orders)

}

exports.deleteOrder = async (req, res) => {
    //delete Order
}

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

