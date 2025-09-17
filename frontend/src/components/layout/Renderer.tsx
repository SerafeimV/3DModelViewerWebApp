import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Model from "./Model.tsx";
import {useState} from "react";

interface RendererProps {
    useEnvironment?: boolean;
    modelUrl?: string;
    modelFile?: string;
}

function Renderer({useEnvironment = false, modelUrl = "", modelFile = ""}: RendererProps) {
    let [directionalLightIntensity, setDirectionalLightIntensity] = useState(0.5);
    let [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);

    return (
        <div className="custom-container inline-block position-data" id="canvas-container">
            <Canvas>
                {useEnvironment ?
                    <Environment preset="dawn" background/> :
                    <color attach="background" args={["#a1a1a1"]}/>
                }
                <ambientLight intensity={ambientLightIntensity}/>
                <directionalLight castShadow={true} intensity={directionalLightIntensity} position={[0, 4, 5]}/>
                <mesh>
                    {modelFile !== "" && modelUrl !== "" ?
                        <Model url={modelUrl} file={modelFile.toLowerCase()}/>
                        :
                        <></>
                    }
                </mesh>
                <OrbitControls/>
            </Canvas>
            <label className="form-label">Directional Light Intensity</label>
            <input type="range" className="form-range" min="0" max="5" value={directionalLightIntensity} step="0.1"
                   id="customRange2"
                   onChange={(e) => {
                       setDirectionalLightIntensity(Number(e.target.value))
                   }}/>
            <label className="form-label">Ambient Light Intensity</label>
            <input type="range" className="form-range" min="0" max="5" value={ambientLightIntensity} step="0.1"
                   id="customRange2"
                   onChange={(e) => {
                       setAmbientLightIntensity(Number(e.target.value))
                   }}/>
        </div>
    );
}

export default Renderer;
