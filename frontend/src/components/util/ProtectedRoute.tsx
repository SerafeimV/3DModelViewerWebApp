import {Navigate} from "react-router-dom";
import {AuthService} from "../../services/auth.ts";

interface ProtectedRouteProps {
    children?: any;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const isAuth = AuthService.isAuthenticated();
    return isAuth ? children : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;