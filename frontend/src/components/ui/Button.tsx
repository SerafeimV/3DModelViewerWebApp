import type {ReactNode} from "react";

interface ButtonProps {
    children: ReactNode;
    type?: "submit" | "button";
    onClick?: (e: any) => void;
}

function Button({children, type = "button", onClick}: ButtonProps) {
    return (
        <button type={type} className={"btn btn-primary"} onClick={onClick}>{children}</button>
    );
}

export default Button;