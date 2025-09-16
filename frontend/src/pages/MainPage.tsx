import Layout from "../components/layout/Layout";
import Renderer from "../components/layout/Renderer";
import AllModels from "../components/layout/AllModels";
import Button from "../components/ui/Button";
import {useLoadModels} from "../hooks/useLoadModels.tsx";
import ErrorDisplay from "../components/ui/ErrorDisplay.tsx";
import Modal from "react-modal";
import {useState} from "react";
import UploadModal from "../components/layout/UploadModal.tsx";

Modal.setAppElement("#root");

function MainPage() {
    let {models, error, loading, refresh} = useLoadModels();
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = (needRerender: boolean = false) => {
        setModalIsOpen(false);
        if (needRerender) {
            refresh().then(() => console.log("Models refreshed"));
        }
    };
    const modalStyle = {
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
            backgroundColor: 'white',
            border: '2px solid rgb(240, 240, 240)',
            borderRadius: '12px',
            height: 'fit-content',
            width: '300px',
            top: '120px',
            left: 'calc(50% - 150px)',
        }
    };

    return (
        <>
            <Layout headerWithExtras={true}>
                <div className="parent">
                    <Renderer useEnvironment={true} modelFile={models.at(selectedIndex)?.filename}
                              modelUrl={selectedModel}/>
                    <div className="custom-container-all-models inline-block position-data"
                         style={{marginLeft: "1rem"}}>
                        {error ?
                            <ErrorDisplay error={error}/> :
                            loading ? <p>Loading...</p> :
                                <AllModels setSelectedIndex={setSelectedIndex} setOnSelect={setSelectedModel}
                                           items={models}/>}
                        <div style={{marginTop: "1rem"}}>
                            <Button onClick={() => {
                                setModalIsOpen(true)
                            }}>
                                Upload
                            </Button>
                            <UploadModal modalIsOpen={modalIsOpen} closeModal={closeModal} modalStyle={modalStyle}/>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default MainPage;