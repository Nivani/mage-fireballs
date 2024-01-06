import { applyVelocity, lookInVectorDirection } from './physics.js';

export function createMageHandler(mageObject, inputHandler) {

	inputHandler.registerFireListener(fire);
	inputHandler.registerJumpListener(jump);

	return {
		applyFrame(timeElapsed, mageVelocity) {
			applyVelocity(mageObject, mageVelocity, timeElapsed)
			lookInVectorDirection(mageObject, mageVelocity)
		},
	};

	function fire() {
		console.log('fire!');
	}

	function jump() {
		console.log('jump!');
	}
}
