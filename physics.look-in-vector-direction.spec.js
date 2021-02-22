import {lookInVectorDirection} from "./physics.js";

const sinCos45deg = 0.7071;

describe('physics', () => {
    describe('lookInVectorDirection()' , () => {
        it('rotates π/2 rad around the y-axis when the vector is pointing right', () => {
            const vector = { x: 1.0, y: 0.0, z: 0.0 };
            const object = withoutRotation();

            lookInVectorDirection(object, vector);

            expect(object.rotation.x).toBe(0);
            expect(object.rotation.y).toBe(Math.PI / 2.0);
            expect(object.rotation.z).toBe(0);
        });

        it('rotates π/4 rad around the y-axis when the vector is pointing right and forward', () => {
            const vector = { x: sinCos45deg, y: 0.0, z: sinCos45deg };
            const object = withoutRotation();

            lookInVectorDirection(object, vector);

            expect(object.rotation.x).toBe(0);
            expect(round4(object.rotation.y)).toBe(round4(Math.PI / 4.0));
            expect(object.rotation.z).toBe(0);
        });

        it('rotates 3π/4 rad around the y-axis when the vector is pointing right and back', () => {
            const vector = { x: sinCos45deg, y: 0.0, z: -sinCos45deg };
            const object = withoutRotation();

            lookInVectorDirection(object, vector);

            expect(object.rotation.x).toBe(0);
            expect(round4(object.rotation.y)).toBe(round4(3.0 * Math.PI / 4.0));
            expect(object.rotation.z).toBe(0);
        });

        it('rotates 5π/4 rad around the y-axis when the vector is pointing left and back', () => {
            const vector = { x: -sinCos45deg, y: 0.0, z: -sinCos45deg };
            const object = withoutRotation();

            lookInVectorDirection(object, vector);

            expect(object.rotation.x).toBe(0);
            expect(round4(object.rotation.y)).toBe(round4(5.0 * Math.PI / 4.0));
            expect(object.rotation.z).toBe(0);
        });

        it('rotates 7π/4 rad around the y-axis when the vector is pointing left and forward', () => {
            const vector = { x: -sinCos45deg, y: 0.0, z: sinCos45deg };
            const object = withoutRotation();

            lookInVectorDirection(object, vector);

            expect(object.rotation.x).toBe(0);
            expect(object.rotation.y).toBe(7.0 * Math.PI / 4.0);
            expect(object.rotation.z).toBe(0);
        });
    });
});

function withoutRotation() {
    return {rotation: {x: 0.0, y: 0.0, z: 0.0}};
}

function round4(n) {
    return Math.round(n * 10000.0) / 10000.0
}
