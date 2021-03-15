import { applyVelocity, lookInVectorDirection } from './physics.js';

export function createMageHandler(mageObject, inputHandler) {

	inputHandler.registerJumpHandler(jump);

	return {
		applyFrame(timeElapsed, mageVelocity) {
			applyVelocity(mageObject, mageVelocity, timeElapsed)
			lookInVectorDirection(mageObject, mageVelocity)
		},
	};

	function jump() {
		console.log('jump!');
	}
}
