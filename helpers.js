export function updateInputHelpers(vector) {
    document.getElementById('input-x-placeholder').innerText = `${vector.x}`;
    document.getElementById('input-z-placeholder').innerText = `${vector.z}`;
}