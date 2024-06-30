import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useDrop } from 'react-dnd';
import parketTexturePath from './texture/parket.jpg';

function RoomCanvas({ height = 10, width = 10, depth = 2 }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const [droppedProducts, setDroppedProducts] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'product',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const product = item.product;
      // Add the product to the scene
      setDroppedProducts((prevProducts) => [...prevProducts, { product, offset }]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (sceneRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = Math.max(width, height, depth) * 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

    if (containerRef.current) {
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.1 });

    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load(parketTexturePath);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture, roughness: 0.5, metalness: 0.1 });

    const scale = 1;

    const backWallGeometry = new THREE.PlaneGeometry(width * scale, height * scale);
    const sideWallGeometry = new THREE.PlaneGeometry(depth * scale, height * scale);
    const floorGeometry = new THREE.PlaneGeometry(width * scale, depth * scale);

    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 0, -depth * scale / 2);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-width * scale / 2, 0, 0);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(width * scale / 2, 0, 0);
    scene.add(rightWall);

    const topWall = new THREE.Mesh(new THREE.PlaneGeometry(width * scale, depth * scale), wallMaterial);
    topWall.rotation.x = -Math.PI / 2;
    topWall.position.set(0, height * scale / 2, 0);
    scene.add(topWall);

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -height * scale / 2, 0);
    scene.add(floor);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(5, 5, 5).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 5, -5).normalize();
    scene.add(directionalLight2);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
  }, [height, width, depth]);

  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return;

    const scene = sceneRef.current;
    const camera = cameraRef.current;

    droppedProducts.forEach(({ product, offset }) => {
      // Convert screen coordinates to Three.js coordinates
      const vector = new THREE.Vector3(
        (offset.x / window.innerWidth) * 2 - 1,
        -(offset.y / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Create a new Three.js object for the product
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Example material
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(pos);
      scene.add(mesh);
    });
  }, [droppedProducts]);

  return <div ref={(node) => { containerRef.current = node; drop(node); }} />;
}

export default RoomCanvas;

// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import parketTexturePath from './texture/parket.jpg'; // נתיב התמונה

// function RoomCanvas({ height = 10, width = 10, depth = 2 }) { // עומק ברירת מחדל קטן יותר
//   const containerRef = useRef(null);
//   const sceneRef = useRef(null);

//   useEffect(() => {
//     if (sceneRef.current) return; // Prevent reinitialization

//     // Create a scene
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xffffff); // אפור בהיר יותר

//     // Create a camera
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = Math.max(width, height, depth) * 1; // Adjust the camera position based on room dimensions

//     // Create a renderer
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

//     // Clear previous children from the container
//     if (containerRef.current) {
//       while (containerRef.current.firstChild) {
//         containerRef.current.removeChild(containerRef.current.firstChild);
//       }
//       containerRef.current.appendChild(renderer.domElement);
//     }

//     // Initialize OrbitControls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.update();

//     // Create a material for the walls (Standard material for better lighting)
//     const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.1 });

//     // Load wood texture for the floor
//     const textureLoader = new THREE.TextureLoader();
//     const floorTexture = textureLoader.load(parketTexturePath);
//     floorTexture.wrapS = THREE.RepeatWrapping;
//     floorTexture.wrapT = THREE.RepeatWrapping;
//     floorTexture.repeat.set(4, 4); // Adjust the repeat values as needed
//     const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture, roughness: 0.5, metalness: 0.1 });

//     // Scaling factor
//     const scale = 1; // השתמש בערך קבוע לקנה המידה

//     // Create the walls
//     const backWallGeometry = new THREE.PlaneGeometry(width * scale, height * scale);
//     const sideWallGeometry = new THREE.PlaneGeometry(depth * scale, height * scale);
//     const floorGeometry = new THREE.PlaneGeometry(width * scale, depth * scale);

//     const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
//     backWall.position.set(0, 0, -depth * scale / 2);
//     scene.add(backWall);

//     const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
//     leftWall.rotation.y = Math.PI / 2;
//     leftWall.position.set(-width * scale / 2, 0, 0);
//     scene.add(leftWall);

//     const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
//     rightWall.rotation.y = -Math.PI / 2;
//     rightWall.position.set(width * scale / 2, 0, 0);
//     scene.add(rightWall);

//     const topWall = new THREE.Mesh(new THREE.PlaneGeometry(width * scale, depth * scale), wallMaterial);
//     topWall.rotation.x = -Math.PI / 2;
//     topWall.position.set(0, height * scale / 2, 0);
//     scene.add(topWall);

//     // Create the floor
//     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     floor.rotation.x = -Math.PI / 2; // Ensure the texture faces upwards
//     floor.position.set(0, -height * scale / 2, 0);
//     scene.add(floor);

//     // Add ambient light
//     const ambientLight = new THREE.AmbientLight(0x404040, 2); // Stronger ambient light
//     scene.add(ambientLight);

//     // Add directional light
//     const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight1.position.set(5, 5, 5).normalize();
//     scene.add(directionalLight1);

//     const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
//     directionalLight2.position.set(-5, 5, -5).normalize();
//     scene.add(directionalLight2);

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update(); // Update controls in the animation loop
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };

//     // Store scene in ref to prevent reinitialization
//     sceneRef.current = scene;
//   }, [height, width, depth]);

//   return (
//     <div ref={containerRef} />
//   );
// }

// export default RoomCanvas;
