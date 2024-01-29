import { initialize } from "./initialize.js";
import { loadModels, createFireSpellModel } from "./models.js";
import { initializeInput } from "./input.js";
import { createMageHandler } from "./mage.js";
import { updateInputHelpers } from "./helpers.js";
import { createSpellsHandler } from "./spells.js";

export function setupGame() {
  const { scene, camera, renderer } = initialize();
  const models = {
    mage: undefined,
    grassTile: undefined,
    waterTile: undefined,
    fireSpell: undefined,
  };
  const actors = {
    mage: undefined,
  };
  const handlers = {
    input: undefined,
    mage: undefined,
    spells: undefined,
  };
  const mageFollower = createMageFollower(camera, actors);

  return loadModels()
    .then(({ mage, grassTile, waterTile, fireSpell }) => {
      models.mage = mage;
      models.grassTile = grassTile;
      models.waterTile = waterTile;
      models.fireSpell = createFireSpellModel();
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
      frameListeners: [
        handlers.input,
        handlers.mage,
        handlers.spells,
        updateInputHelpers(handlers.mage),
        mageFollower,
      ],
    }));

  function createActors() {
    actors.mage = models.mage.clone();
    scene.add(actors.mage);
  }

  function createHandlers() {
    handlers.input = initializeInput();
    handlers.spells = createSpellsHandler(scene, models.fireSpell);
    handlers.mage = createMageHandler({
      mageObject: actors.mage,
      inputHandler: handlers.input,
      spellHandler: handlers.spells,
    });
  }

  function initializeGame() {
    mageFollower.followMage();
    camera.lookAt(actors.mage.position);

    for (let x = -25; x <= 25; x++) {
      for (let z = -25; z <= 25; z++) {
        const tile =
          (x + z) % 2 === 0
            ? models.grassTile.clone()
            : models.waterTile.clone();
        tile.position.x += x;
        tile.position.z += z;
        scene.add(tile);
      }
    }
  }
}

export function runGame({ frameListeners, scene, camera, renderer }) {
  let lastFrameTime = new Date().getTime();
  animationFrameRecursive(lastFrameTime);

  function animationFrameRecursive(currentTime) {
    const timeElapsed = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    requestAnimationFrame(animationFrameRecursive);
    frameListeners.forEach((listener) => listener.applyFrame(timeElapsed));
    renderer.render(scene, camera);
  }
}

function createMageFollower(camera, actors) {
  return {
    applyFrame() {
      this.followMage();
    },
    followMage() {
      if (actors.mage) {
        camera.position.x = actors.mage.position.x;
        camera.position.z = actors.mage.position.z + 20;
      }
    },
  };
}
