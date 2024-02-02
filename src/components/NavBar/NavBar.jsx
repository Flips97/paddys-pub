import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import './NavBar.css'

export default function NavBar({user, setUser}) {

    function handleLogOut() {
        userService.logOut();
        setUser(null)
    }

    return (
        <nav>
            <Link to="/orders">Order History</Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Orders</Link>
            &nbsp; | &nbsp;
            Welcome, {user.name} to Paddy's Pub
            &nbsp; | &nbsp;
            <Link to="#" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}