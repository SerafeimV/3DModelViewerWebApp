import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Model from "./Model.tsx";

interface RendererProps {
    useEnvironment?: boolean;
    modelUrl?: string;
    modelFile?: string;
}

function Renderer({useEnvironment = false, modelUrl = "", modelFile = ""}: RendererProps) {

    return (
        <div className="custom-container inline-block position-data" id="canvas-container">
            <Canvas>
                {useEnvironment ?
                    <Environment preset="dawn" background/> :
                    <color attach="background" args={["#1c1c1c"]}/>
                }
                <ambientLight intensity={0.1}/>
                <directionalLight position={[0, 0, 5]}/>
                <mesh rotation={[0.4, 0.2, 0]}>
                    {modelFile !== "" && modelUrl !== "" ?
                        <Model url={modelUrl} file={modelFile.toLowerCase()}/>
                        :
                        <></>
                    }
                </mesh>
                <OrbitControls/>
            </Canvas>
        </div>
    );
}

export default Renderer;
