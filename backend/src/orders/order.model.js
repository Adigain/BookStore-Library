const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    address: {
        street: {
            type: String, 
            required: true,
        },
        city: {
            type: String, 
            required: true,
        },
        country: {
            type: String, 
            required: true,
        },
        state: {
            type: String, 
            required: true,
        },
        zipcode: {
            type: String, 
            required: true,
        },
    },
    phone: {
        type: Number, 
        required: true,
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        }       
    ],
    totalPrice: {
        type: Number, 
        required: true,
    },   
  }, {
    timestamps: true,
  });

  /*
  {
    "address": {
        "city": "V",
        "country": "Ind",
        "state": "UP",
        "zipcode": "221005"
    },
    "email": "adipta.gain@gmail.com",
    "name": "Adi Gain",
    "phone": 1234567890,
    "productIds": ["677bde0d24b33cdbea130778", "677bdd0e24b33cdbea130758"],
    "totalPrice": "57.98"
} */

  const Order = mongoose.model('Order', orderSchema);

  module.exports = Order