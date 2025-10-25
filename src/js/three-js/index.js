import "@css/three-js-logo.css";

import * as THREE from "three";
import {
  FontLoader,
  GLTFLoader,
  OrbitControls,
  TextGeometry,
} from "three/examples/jsm/Addons.js";
import { setupResizeObserver } from "../utils/setupRisizeObserver";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

const container = document.getElementById("three-js-logo");
container.appendChild(renderer.domElement);

//! SIZE (CSS controls it)
renderer.setSize(container.clientWidth, container.clientHeight);
setupResizeObserver(renderer, camera, container);

//! LIGHT: Ambient and directional
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(2, 2, 3);
directional.castShadow = true;

directional.shadow.mapSize.set(2048, 2048);
(directional.shadow.camera.near = 0.5),
  (directional.shadow.camera.far = 10),
  (directional.shadow.camera.left = -3),
  (directional.shadow.camera.right = 3),
  (directional.shadow.camera.top = 3),
  (directional.shadow.camera.bottom = -3);

// ! LIGHT: Point
const point = new THREE.PointLight(0xffddaa, 1.2, 10);
point.position.x = -1;
point.position.y = 0.5;
point.position.z = -2;

scene.add(ambient, directional, point);

const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // turns the plane horizontal (like a ground)
plane.position.y = 0;
plane.receiveShadow = true;
scene.add(plane);

//! GROUP
const group = new THREE.Group();
group.position.y = 0.1;
scene.add(group);

// Text
const loader = new FontLoader();
loader.load("/assets/fonts/Anton_Regular.json", (font) => {
  //! DAILY BASIS
  const geometry1 = new TextGeometry("DAILY BASIS", {
    font: font,
    size: 0.1,
    depth: 0.01,
  });

  geometry1.center();

  const material1 = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.3, // 0 = fosco, 1 = metálico
    roughness: 0.4,
  });
  const mesh1 = new THREE.Mesh(geometry1, material1);
  // mesh1.position.y = 0.6;
  mesh1.castShadow = true;
  mesh1.receiveShadow = true;
  scene.add(mesh1);

  //! ENGLISH COURSE
  const geometry2 = new TextGeometry("ENGLISH COURSE", {
    font: font,
    size: 0.1,
    depth: 0.01,
  });

  geometry2.center();

  const material2 = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.3, // 0 = fosco, 1 = metálico
    roughness: 0.4,
  });
  const mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.castShadow = true;
  mesh2.receiveShadow = true;
  scene.add(mesh2);

  mesh1.position.y = 0.15;

  group.add(mesh1);
  group.add(mesh2);
});

//! Flag USA
const flagUSA = new GLTFLoader();
flagUSA.load("/assets/models/flag-usa.glb", (gltf) => {
  const flagUSAmodel = gltf.scene;

  flagUSAmodel.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  flagUSAmodel.position.set(0.37, 0, 0.1);
  flagUSAmodel.scale.set(0.05, 0.05, 0.05);
  scene.add(flagUSAmodel);
});

//! Flag UK
const flagUK = new GLTFLoader();
flagUK.load("/assets/models/flag-uk.glb", (gltf) => {
  const flagUKmodel = gltf.scene;

  flagUKmodel.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  flagUKmodel.position.set(0.39, 0, 0.2);
  flagUKmodel.scale.set(0.05, 0.05, 0.05);
  scene.add(flagUKmodel);
});

//! CAMERA POSITION
const angle = Math.PI / 7.1;
const distance = 0.4;

camera.position.set(
  -Math.sin(angle) * distance,
  0.2,
  Math.cos(angle) * distance
);

function updateCameraZoom() {
  if (window.innerWidth < 600) {
    camera.position.z = 0.6;
  } else {
    camera.position.z = 0.4;
  }
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", updateCameraZoom);
updateCameraZoom(); //run once initially

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.14, 0);

function animate() {
  requestAnimationFrame(animate);
  // group.rotation.x += 0.001
  group.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
  controls.update();
  renderer.render(scene, camera);
}
animate();
