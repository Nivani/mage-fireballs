import { multiplyVector } from "./vectors.js";
import { applyVelocity } from "./physics.js";

export function createSpellsHandler(scene, fireSpellModel) {
  let spells = [];

  return {
    applyFrame(timeElapsed) {
      spells.forEach((spell) => spell.applyFrame(timeElapsed));
    },
    addFireSpell(startPosition, direction) {
      const object = fireSpellModel.clone();
      const spell = createSpell({
        object,
        startPosition,
        direction,
      });
      scene.add(object);
      spells.push(spell);
    },
  };
}

const fireSpellSpeed = 30.0;

export function createSpell({ object, startPosition, direction }) {
  const velocity = multiplyVector(direction, fireSpellSpeed);
  object.position.x = startPosition.x;
  object.position.y = startPosition.y;
  object.position.z = startPosition.z;

  return {
    applyFrame(timeElapsed) {
      applyVelocity(object, velocity, timeElapsed);
    },
  };
}
