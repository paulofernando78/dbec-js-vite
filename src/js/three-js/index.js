import "/src/css/three-js-logo.css";

import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setAnimationLoop(animate);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

const container = document.getElementById("three-js-logo");
container.appendChild(renderer.domElement);

// CSS controls it
renderer.setSize(container.clientWidth, container.clientHeight);

function createTextTexture(text) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")
}

// Material compatible with light
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

// Ambient light and directional
const ambient = new THREE.AmbientLight(0xffffff, 0.1);
const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(2, 2, 3);
directional.castShadow = true;
directional.shadow.mapSize.width = 1024;
directional.shadow.mapSize.height = 1024;
directional.shadow.camera.near = 1;
directional.shadow.camera.far = 10;
directional.shadow.camera.left = -2;
directional.shadow.camera.right = 2;
directional.shadow.camera.top = 2;
directional.shadow.camera.bottom = -2;
directional.shadow.radius = 15;
directional.shadow.blurSamples = 16;

scene.add(ambient, directional);

camera.position.z = 2;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.castShadow = true;

  renderer.render(scene, camera);
}
