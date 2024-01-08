import * as THREE from "three";

export function initialize() {
  const scene = createScene();

  const camera = createCamera();
  scene.add(camera);

  const renderer = initializeRenderer();

  initializeWindowResize({ renderer, camera });

  return { scene, camera, renderer };
}

function createScene() {
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xcccccc, 0.4));
  return scene;
}

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000,
  );
  camera.add(new THREE.PointLight(0xffffff, 0.8));
  camera.position.y = 10;
  return camera;
}

function initializeRenderer() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("render-target").appendChild(renderer.domElement);
  return renderer;
}

function initializeWindowResize({ renderer, camera }) {
  document.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false,
  );
}
