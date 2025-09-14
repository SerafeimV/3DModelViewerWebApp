import LoginForm from "../components/layout/LoginForm.tsx";
import Layout from "../components/layout/Layout.tsx";
import {Link} from "react-router";

function LoginPage() {
    return (
        <Layout>
            <LoginForm/>
            <hr className="separator"/>
            <p>Don't have an account?</p>
            <Link to={"/register"}> Register</Link>
        </Layout>
    );
}

export default LoginPage;