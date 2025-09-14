import {Link} from "react-router";

function NotFoundPage() {
    return (
        <div>
            <h1>404 NOT FOUND</h1>
            <Link to={"/"}>
                Return
            </Link>
        </div>
    );
}

export default NotFoundPage;