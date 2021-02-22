export function applyVelocity(object, velocity, timeElapsed) {
    if (object && velocity) {
        const timeModifier = timeElapsed / 1000.0;
        object.position.x += velocity.x * timeModifier;
        object.position.y += velocity.y * timeModifier;
        object.position.z += velocity.z * timeModifier;
    }
}

export function lookInVectorDirection(object, vector) {
    if (object && vector) {
        vector = normalizeVector(vector);
        object.rotation.y = Math.acos(vector.z);
        if (vector.x < 0) {
            object.rotation.y = 2 * Math.PI - object.rotation.y;
        }
    }
}

function normalizeVector(vector) {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    if (length > 0) {
        return {
            x: vector.x / length,
            y: vector.y / length,
            z: vector.z / length,
        }
    }

    return vector;
}
