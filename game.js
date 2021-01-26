import {initialize} from './initialize.js';
import {loadModels} from './models.js';
import {initializeInput} from './input.js';
import {applyVelocity} from './physics.js';

export function createGame() {
    const {scene, camera, renderer} = initialize();
    const models = {
        mage: undefined,
        grassTile: undefined,
        waterTile: undefined,
    };
    const actors = {
        mage: undefined,
    };

    loadModels()
        .then(({mage, grassTile, waterTile}) => {
            models.mage = mage;
            models.grassTile = grassTile
            models.waterTile = waterTile;
        })
        .then(startGame)
        .catch(console.error);

    const inputHandler = initializeInput();

    return {
        run() {
            this.run = () => {
            };
            let lastFrameTime = new Date().getTime();
            frame(lastFrameTime);

            function frame(currentTime) {
                const timeElapsed = currentTime - lastFrameTime;
                lastFrameTime = currentTime;

                requestAnimationFrame(frame);
                applyGameFrame(timeElapsed);
                renderer.render(scene, camera);
            }
        },
    };

    function startGame() {
        actors.mage = createMage();
        scene.add(actors.mage);
        followMage(camera, actors.mage);
        camera.lookAt(actors.mage.position);

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

    function applyGameFrame(timeElapsed) {
        const { mageVelocity } = inputHandler.handleInput(actors);
        applyVelocity(actors.mage, mageVelocity, timeElapsed)
        followMage(camera, actors.mage);
    }

    function followMage(camera, mage) {
        if (mage) {
            camera.position.x = mage.position.x;
            camera.position.z = mage.position.z + 20;
        }
    }
}