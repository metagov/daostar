import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from "three";
import { Vector3 } from 'three'
import eyeIllustration from './eye_illustration.jpeg';
import './Eye.css';
import Box from "./Box";

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new Vector3()
  
    return useFrame(() => {
      camera.position.lerp(vec.set(-mouse.x, -mouse.y, camera.position.z), 0.5)
      camera.lookAt(0, 0, 0)
    })
}

const Sphere = () => {
    
    const ref = useRef()
    const base = new THREE.TextureLoader().load(eyeIllustration)
    
    // useFrame(() => console.log('executing'));

    return (
        <mesh visible castShadow ref={ref}
            rotation={[0, 0.25, 0.25]}
            position={[0, 0, -1]}
        >
            <sphereGeometry attach="geometry" args={[3, 48, 48]} />
            <meshPhongMaterial
                map={base}
                color="white"
            />
        </mesh>
    );
  };

const Eye = () => {

    return ( 
        <div className='BigEye'>
            <Canvas>
                <ambientLight intensity={0.5} castShadow={true} />
                <directionalLight color="white" position={[-50, 0, -100]} castShadow={true} />
                <directionalLight color="white" position={[-2000, 0, -200]} castShadow={true} />
                <Sphere />
                <Rig />
            </Canvas>
        </div>
    );
};

export default Eye;