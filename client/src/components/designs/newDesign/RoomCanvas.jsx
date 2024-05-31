import React, {useRef, useEffect} from 'react'
import * as THREE from 'three';

function RoomCanvas({height, width, depth}) {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    
  useEffect(() => {
    if (sceneRef.current) return; // Prevent reinitialization

    // Create a scene
    const scene = new THREE.Scene();
    // Set the scene background color
    scene.background = new THREE.Color(0xf0f0f0);
    //the scene size should be the same as the 80% of the window size

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15; // Set the camera position

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);

    // Clear previous children from the container
    if (containerRef.current) {
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(renderer.domElement);
    }

    // Create a material for the walls (beige) and floor (gray)
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5dc });
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

    // Create the walls
    // make the visual width 60% of the window width and in the way that planegeometry will make it 60%
    const visualWidth = (window.innerWidth*0.6)/30;
    console.log(visualWidth);
    
    const proportion = visualWidth/width;
    const backWallGeometry = new THREE.PlaneGeometry(visualWidth, height*proportion);
    const sideWallGeometry = new THREE.PlaneGeometry(depth*proportion, height*proportion);

    // const visualWidth = (window.innerWidth*0.6)/30;
    // console.log(visualWidth);
    
    // const proportion = visualWidth/width;
    // const scale = 
    // const backWallGeometry = new THREE.PlaneGeometry(visualWidth, height*proportion);
    // const sideWallGeometry = new THREE.PlaneGeometry(depth*proportion, height*proportion);

    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 0, -5);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    //leftwall should be right next to the end of the backwall
    leftWall.position.set(-visualWidth/2, 0, 0);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(visualWidth/2, 0, 0);
    scene.add(rightWall);

    const topWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    topWall.rotation.x = -Math.PI / 2;
    topWall.position.set(0, 5, 0);
    scene.add(topWall);

    // Create the floor
    const floor = new THREE.Mesh(sideWallGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.set(0, -5, 0);
    scene.add(floor);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
  )
}

export default RoomCanvas