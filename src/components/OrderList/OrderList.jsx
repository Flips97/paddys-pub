import OrderListItem from "../OrderListItem/OrderListItem";
import './OrderList.css'

export default function OrderList({ orderHistory, setActiveOrder, activeOrder }) {
  const ordersDB = orderHistory.map(order =>
    <OrderListItem
      key={order._id}
      ordersItem={order}
      setActiveOrder={setActiveOrder}
      activeOrder={activeOrder}
    />
  );
  return (
    <main className="MenuList">
        {ordersDB}
    </main>
  );
}