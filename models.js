import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js';

import {GLTFLoader} from 'https://unpkg.com/three@0.123.0/examples/jsm/loaders/GLTFLoader.js';
import {MTLLoader} from 'https://unpkg.com/three@0.123.0/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'https://unpkg.com/three@0.123.0/examples/jsm/loaders/OBJLoader.js';

export function loadModels() {
    return Promise.all([
        loadGltf('KayKit Dungeon Pack 1.0/Models/Characters/gltf/character_mage.gltf')
            .then(({scene}) => scene),
        loadObj('Modular Terrain Hilly/Water_Flat.obj')
            .then(waterTile => {
                waterTile.position.y = -0.35;
                return waterTile;
            }),
        loadObj('Modular Terrain Hilly/Grass_Flat.obj')
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

export function loadObj(path) {
    return new Promise((resolve, reject) => {
        const manager = new THREE.LoadingManager();

        const materialPath = path.substr(0, path.length - 4) + '.mtl';
        new MTLLoader(manager)
            .load(
                materialPath,
                (materials) => {
                    new OBJLoader(manager)
                        .setMaterials(materials)
                        .load(
                            path,
                            resolve,
                            undefined,
                            reject,
                        );
                },
                undefined,
                reject,
            );
    });
}