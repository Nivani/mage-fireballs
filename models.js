import {
  LoadingManager,
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
} from "three";

import { GLTFLoader } from "three/loaders/GLTFLoader.js";
import { MTLLoader } from "three/loaders/MTLLoader.js";
import { OBJLoader } from "three/loaders/OBJLoader.js";

export function loadModels() {
  const objLoader = createObjloader("models/Materials_Modular_Terrain.mtl");

  return Promise.all([
    loadGltf("models/character_mage.gltf").then(({ scene }) => scene),
    objLoader
      .loadObj("models/Hilly_Terrain_Water_Flat.obj")
      .then((waterTile) => {
        waterTile.position.y = -0.7;
        return waterTile;
      }),
    objLoader
      .loadObj("models/Hilly_Terrain_Grass_Floor.obj")
      .then((grassTile) => {
        grassTile.position.y = -0.2;
        return grassTile;
      }),
  ]).then(([mage, grassTile, waterTile]) => ({ mage, grassTile, waterTile }));
}

export function loadGltf(path) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(path, resolve, undefined, reject);
  });
}

export function createObjloader(materialPath) {
  const manager = new LoadingManager();
  const materialsPromise = new Promise((resolve, reject) => {
    new MTLLoader(manager).load(materialPath, resolve, undefined, reject);
  });

  return {
    loadObj(path) {
      return materialsPromise.then(
        (materials) =>
          new Promise((resolve, reject) => {
            new OBJLoader(manager)
              .setMaterials(materials)
              .load(path, resolve, undefined, reject);
          }),
      );
    },
  };
}

export function createFireSpellModel() {
  const geometry = new SphereGeometry(0.3, 32, 16);
  const material = new MeshPhongMaterial({ color: 0xc00000 });
  return new Mesh(geometry, material);
}
