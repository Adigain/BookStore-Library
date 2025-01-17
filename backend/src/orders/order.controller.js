const Order = require("./order.model");

const postAOrder = async(req, res) => {
    try{
        const newOrder = await Order({...req.body});
        await newOrder.save();
        console.log("Order posted successfully", newOrder)
        res.status(200).send({message: "Order posted successfully", order: newOrder})
    }
    catch (err) {
        console.log("Error creating order", err)
        res.status(500).send({message: "Failed to create order"})
    }
}

const getOrdersByEmail = async (req, res) => {
    try{
        const {mail} = req.params
        const allOrdersByEmail = await Order.find({email: mail})
        if (allOrdersByEmail.length === 0) {
            console.log("Order with this email does not exist. Email: ", mail)
            res.status(200).send({message: "Order with this email does not exist", allOrdersByEmail})
        }
        else {
            console.log("Fetched order by email", allOrdersByEmail)
            res.status(200).send({message: "Order by email fetched successfully", allOrdersByEmail})
        }
    }
    catch (err){
        console.log("Error fetching orders by email", err)
        res.status(500).send({message: "Failed to fetch orders by email"})
    }
}

const getAllOrders = async(req, res) => {
    try{
        /*const allBooks = await Book.find().sort({createdAt: -1})*/ 
        const allOrders = await Order.find()
        console.log("Fetched all orders", allOrders)
        res.status(200).send({message: "All orders fetched successfully", allOrders})
    }
    catch (err) {
        console.log("Error fetching orders", err)
        res.status(500).send({message: "Failed to fetch orders"})
    }
}

const getSingleOrder = async(req, res) => {
    try{
        const {id} = req.params
        const singleOrder = await Order.findById(id)
        if (!singleOrder) {
            console.log("Order with this id does not exist. Id: ", id)
            res.status(404).send({message: "Order with this id does not exist", id})
        }
        else {
            console.log("Fetched order", singleOrder)
            res.status(200).send({message: "Order fetched successfully", singleOrder})
        }
    }
    catch (err) {
        console.log("Error fetching order", err)
        res.status(500).send({message: "Failed to fetch order"})
        
    }
}

const updateOrder = async(req, res) => {
    try{
        const {id} = req.params
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {new: true})
        if (!updatedOrder) {
            console.log("Order with this id does not exist. Id: ", id)
            res.status(404).send({message: "Order with this id does not exist", id})
        }
        else {
            console.log("Updated order", updatedOrder)
            res.status(200).send({message: "Order updated successfully", updatedOrder})
        }
        
    }
    catch (err){
        console.log("Error updating order", err)
        res.status(500).send({message: "Failed to update order"})
    }
}

const deleteAOrder = async(req, res) => {
    try{
        const {id} = req.params
        const deletedOrder = await Order.findByIdAndDelete(id)
        if (!deletedOrder) {
            console.log("Order with this id does not exist. Id: ", id)
            res.status(404).send({message: "Order with this id does not exist", id})
        }
        else {
            console.log("Deleted order", deletedOrder)
            res.status(200).send({message: "Order deleted successfully", deletedOrder})
        }
    }
    catch (err) {
        console.log("Error deleting order", err)
        res.status(500).send({message: "Failed to delete order"})
    }
}

module.exports = {
    postAOrder,
    getOrdersByEmail,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteAOrder
}