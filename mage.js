import { applyVelocity, lookInVectorDirection } from "./physics.js";
import { multiplyVector, zeroVector } from "./vectors.js";

export function createMageHandler(mageObject, inputHandler) {
  inputHandler.registerFireListener(fire);
  inputHandler.registerJumpListener(jump);

  let velocity = zeroVector();

  return {
    applyFrame(timeElapsed) {
      velocity = multiplyVector(inputHandler.direction, 15.0);
      applyVelocity(mageObject, velocity, timeElapsed);
      lookInVectorDirection(mageObject, velocity);
    },
    get velocity() {
      return velocity;
    },
  };

  function fire() {
    console.log("fire!");
  }

  function jump() {
    console.log("jump!");
  }
}
