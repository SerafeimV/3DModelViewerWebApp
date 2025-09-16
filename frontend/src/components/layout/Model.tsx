import {OBJLoader} from "three/addons";
import {FBXLoader} from "three/addons";
import {GLTFLoader} from "three/addons";
import {useEffect, useState} from "react";
import * as THREE from "three";

interface ModelProps {
    url: string;
    file: string;
}

function Model({url, file}: ModelProps) {
    const [object, setObject] = useState<THREE.Object3D | null>(null);
    useEffect(() => {
        if (file.endsWith(".glb") || file.endsWith(".gltf")) {
            new GLTFLoader().load(url, (gltf: any) => setObject(gltf.scene));
        } else if (file.endsWith(".obj")) {
            new OBJLoader().load(url, (obj: any) => setObject(obj));
        } else if (file.endsWith(".fbx")) {
            new FBXLoader().load(url, (fbx: any) => setObject(fbx));
        }
    }, [url, file])

    return object ?
        <primitive object={object}/> :
        <>
            <boxGeometry args={[2, 2, 2]}/>
            <meshStandardMaterial color="red"/>
        </>;
}

export default Model;