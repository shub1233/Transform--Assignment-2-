import { useRef, useState } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { Vector3 } from "three";

const Experience = () => {
  const [lastPlanePos, setLastPlanePos] = useState([0, 0, 0]);
  const planeRef = useRef();
  const ball1 = useRef();
  const ball2 = useRef();
  const ball3 = useRef();
  const ball4 = useRef();
  const ball5 = useRef();

  const handleChange = () => {
    const displacement = new Vector3([0, 0, 0]);
    const oldPos = new Vector3(lastPlanePos[0], lastPlanePos[1], lastPlanePos[2]);
    displacement.subVectors(planeRef.current.position, oldPos);

    ball1.current.position.add(displacement);
    ball2.current.position.add(displacement);
    ball3.current.position.add(displacement);
    ball4.current.position.add(displacement);
    ball5.current.position.add(displacement);

    setLastPlanePos([planeRef.current.position.x, planeRef.current.position.y, planeRef.current.position.z]);
  }

  return (
    <>
      <OrbitControls makeDefault />
      <gridHelper name="grid" args={[55, 100, "black", "white"]} />

      <mesh ref={planeRef} position={[0, 0.1, 0]} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>

      <TransformControls object={planeRef} mode="translate" onChange={() => handleChange()} />

      <mesh ref={ball1} position={[3, 0.29, 0]} scale={0.2}>
        <sphereGeometry />
        <meshBasicMaterial color="red" />
      </mesh>

      <mesh ref={ball2} position={[-3, 0.29, 0]} scale={0.2}>
        <sphereGeometry />
        <meshBasicMaterial color="green" />
      </mesh>

      <mesh ref={ball3} position={[3, 0.29, -4]} scale={0.2}>
        <sphereGeometry />
        <meshBasicMaterial color="gray" />
      </mesh>

      <mesh ref={ball4} position={[2, 0.29, -2]} scale={0.2}>
        <sphereGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>

      <mesh ref={ball5} position={[-3, 0.29, -4]} scale={0.2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>
    </>
  );
};

export default Experience;
