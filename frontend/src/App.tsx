import './global.css'
import LoginPage from "./pages/LoginPage";
import {useEffect, useState} from "react";
import {AuthService} from "./services/auth.ts";
import MainPage from "./pages/MainPage.tsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsAuthenticated(AuthService.isAuthenticated());
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isAuthenticated ? <MainPage/> : <LoginPage/>}
        </>
    );

}

export default App;
