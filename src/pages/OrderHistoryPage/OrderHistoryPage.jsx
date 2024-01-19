import { checkToken } from "../../utilities/users-service"

export default function OrderHistoryPage() {
    async function handleClickToken() {
        const expDate = await checkToken()
        console.log(expDate)
    }
    return (
        <>  
            <h1>OrderHistoryPage</h1>
            <button onClick={handleClickToken}>Check When My Login Expires</button>        
        </>
    
    )
}