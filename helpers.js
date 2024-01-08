export function updateInputHelpers(mageHandler) {
  return {
    applyFrame() {
      const mageVelocity = mageHandler.velocity;
      document.getElementById("input-x-placeholder").innerText =
        `${mageVelocity.x}`;
      document.getElementById("input-z-placeholder").innerText =
        `${mageVelocity.z}`;
    },
  };
}
