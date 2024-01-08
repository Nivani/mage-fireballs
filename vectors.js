export function calculateVectorLength(vector) {
  return Math.sqrt(
    vector.x * vector.x + vector.y * vector.y + vector.z * vector.z,
  );
}

export function normalizeVector(vector, vectorLength) {
  if (vectorLength === undefined) {
    vectorLength = calculateVectorLength(vector);
  }
  if (vectorLength > 0) {
    return {
      x: vector.x / vectorLength,
      y: vector.y / vectorLength,
      z: vector.z / vectorLength,
    };
  }

  return vector;
}

export function multiplyVector(vector, factor) {
  return {
    x: vector.x * factor,
    y: vector.y * factor,
    z: vector.z * factor,
  };
}

export function zeroVector() {
  return { x: 0.0, y: 0.0, z: 0.0 };
}
