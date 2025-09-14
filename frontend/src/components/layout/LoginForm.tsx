import {useNavigate} from "react-router";
import {AuthService} from "../../services/auth.ts";
import {useFieldChanged} from "../../hooks/useFieldChanged.ts";
import {useState} from "react";
import InputField from "../ui/InputField.tsx";
import Button from "../ui/Button.tsx";
import ErrorDisplay from "../ui/ErrorDisplay.tsx";

function LoginForm() {
    const navigate = useNavigate();

    const {field: email, setField: setEmail, handleChange: handleEmailChange} = useFieldChanged("");
    const {field: password, setField: setPassword, handleChange: handlePasswordChange} = useFieldChanged("");

    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        console.log("Submitting login request");
        e.preventDefault();
        if (processing) return;
        setProcessing(true);
        setError("");

        try {
            let response = await AuthService.login({email, password});

            setEmail("");
            setPassword("");

            navigate("/app");
            return response;

        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "An error occurred during login");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            {error ? <ErrorDisplay error={error}/> : null}
            <div className="container align-content-center">
                <div className="fit-content-center">
                    <InputField name={"Email"} type={"email"} id={"email"} callback={handleEmailChange}/>
                    <InputField name={"Password"} type={"password"} id={"password"} callback={handlePasswordChange}/>
                </div>
                <div className="button-with-padding row">
                    <Button type={"submit"}>
                        {processing ?
                            "Processing..." :
                            "Login"
                        }
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;