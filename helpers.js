export function updateHelpers(mageHandler) {
  const fpsElement = document.getElementById("fps-placeholder");
  const inputXElement = document.getElementById("input-x-placeholder");
  const inputZElement = document.getElementById("input-z-placeholder");
  return {
    applyFrame(timeElapsed) {
      const mageVelocity = mageHandler.velocity;
      fpsElement.innerText = `${Math.round(1000.0 / timeElapsed)}`;
      inputXElement.innerText = `${mageVelocity.x}`;
      inputZElement.innerText = `${mageVelocity.z}`;
    },
  };
}
