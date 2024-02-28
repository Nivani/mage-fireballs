import { PlaneBufferGeometry } from "three";
import { initialize } from "./initialize.js";
import { loadModels, createFireSpellModel } from "./models.js";
import { initializeInput } from "./input.js";
import { createMageHandler } from "./mage.js";
import { updateHelpers } from "./helpers.js";
import { createSpellsHandler } from "./spells.js";
import { Fire } from "./Fire.js";

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
        updateHelpers(handlers.mage),
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

    const plane = new PlaneBufferGeometry(4, 4);
    const fire = new Fire( plane, {
      textureWidth: 512,
      textureHeight: 512,
      debug: false
    });
    fire.position.x = 2;
    fire.position.y = 2;
    scene.add(fire);

    fire.clearSources();
    fire.addSource( 0.5, 0.1, 0.1, 1.0, 0.0, 1.0 );

    fire.color1.set(0xffffff);
    fire.color2.set(0xffa000);
    fire.color3.set(0x000000);
    fire.windVector.x = 0.0;
    fire.windVector.y = 0.75;
    fire.colorBias = 0.8;
    fire.burnRate = 0.3;
    fire.diffuse = 1.33;
    fire.viscosity = 0.25;
    fire.expansion = - 0.25;
    fire.swirl = 50.0;
    fire.drag = 0.35;
    fire.airSpeed = 12.0;
    fire.speed = 500.0;
    fire.massConservation = false;
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
