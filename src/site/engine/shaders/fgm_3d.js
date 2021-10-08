const fgm_3d = `#ifdef GL_ES
precision highp float;
#endif

varying lowp vec4 vColor;

void main() {
gl_FragColor = vColor;
}`