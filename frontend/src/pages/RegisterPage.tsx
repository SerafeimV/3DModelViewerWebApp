import Layout from "../components/layout/Layout.tsx";
import {Link} from "react-router";
import RegisterForm from "../components/layout/RegisterForm.tsx";

function RegisterPage() {
    return (
        <Layout>
            <RegisterForm/>
            <hr className="separator"/>
            <p>Already have an account?</p>
            <Link to={"/login"}> Login</Link>
        </Layout>
    );
}

export default RegisterPage;