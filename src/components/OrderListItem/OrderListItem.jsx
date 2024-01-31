export default function OrderListItem({ordersItem ,key}) {
    return (        
        <div>
        <div className="name">Order ID: {ordersItem.orderId} </div>
        <div className="name">${ordersItem.orderTotal.toFixed(2)} </div>
        <div className="name">{ordersItem.totalQty} items</div>
        </div>        
  );
}