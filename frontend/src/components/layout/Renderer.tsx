import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

interface RendererProps {
    useEnvironment?: boolean;
    modelFile?: string;
}

function Renderer({useEnvironment = false, modelFile = ""}: RendererProps) {
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
                    {modelFile !== "" ?
                        <>
                            <boxGeometry args={[3, 3, 3]}/>
                            <meshStandardMaterial color="blue"/>
                        </> :
                        <>
                            <boxGeometry args={[2, 2, 2]}/>
                            <meshStandardMaterial color="red"/>
                        </>
                    }
                </mesh>
                <OrbitControls/>
            </Canvas>
        </div>
    );
}

export default Renderer;
