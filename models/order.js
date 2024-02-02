const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema')

const lineItemSchema = new Schema({
  // Set qty to 1 when new item pushed into lineItems
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

lineItemSchema.virtual('extPrice').get(function() {
    return this.qty * this.item.price
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // Makes sense to embed an order's line items
    lineItems: [lineItemSchema],
    // A user's unpaid order is their "cart"
    isPaid: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0)
})

orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, item) => total + item.qty, 0)
})

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase()
})

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true }
    )
}

orderSchema.methods.addItemToCart = async function (itemId) {
    // 'this' keyword is bound to the cart (order doc)
    const cart = this;
    // Check if the item already exists in the cart
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem) {
      // It already exists, so increase the qty
      lineItem.qty += 1;
    } else {
      // Get the item from the "catalog"
      // Note how the mongoose.model method behaves as a getter when passed one arg vs. two
      const Item = mongoose.model('Item');
      const item = await Item.findById(itemId);
      // The qty of the new lineItem object being pushed in defaults to 1
      cart.lineItems.push({ item });
    }
    // return the save() method's promise
    return cart.save();
  };

  orderSchema.methods.setItemQty = function(itemId, newQty) {
    const cart = this
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));

    if(lineItem && newQty <= 0) {
      lineItem.deleteOne()
    } else if (lineItem) {
      lineItem.qty = newQty
    }

    return cart.save()
  }

module.exports = mongoose.model('Order', orderSchema)