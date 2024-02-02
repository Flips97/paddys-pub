// import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import './OrderHistoryPage.css';
// import * as usersService from '../../utilities/users-service';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
// import OrderList from '../../components/OrderList/OrderList';
// import OrderDetail from '../../components/OrderDetail/OrderDetail';
import * as ordersAPI from '../../utilities/orders-api'
// import formatCurrency from '../../utilities/formatCurrency';
// import './OrderHistory.css'

export default function OrderHistory() {
    const[orders, setOrders] = useState ([])

    useEffect(() => {
        async function getOrders() {
            try {
            const orders = await ordersAPI.getOrders();
            setOrders(orders);
            } catch (error) {
            console.error('Error fetching orders:', error);
            }
        }
        getOrders();
    }, []);

    return (
        <div className='OrderHistory'>
            {orders.map((order, index) => (
                <div key={index} className="oh-order">
                    <p className="oh-date">
                        
                        <span className="oh-ddmmyy">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                        </span>
                        <span className="oh-num">
                            Order # {order._id}
                        </span>
                    </p>
                    <div className="oh-lineItems">
                        {order.lineItems.map((lineItem, lineIndex) => (
                            <div className="oh-li">
                                <p key={lineIndex}>{lineItem.item.name}</p>
                                <p className="oh-liPrice">
                                    <span>
                                        {lineItem.qty}x 
                                    </span>
                                    <span>
                                        ${lineItem.extPrice}
                                    </span>
                                    <span className="oh-extPrice">
                                        {/* {formatCurrency(lineItem.extPrice)} */}
                                    </span>
                                </p>
                            </div>
                            ))}
                        <div className="oh-total">
                            {/* {formatCurrency(order.orderTotal)} */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}