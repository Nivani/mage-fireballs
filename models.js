import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js';

import {GLTFLoader} from 'https://unpkg.com/three@0.123.0/examples/jsm/loaders/GLTFLoader.js';
import {MTLLoader} from 'https://unpkg.com/three@0.123.0/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'https://unpkg.com/three@0.123.0/examples/jsm/loaders/OBJLoader.js';

export function loadModels() {
    const objLoader = createObjloader('models/Materials_Modular_Terrain.mtl');

    return Promise.all([
        loadGltf('models/character_mage.gltf')
            .then(({scene}) => scene),
        objLoader.loadObj('models/Hilly_Terrain_Water_Flat.obj')
            .then(waterTile => {
                waterTile.position.y = -0.7;
                return waterTile;
            }),
        objLoader.loadObj('models/Hilly_Terrain_Grass_Floor.obj')
            .then(grassTile => {
                grassTile.position.y = -0.2;
                return grassTile;
            }),
    ])
        .then(([mage, grassTile, waterTile]) => ({mage, grassTile, waterTile}))
}

export function loadGltf(path) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            path,
            resolve,
            undefined,
            reject,
        );
    });
}

export function createObjloader(materialPath) {
    const manager = new THREE.LoadingManager();
    const materialsPromise = new Promise((resolve, reject) => {
        new MTLLoader(manager).load(materialPath, resolve, undefined, reject);
    });

    return {
        loadObj(path) {
            return materialsPromise.then((materials) => new Promise((resolve, reject) => {
                new OBJLoader(manager)
                    .setMaterials(materials)
                    .load(path,resolve, undefined, reject);
            }));
    },
  };
}
