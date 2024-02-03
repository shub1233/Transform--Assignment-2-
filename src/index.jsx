import './style.css'
import ReactDOM from 'react-dom/client'
import Experience from './Experience'
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Canvas
            gl={{
                antialias: true,
                outputColorSpace: THREE.SRGBColorSpace
            }}
            // frameloop='demand'
            camera={{
                fov: 45,
                near: 0.1,
                far: 1000,
                position: [4, 4, 8]
            }}
        >
            <color args={['#AAAAAA']} attach="background" />
            <Experience />
        </Canvas>
    </>
);