import {
  Scene,
  AmbientLight,
  PerspectiveCamera,
  PointLight,
  WebGLRenderer,
} from "three";

export function initialize() {
  const scene = createScene();

  const camera = createCamera();
  scene.add(camera);

  const renderer = initializeRenderer();

  initializeWindowResize({ renderer, camera });

  return { scene, camera, renderer };
}

function createScene() {
  const scene = new Scene();
  scene.add(new AmbientLight(0xcccccc, 0.4));
  return scene;
}

function createCamera() {
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    2000,
  );
  camera.add(new PointLight(0xffffff, 700));
  camera.position.y = 10;
  return camera;
}

function initializeRenderer() {
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
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
