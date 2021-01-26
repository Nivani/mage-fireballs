export function applyVelocity(object, velocity, timeElapsed) {
    if (object && velocity) {
        const timeModifier = timeElapsed / 1000.0;
        object.position.x += velocity.x * timeModifier;
        object.position.y += velocity.y * timeModifier;
        object.position.z += velocity.z * timeModifier;
    }
}