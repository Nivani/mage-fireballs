import { PointLight } from "three";
import { multiplyVector } from "./vectors.js";
import { applyVelocity } from "./physics.js";

export function createSpellsHandler(scene, fireSpellModel) {
  let spells = [];
  const lightProvider = createLightProvider(scene);

  return {
    applyFrame(timeElapsed) {
      spells.forEach((spell) => spell.applyFrame(timeElapsed));
    },
    addFireSpell(startPosition, direction) {
      const object = fireSpellModel.clone();
      scene.add(object);
      const light = lightProvider.provide();
      const spell = createSpell({
        object,
        light,
        startPosition,
        direction,
      });
      spells.push(spell);
      setTimeout(() => {
        scene.remove(object);
        const index = spells.indexOf(spell);
        spells.splice(index, 1);
      }, 3000);
    },
  };
}

const fireSpellSpeed = 30.0;

export function createSpell({ object, light, startPosition, direction }) {
  const velocity = multiplyVector(direction, fireSpellSpeed);
  object.position.copy(startPosition);
  light.position.copy(startPosition);

  return {
    applyFrame(timeElapsed) {
      applyVelocity(object, velocity, timeElapsed);
      light.position.copy(object.position);
    },
  };
}

function createLightProvider(scene) {
  const lights = [];
  let lightIndex = 0;
  for (let i=0; i < 20; i++) {
    const light = new PointLight(0xff0000, 75, 100);
    light.position.set(0, 0, 100000);
    scene.add(light);
    lights.push(light);
  }

  return {
    provide() {
      const light = lights[lightIndex];
      lightIndex = (lightIndex + 1) % lights.length;
      return light;
    }
  };
}
