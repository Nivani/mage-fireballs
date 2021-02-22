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
        const vectorLength = calculateVectorLength(vector);
        if (vectorLength > 0) {
            vector = normalizeVector(vector, vectorLength);
            object.rotation.y = Math.acos(vector.z);
            if (vector.x < 0) {
                object.rotation.y = 2 * Math.PI - object.rotation.y;
            }
        }
    }
}

function calculateVectorLength(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
}

function normalizeVector(vector, vectorLength) {
    if (vectorLength === undefined) {
        vectorLength = calculateVectorLength(vector);
    }
    if (vectorLength > 0) {
        return {
            x: vector.x / vectorLength,
            y: vector.y / vectorLength,
            z: vector.z / vectorLength,
        }
    }

    return vector;
}
