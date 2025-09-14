import {useNavigate} from "react-router";
import {useFieldChanged} from "../../hooks/useFieldChanged.ts";
import {useState} from "react";
import {AuthService} from "../../services/auth.ts";
import InputField from "../ui/InputField.tsx";
import Button from "../ui/Button.tsx";

function RegisterForm() {
    const navigate = useNavigate();

    const {field: firstName, setField: setFirstName, handleChange: handleFirstNameChange} = useFieldChanged("");
    const {field: lastName, setField: setLastName, handleChange: handleLastNameChange} = useFieldChanged("");
    const {field: email, setField: setEmail, handleChange: handleEmailChange} = useFieldChanged("");
    const {field: password, setField: setPassword, handleChange: handlePasswordChange} = useFieldChanged("");
    const {
        field: confirmPassword,
        setField: setConfirmPassword,
        handleChange: handleConfirmPasswordChange
    } = useFieldChanged("");

    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        console.log("Submitting register request");
        e.preventDefault();
        if (processing) return;
        setProcessing(true);
        setError("");

        try {
            let response = await AuthService.register({email, firstName, lastName, password, confirmPassword});

            console.log("Register successful:", response);

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            navigate("/app");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "An error occurred during login");
        } finally {
            setProcessing(false);
        }

    }
    return (
        <form onSubmit={onSubmit}>
            {error ? <div>{error}</div> : null}
            <div className="container align-content-center">
                <div className="fit-content-center">
                    <InputField name={"First Name"} type={"text"} id={"first-name"} callback={handleFirstNameChange}/>
                    <InputField name={"Last Name"} type={"text"} id={"last-name"} callback={handleLastNameChange}/>
                    <InputField name={"Email"} type={"email"} id={"email"} callback={handleEmailChange}/>
                    <InputField name={"Password"} type={"password"} id={"password"} callback={handlePasswordChange}/>
                    <InputField name={"Confirm Password"} type={"password"} id={"confirmPassword"}
                                callback={handleConfirmPasswordChange}/>
                </div>
                <div className="button-with-padding row">
                    <Button type={"submit"}>Register</Button>
                </div>
            </div>
        </form>
    );
}

export default RegisterForm;