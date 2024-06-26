import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function RoomCanvas({ height, width, depth }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) return; // Prevent reinitialization

    // Create a scene
    const scene = new THREE.Scene();
    // Change background color to magenta
    scene.background = new THREE.Color(0xff00ff);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = Math.max(width, height, depth) * 1.5; // Adjust the camera position based on room dimensions

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

    // Clear previous children from the container
    if (containerRef.current) {
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(renderer.domElement);
    }

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Create a material for the walls (mauve) and floor (beige)
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xE0B0FF });
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5dc });

    // Scaling factor
    const scale = Math.min(window.innerWidth * 0.6 / width, window.innerHeight * 0.6 / height);

    // Create the walls
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

    // Adjusting the top wall to fit properly
    const topWall = new THREE.Mesh(new THREE.PlaneGeometry(width * scale, depth * scale), wallMaterial);
    topWall.rotation.x = -Math.PI / 2;
    topWall.position.set(0, height * scale / 2, 0);
    scene.add(topWall);

    // Create the floor
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.set(0, -height * scale / 2, 0);
    scene.add(floor);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls in the animation loop
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };

    // Store scene in ref to prevent reinitialization
    sceneRef.current = scene;
  }, [height, width, depth]);

  return (
    <div ref={containerRef} />
  );
}

export default RoomCanvas;

// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// function RoomCanvas({ height, width, depth }) {
//   const containerRef = useRef(null);
//   const sceneRef = useRef(null);

//   useEffect(() => {
//     if (sceneRef.current) return; // Prevent reinitialization

//     // Create a scene
//     const scene = new THREE.Scene();
//     // Change background color to magenta
//     scene.background = new THREE.Color(0xff00ff);

//     // Create a camera
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = Math.max(width, height, depth) * 1.5; // Adjust the camera position based on room dimensions

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

//     // Create a material for the walls (mauve) and floor (beige)
//     const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xE0B0FF });
//     const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5dc });

//     // Scaling factor
//     const scale = Math.min(window.innerWidth * 0.6 / width, window.innerHeight * 0.6 / height);

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

//     const topWall = new THREE.Mesh(backWallGeometry, wallMaterial);
//     topWall.rotation.x = -Math.PI / 2;
//     topWall.position.set(0, height * scale / 2, 0);
//     scene.add(topWall);

//     // Create the floor
//     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     floor.rotation.x = Math.PI / 2;
//     floor.position.set(0, -height * scale / 2, 0);
//     scene.add(floor);

//     // Add ambient light
//     const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
//     scene.add(ambientLight);

//     // Add directional light
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 5, 5).normalize();
//     scene.add(directionalLight);

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

// // import React, { useRef, useEffect } from 'react';
// // import * as THREE from 'three';
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // function RoomCanvas({ height, width, depth }) {
// //   const containerRef = useRef(null);
// //   const sceneRef = useRef(null);

// //   useEffect(() => {
// //     if (sceneRef.current) return; // Prevent reinitialization

// //     // Create a scene
// //     const scene = new THREE.Scene();
// //     // Change background color to magenta
// //     scene.background = new THREE.Color(0xff00ff);

// //     // Create a camera
// //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// //     camera.position.z = 15; // Set the camera position

// //     // Create a renderer
// //     const renderer = new THREE.WebGLRenderer();
// //     renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

// //     // Clear previous children from the container
// //     if (containerRef.current) {
// //       while (containerRef.current.firstChild) {
// //         containerRef.current.removeChild(containerRef.current.firstChild);
// //       }
// //       containerRef.current.appendChild(renderer.domElement);
// //     }

// //     // Initialize OrbitControls
// //     const controls = new OrbitControls(camera, renderer.domElement);
// //     controls.update();

// //     // Create a material for the walls (mauve) and floor (beige)
// //     const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xE0B0FF });
// //     const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5dc });

// //     // Create the walls
// //     const visualWidth = (window.innerWidth * 0.6) / 30;
// //     const proportion = visualWidth / width;
// //     const backWallGeometry = new THREE.PlaneGeometry(visualWidth, height * proportion);
// //     const sideWallGeometry = new THREE.PlaneGeometry(depth * proportion, height * proportion);
// //     const XrightBottomBackCorner = new THREE.Vector3(-visualWidth / 2, -height / 2, -depth / 2);	
// //     const XleftBottomBackCorner = new THREE.Vector3(visualWidth / 2, -height / 2, -depth / 2);
// //     const XrightBottomFrontCorner = new THREE.Vector3(-visualWidth / 2, -height / 2, depth / 2);
// //     const XleftBottomFrontCorner = new THREE.Vector3(visualWidth / 2, -height / 2, depth / 2);

// //     const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
// //     backWall.position.set(0, 0, -5);
// //     scene.add(backWall);

// //     const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
// //     leftWall.rotation.y = Math.PI / 2;
// //     leftWall.position.set(-visualWidth / 2, 0, 0);
// //     scene.add(leftWall);

// //     const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
// //     rightWall.rotation.y = -Math.PI / 2;
// //     rightWall.position.set(visualWidth / 2, 0, 0);
// //     scene.add(rightWall);

// //     const topWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
// //     topWall.rotation.x = -Math.PI / 2;
// //     topWall.position.set(0, 5, 0);
// //     scene.add(topWall);

// //     // Create the floor
// //     const floor = new THREE.Mesh(sideWallGeometry, floorMaterial);
// //     floor.rotation.x = Math.PI / 2;
// //     floor.position.set(0, -5, 0);
// //     scene.add(floor);

// //     // Add ambient light
// //     const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
// //     scene.add(ambientLight);

// //     // Add directional light
// //     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// //     directionalLight.position.set(5, 5, 5).normalize();
// //     scene.add(directionalLight);

// //     // Animation loop
// //     const animate = () => {
// //       requestAnimationFrame(animate);
// //       controls.update(); // Update controls in the animation loop
// //       renderer.render(scene, camera);
// //     };
// //     animate();

// //     // Handle window resize
// //     const handleResize = () => {
// //       camera.aspect = window.innerWidth / window.innerHeight;
// //       camera.updateProjectionMatrix();
// //       renderer.setSize(window.innerWidth, window.innerHeight);
// //     };

// //     window.addEventListener('resize', handleResize);

// //     // Cleanup on component unmount
// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //       renderer.dispose();
// //     };

// //     // Store scene in ref to prevent reinitialization
// //     sceneRef.current = scene;
// //   }, [height, width, depth]);

// //   return (
// //     <div ref={containerRef} />
// //   );
// // }

// // export default RoomCanvas;
