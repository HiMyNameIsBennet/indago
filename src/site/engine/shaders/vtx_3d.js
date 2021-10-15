const vtx_3d = `attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 mvpMatrix;

varying lowp vec4 vColor;

void main() {
    gl_Position = mvpMatrix * aVertexPosition;
    vColor = aVertexColor;
}`