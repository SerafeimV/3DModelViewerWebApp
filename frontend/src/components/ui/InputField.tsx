interface InputFormProps {
    children?: string,
    name: string,
    type: "password" | "email" | "text" | "file",
    id: string,
    callback?: (e: any) => void
}

function InputField({children, name, type, id, callback}: InputFormProps) {
    return (
        <div className="mb-3 mt-3 row justify-content-center">
            <label htmlFor={id} className="col-sm-2 col-form-label text-start">{name}:</label>
            <div className="col-auto">
                <input type={type} className="col-sm-2 form-control" id={id} aria-describedby={id + "HelpBlock"}
                       onChange={callback}/>
            </div>
            <span id={id + "HelpBlock"} className="form-text col-auto">
                {children}
            </span>
        </div>
    );
}

export default InputField;