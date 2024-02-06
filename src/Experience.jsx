import { useRef, useState, useEffect } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { DoubleSide, Euler, Matrix4, Quaternion, Vector3 } from "three";

const obj = {
  ball1: {
    position: [4, 4, 0],
    scale: [1, 1, 1],
    color: "red",
    args: [0.2],
  },
  ball2: {
    position: [-4, 3, 0],
    scale: [1, 1, 1],
    color: "green",
    args: [0.2],
  },
  ball3: {
    position: [3, -1, 0],
    scale: [1, 1, 1],
    color: "gray",
    args: [0.2],
  },
  ball4: {
    position: [-2, 0, 0],
    scale: [1, 1, 1],
    color: "blue",
    args: [0.2],
  },
  ball5: {
    position: [-1, -3, 0],
    scale: [1, 1, 1],
    color: "orange",
    args: [0.2],
  },
};

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
  // const meshesRef = useRef();
  const ball1 = useRef();
  const ball2 = useRef();
  const ball3 = useRef();
  const ball4 = useRef();
  const ball5 = useRef();

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

  // const handleChange = () => {
  //   const position = new Vector3();
  //   const scale = new Vector3();
  //   const rotation = new Quaternion();




  //   /*
  //     Extracting plane Matrix to manipulate points 
  //     transformation with respect to plane's origin
  //    */
  //   // decompose:- This method basically extacts position, rotation, scale from Transformation Matrix
  //   planeRef.current.matrix.decompose(position, rotation, scale);

  //   meshesRef.current.position.set(position.x, position.y, position.z);
  //   meshesRef.current.quaternion.set(
  //     rotation.x,
  //     rotation.y,
  //     rotation.z,
  //     rotation.w
  //   );
  //   meshesRef.current.scale.set(scale.x, scale.y, scale.z);
  // };

  const handleChange = () => {
    const oPos = new Vector3(0, 0, 0);
    const oRot = new Vector3(0, 0, 0);
    const oScale = new Vector3(1, 1, 1);

    /* Make sphere matrix an Identity Matrix by setting to origin */
    ball1.current.position.copy(oPos);
    ball1.current.rotation.copy(oRot);
    ball1.current.scale.copy(oScale);
    // Update the matrix
    ball1.current.updateMatrix();
    // Apply the computed Matrix to identity matrix of sphere
    ball1.current.applyMatrix4(computeTransformation(obj.ball1.position));

    ball2.current.position.copy(oPos);
    ball2.current.rotation.copy(oRot);
    ball2.current.scale.copy(oScale);
    ball2.current.updateMatrix();
    ball2.current.applyMatrix4(computeTransformation(obj.ball2.position));

    ball3.current.position.copy(oPos);
    ball3.current.rotation.copy(oRot);
    ball3.current.scale.copy(oScale);
    ball3.current.updateMatrix();
    ball3.current.applyMatrix4(computeTransformation(obj.ball3.position));

    ball4.current.position.copy(oPos);
    ball4.current.rotation.copy(oRot);
    ball4.current.scale.copy(oScale);
    ball4.current.updateMatrix();
    ball4.current.applyMatrix4(computeTransformation(obj.ball4.position));

    ball5.current.position.copy(oPos);
    ball5.current.rotation.copy(oRot);
    ball5.current.scale.copy(oScale);
    ball5.current.updateMatrix();
    ball5.current.applyMatrix4(computeTransformation(obj.ball5.position));
  }

  const computeTransformation = (ballPos) => {
    const pPos = new Vector3();
    const pRot = new Quaternion();
    const pScale = new Vector3();

    // Extract Position, Rotation, Scale from current Plane Matrix
    planeRef.current.matrix.decompose(pPos, pRot, pScale);

    const mat1 = new Matrix4();
    const mat1_1 = new Matrix4();

    mat1.identity();
    mat1_1.identity();

    mat1_1.makeRotationFromQuaternion(pRot);
    mat1.multiply(mat1_1); // Rotate
    mat1_1.identity();

    // Set the sphere position with respect to planes origin.
    mat1.setPosition(pPos); // Planes orign
    mat1_1.setPosition(new Vector3(ballPos[0], ballPos[1], ballPos[2])); // actual sphere position
    mat1.multiply(mat1_1); // transform
    mat1_1.identity();

    mat1_1.scale(pScale);
    mat1.multiply(mat1_1); // scale

    return mat1;
  }

  return (
    <>
      <OrbitControls makeDefault />
      <gridHelper name="grid" args={[55, 100, "black", "white"]} />

      <mesh ref={planeRef} position={[0, 0.1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="greenyellow" side={DoubleSide} />
      </mesh>

      <TransformControls
        object={planeRef}
        mode={transformMode}
        onChange={() => handleChange()}
      />

      <mesh ref={ball1} position={obj.ball1.position}>
        <sphereGeometry args={obj.ball1.args} />
        <meshBasicMaterial color={obj.ball1.color} />
      </mesh>

      <mesh ref={ball2} position={obj.ball2.position}>
          <sphereGeometry args={obj.ball2.args} />
          <meshBasicMaterial color={obj.ball2.color} />
        </mesh>

        <mesh ref={ball3} position={obj.ball3.position}>
          <sphereGeometry args={obj.ball3.args} />
          <meshBasicMaterial color={obj.ball3.color} />
        </mesh>

        <mesh ref={ball4} position={obj.ball4.position}>
          <sphereGeometry args={obj.ball4.args} />
          <meshBasicMaterial color={obj.ball4.color} />
        </mesh>

        <mesh ref={ball5} position={obj.ball5.position}>
          <sphereGeometry args={obj.ball5.args} />
          <meshBasicMaterial color={obj.ball5.color} />
        </mesh>

      {/* <object3D ref={meshesRef}>
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
      </object3D> */}
    </>
  );
};

export default Experience;
