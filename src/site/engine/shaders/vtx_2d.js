const vtx_2d = `attribute vec2 position;

uniform vec2 scale;
uniform vec2 rotation;
uniform vec2 transform;

void main() {
    vec2 rotPosition = vec2(
        position.x * rotation.y +
        position.y * rotation.x,
        position.y * rotation.y -
        position.x * rotation.x
    );

    gl_Position = vec4(rotPosition * scale + transform, 0.0, 1.0);
}`