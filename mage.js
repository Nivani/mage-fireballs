import { applyVelocity, lookInVectorDirection } from "./physics.js";
import { multiplyVector, zeroVector, isZeroVector } from "./vectors.js";

const walkingSpeed = 15.0;

export function createMageHandler({ mageObject, inputHandler, spellHandler }) {
  inputHandler.registerFireListener(fire);
  inputHandler.registerJumpListener(jump);

  let velocity = zeroVector();
  let lookingAt = zeroVector();

  return {
    applyFrame(timeElapsed) {
      if (!isZeroVector(inputHandler.direction)) {
        lookingAt = inputHandler.direction;
      }
      velocity = multiplyVector(inputHandler.direction, walkingSpeed);
      applyVelocity(mageObject, velocity, timeElapsed);
      lookInVectorDirection(mageObject, velocity);
    },
    get velocity() {
      return velocity;
    },
  };

  function fire() {
    spellHandler.addFireSpell(
      {
        x: mageObject.position.x,
        y: mageObject.position.y,
        z: mageObject.position.z - 1.0,
      },
      lookingAt,
    );
  }

  function jump() {
    console.log("jump!");
  }
}
