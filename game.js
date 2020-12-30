import {initialize} from "./initialize.js";
import {loadModels} from './models.js';

export function createGame() {
    const {scene, camera, renderer} = initialize();
    const models = {
        mage: undefined,
        grassTile: undefined,
        waterTile: undefined,
    };

    loadModels()
        .then(({mage, grassTile, waterTile}) => {
            models.mage = mage;
            models.grassTile = grassTile
            models.waterTile = waterTile;
        })
        .then(startGame)
        .catch(console.error);

    return {
        run() {
            this.run = () => {
            };
            frame();

            function frame() {
                requestAnimationFrame(frame);
                render();
            }
        },
    };


    function render() {
        renderer.render(scene, camera);
    }

    function startGame() {
        scene.add(createMage());
        for (let x = -25; x <= 25; x++) {
            for (let z = -25; z <= 25; z++) {
                const tile = (x + z) % 2 === 0 ? createGrassTile() : createWaterTile();
                tile.position.x += x;
                tile.position.z += z;
                scene.add(tile);
            }
        }
    }

    function createMage() {
        return models.mage.clone();
    }

    function createGrassTile() {
        return models.waterTile.clone();
    }

    function createWaterTile() {
        return models.grassTile.clone();
    }
}