import SignUpForm from "../../components/SignUpForm/SignUpForm"
import SignUpFormFunc from "../../components/SignUpFormFunc/SignUpFormFunc"
import LoginForm from "../../components/LoginForm/LoginForm"
import './AuthPage.css'

export default function AuthPage({ setUser }) {
    return (
        <main>
            <h1>AuthPage</h1>
            <SignUpForm setUser={setUser}/>
            <LoginForm setUser={setUser} />
        </main>
    )
}