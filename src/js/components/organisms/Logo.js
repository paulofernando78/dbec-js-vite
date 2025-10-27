import * as THREE from "three";
import {
  FontLoader,
  GLTFLoader,
  OrbitControls,
  TextGeometry,
} from "three/examples/jsm/Addons.js";
import { setupResizeObserver } from "@utils/setupRisizeObserver";
import "/src/css/logo.css";

class Logo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // cria o container (Light DOM)
    const container = document.createElement("div");
    container.className = "logo";
    this.appendChild(container);

    //! SCENE
    const scene = new THREE.Scene();

    //! CAMERA
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    //! RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    container.appendChild(renderer.domElement);

    //! SIZE
    renderer.setSize(container.clientWidth, container.clientHeight);
    setupResizeObserver(renderer, camera, container);

    //! LIGHTS
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(2, 2, 3);
    directional.castShadow = true;
    directional.shadow.mapSize.set(2048, 2048);
    directional.shadow.camera.near = 0.5;
    directional.shadow.camera.far = 10;
    directional.shadow.camera.left = -3;
    directional.shadow.camera.right = 3;
    directional.shadow.camera.top = 3;
    directional.shadow.camera.bottom = -3;

    const point1 = new THREE.PointLight();
    point1.color.set(0x66ccff);
    point1.intensity = 1.2;
    point1.distance = 8;
    point1.decay = 2;
    point1.position.set(1, 0.4, 1);

    const point2 = new THREE.PointLight();
    point2.color.set(0xff0000);
    point2.intensity = 1.2;
    point2.distance = 8;
    point2.decay = 2;
    point2.position.set(1, -0.1, 1);

    const pointHelper = new THREE.PointLightHelper(point1, 0.1, 0xffddaa);
    scene.add(pointHelper);

    scene.add(ambient, directional, point1, point2);

    //! PLANE
    const planeGeometry = new THREE.PlaneGeometry(5, 5);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    //! GROUP
    const group = new THREE.Group();
    group.position.y = 0.1;
    scene.add(group);

    //! TEXT
    const loader = new FontLoader();
    loader.load("/assets/fonts/Anton_Regular.json", (font) => {
      const material = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.3,
        roughness: 0.4,
      });

      const createText = (text) => {
        const geometry = new TextGeometry(text, {
          font: font,
          size: 0.1,
          depth: 0.01,
        });
        geometry.center();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
      };

      const mesh1 = createText("DAILY BASIS");
      const mesh2 = createText("ENGLISH COURSE");
      mesh1.position.y = 0.15;

      group.add(mesh1, mesh2);
    });

    //! FLAG USA
    const flagUSA = new GLTFLoader();
    flagUSA.load("/assets/models/flag-usa.glb", (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      model.position.set(0.37, 0, 0.1);
      model.scale.set(0.05, 0.05, 0.05);
      scene.add(model);
    });

    //! FLAG UK
    const flagUK = new GLTFLoader();
    flagUK.load("/assets/models/flag-uk.glb", (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      model.position.set(0.39, 0, 0.2);
      model.scale.set(0.05, 0.05, 0.05);
      scene.add(model);
    });

    //! CAMERA POSITION
    const angle = Math.PI / 15;
    const distance = 0.4;
    camera.position.set(
      -Math.sin(angle) * distance,
      0.2,
      Math.cos(angle) * distance
    );

    //! RESPONSIVE
    function updateCameraZoom() {
      camera.position.z = window.innerWidth < 600 ? 0.6 : 0.4;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", updateCameraZoom);
    updateCameraZoom();

    //! CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0.02, 0.14, 0);

    //! ANIMATE
    function animate() {
      requestAnimationFrame(animate);
      // renderer.setSize(container.clientWidth, container.clientHeight)
      // group.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
      point1.position.x = Math.sin(Date.now() * 0.001) * 0.8;
      point2.position.x = Math.sin(Date.now() * -0.001) * 0.8;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }
}

export default Logo;
