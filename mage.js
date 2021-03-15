import { applyVelocity, lookInVectorDirection } from './physics.js';

export function createMageHandler(mageObject) {
	return {
		applyFrame(timeElapsed, mageVelocity) {
			applyVelocity(mageObject, mageVelocity, timeElapsed)
			lookInVectorDirection(mageObject, mageVelocity)
		},
	};
}
