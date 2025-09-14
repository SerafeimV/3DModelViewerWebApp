import Button from "../ui/Button";
import {useNavigate} from "react-router";
import {AuthService} from "../../services/auth.ts";
import {useCallback} from "react";

interface HeaderProps {
    withExtras?: boolean;
}

function Header({withExtras = false}: HeaderProps) {
    const navigate = useNavigate();
    const handleLogout = useCallback(() => {
        AuthService.logout().then(
            () => console.log("Logged out successfully")
        );
        navigate("/login");
    }, [])

    return (
        <nav className="navbar navbar-expand-sm sticky-top">
            <div className="container-fluid">
                {withExtras ?
                    <>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand" href="">3D Model Viewer</a>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <Button onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </>
                    :
                    <a className="navbar-brand" href="">
                        3D Model Viewer
                    </a>
                }
            </div>
        </nav>
    );
}

export default Header
