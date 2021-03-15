import {initialize} from './initialize.js';
import {loadModels} from './models.js';
import {initializeInput} from './input.js';
import {createMageHandler} from './mage.js';
import {updateInputHelpers} from './helpers.js';

export function setupGame() {
    const {scene, camera, renderer} = initialize();
    const models = {
        mage: undefined,
        grassTile: undefined,
        waterTile: undefined,
    };
    const actors = {
        mage: undefined,
    };
    const handlers = {
        input: undefined,
        mage: undefined,
    };

    return loadModels()
        .then(({mage, grassTile, waterTile}) => {
            models.mage = mage;
            models.grassTile = grassTile
            models.waterTile = waterTile;
        })
        .then(createActors)
        .then(createHandlers)
        .then(initializeGame)
        .then(() => ({
            models,
            actors,
            handlers,
            scene,
            camera,
            renderer,
        }));

    function createActors() {
        actors.mage = models.mage.clone();
        scene.add(actors.mage);
    }

    function createHandlers() {
        handlers.input = initializeInput();
        handlers.mage = createMageHandler(actors.mage, handlers.input);
    }

    function initializeGame() {
        followMage(camera, actors.mage);
        camera.lookAt(actors.mage.position);

        for (let x = -25; x <= 25; x++) {
            for (let z = -25; z <= 25; z++) {
                const tile = (x + z) % 2 === 0 ? models.grassTile.clone() : models.waterTile.clone();
                tile.position.x += x;
                tile.position.z += z;
                scene.add(tile);
            }
        }
    }
}

export function runGame({
    actors,
    handlers,
    scene,
    camera,
    renderer,
}) {
    let lastFrameTime = new Date().getTime();
    animationFrameRecursive(lastFrameTime);

    function animationFrameRecursive(currentTime) {
        const timeElapsed = currentTime - lastFrameTime;
        lastFrameTime = currentTime;

        requestAnimationFrame(animationFrameRecursive);
        applyGameFrame(timeElapsed);
        renderer.render(scene, camera);
    }

    function applyGameFrame(timeElapsed) {
        const { mageVelocity } = handlers.input.applyFrame();
        updateInputHelpers(mageVelocity);
        handlers.mage.applyFrame(timeElapsed, mageVelocity);
        followMage(camera, actors.mage);
    }
}

function followMage(camera, mage) {
    if (mage) {
        camera.position.x = mage.position.x;
        camera.position.z = mage.position.z + 20;
    }
}
