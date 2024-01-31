import OrderListItem from "../OrderListItem/OrderListItem";

export default function OrderList({orders}) {
  const ordersDB = orders.map(order =>
    <OrderListItem
      key={order._id}
      ordersItem={order}
    />
  );
  return (
    <main className="MenuList">
        {ordersDB}
    </main>
  );
}