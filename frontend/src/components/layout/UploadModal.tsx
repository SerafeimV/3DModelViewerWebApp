import {useFileFieldChanged} from "../../hooks/useFileFieldChanged.ts";
import {useState} from "react";
import InputField from "../ui/InputField.tsx";
import Modal from "react-modal";
import Button from "../ui/Button.tsx";
import apiClient from "../../api/client.ts";

interface ModalProps {
    modalIsOpen: boolean;
    closeModal: any;
    modalStyle: any;
}

function UploadModal({modalIsOpen, closeModal, modalStyle}: ModalProps) {
    const {field: file, setField: setFile, handleChange: handleFileChange} = useFileFieldChanged();
    const [, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        console.log("Submitting upload request");
        e.preventDefault();
        if (processing) return;
        setProcessing(true);
        setError("");

        try {
            let formData = new FormData();
            if (file) {
                formData.append("file", file);
            }
            let response = await apiClient.post("/models/addModel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            setFile(undefined);
            console.log("Upload successful:", response);
            closeModal(true);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError(err.message || "An error occurred during upload");
        } finally {
            setProcessing(false)
        }
        closeModal(false);
    };

    return (
        <Modal isOpen={modalIsOpen}
               onRequestClose={closeModal}
               style={modalStyle}>
            <form onSubmit={onSubmit}>
                <div className="fit contnent-center">
                    <InputField name={"File"} type={"file"} id={"file"} callback={handleFileChange}/>
                </div>
                <div className="button-with-padding row">
                    <Button type={"submit"}>Upload</Button>
                </div>
            </form>
        </Modal>
    );
}

export default UploadModal;