import { useRef, useState, useEffect } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { DoubleSide, Matrix4, Quaternion, Vector3 } from "three";

const obj = {
  ball1: {
    position: [4, 4, 0],
    scale: [1, 1, 1],
    color: "red",
    args: [0.2]
  },
  ball2: {
    position: [-4, 3, 0],
    scale: [1, 1, 1],
    color: "green",
    args: [0.2]
  },
  ball3: {
    position: [3, -1, 0],
    scale: [1, 1, 1],
    color: "gray",
    args: [0.2]
  },
  ball4: {
    position: [-2, 0, 0],
    scale: [1, 1, 1],
    color: "blue",
    args: [0.2]
  },
  ball5: {
    position: [-1, -3, 0],
    scale: [1, 1, 1],
    color: "orange",
    args: [0.2]
  },
}

const Experience = () => {

  const [transformMode, setTransformMode] = useState("translate");


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "w":
      case "W":
        setTransformMode("translate");
        break;

      case "e":
      case "E":
        setTransformMode("rotate");
        break;

      case "r":
      case "R":
        setTransformMode("scale");
        break;
    }
  };

  const planeRef = useRef();
  const meshesRef = useRef();

  // const handleChange = () => {
  //   const displacement = new Vector3([0, 0, 0]);
  //   const oldPos = new Vector3(lastPlanePos[0], lastPlanePos[1], lastPlanePos[2]);
  //   displacement.subVectors(planeRef.current.position, oldPos);

  //   ball1.current.position.add(displacement);
  //   ball2.current.position.add(displacement);
  //   ball3.current.position.add(displacement);
  //   ball4.current.position.add(displacement);
  //   ball5.current.position.add(displacement);

  //   setLastPlanePos([planeRef.current.position.x, planeRef.current.position.y, planeRef.current.position.z]);
  // }

  const handleChange = () => {

    const position = new Vector3();
    const scale = new Vector3();
    const rotation = new Quaternion();

    // Extracting plane Matrix to manipulate points 
    // transformation with respect to plane's origin
    // decompose:- This method basically extacts position, rotation, scale from Transformation Matrix
    planeRef.current.matrix.decompose(position, rotation, scale);

    meshesRef.current.position.set(position.x, position.y, position.z);
    meshesRef.current.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    meshesRef.current.scale.set(scale.x, scale.y, scale.z);
  }

  return (
    <>
      <OrbitControls makeDefault />
      <gridHelper name="grid" args={[55, 100, "black", "white"]} />

      <mesh ref={planeRef} position={[0, 0.1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="greenyellow" side={DoubleSide} />
      </mesh>

      <TransformControls object={planeRef} mode={transformMode} onChange={() => handleChange()} />

      <object3D ref={meshesRef}>
        <mesh position={obj.ball1.position}>
          <sphereGeometry args={obj.ball1.args} />
          <meshBasicMaterial color={obj.ball1.color} />
        </mesh>

        <mesh position={obj.ball2.position}>
          <sphereGeometry args={obj.ball2.args} />
          <meshBasicMaterial color={obj.ball2.color} />
        </mesh>

        <mesh position={obj.ball3.position}>
          <sphereGeometry args={obj.ball3.args} />
          <meshBasicMaterial color={obj.ball3.color} />
        </mesh>

        <mesh position={obj.ball4.position}>
          <sphereGeometry args={obj.ball4.args} />
          <meshBasicMaterial color={obj.ball4.color} />
        </mesh>

        <mesh position={obj.ball5.position}>
          <sphereGeometry args={obj.ball5.args} />
          <meshBasicMaterial color={obj.ball5.color} />
        </mesh>
      </object3D>
    </>
  );
};

export default Experience;
