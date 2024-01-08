const deadZone = 0.02;

export function initializeInput() {
  const arrowKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  const handlers = {
    fireListeners: [],
    jumpListeners: [],
  };

  document.onkeydown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        arrowKeys.up = true;
        break;
      case "ArrowDown":
        arrowKeys.down = true;
        break;
      case "ArrowLeft":
        arrowKeys.left = true;
        break;
      case "ArrowRight":
        arrowKeys.right = true;
        break;
      case "f":
        handlers.fireListeners.forEach((handler) => handler());
        break;
      case " ":
        handlers.jumpListeners.forEach((handler) => handler());
        break;
    }
  };

  document.onkeyup = (e) => {
    switch (e.code) {
      case "ArrowUp":
        arrowKeys.up = false;
        break;
      case "ArrowDown":
        arrowKeys.down = false;
        break;
      case "ArrowLeft":
        arrowKeys.left = false;
        break;
      case "ArrowRight":
        arrowKeys.right = false;
        break;
    }
  };

  let direction = { x: 0.0, y: 0.0, z: 0.0 };

  return {
    applyFrame() {
      let xInputRatio = 0;
      let zInputRatio = 0;

      const gamepads = navigator.getGamepads();
      if (gamepads && gamepads.length > 0 && gamepads[0]) {
        xInputRatio = gamepads[0].axes[0];
        zInputRatio = gamepads[0].axes[1];
      }

      if (arrowKeys.down === true) {
        zInputRatio = 1;
      } else if (arrowKeys.up === true) {
        zInputRatio = -1;
      }

      if (arrowKeys.right === true) {
        xInputRatio = 1;
      } else if (arrowKeys.left === true) {
        xInputRatio = -1;
      }

      direction = {
        x: Math.abs(xInputRatio) > deadZone ? xInputRatio : 0.0,
        y: 0.0,
        z: Math.abs(zInputRatio) > deadZone ? zInputRatio : 0.0,
      };
    },
    get direction() {
      return direction;
    },
    registerFireListener(fireListener) {
      handlers.fireListeners.push(fireListener);
    },
    registerJumpListener(jumpListener) {
      handlers.jumpListeners.push(jumpListener);
    },
  };
}
