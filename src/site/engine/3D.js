const field_of_view = 45 * Math.PI / 180
const pMatrix = glMatrix.mat4.create()
const zFar = 100.0
const zNear = 0.1

let vertex_position
let vertex_color

let mvp_matrix

let shaderProg
let aspect
let canvas
let gl

let position_buffer
let color_buffer
let index_buffer


const init = () => {
    canvas = document.getElementById("glcanvas")
    gl = canvas.getContext("webgl")

    const shaders = [
        {
            type: gl.VERTEX_SHADER,
            code: vtx_3d
        },
        {
            type: gl.FRAGMENT_SHADER,
            code: fgm_3d
        }
    ]


    aspect = canvas.width / canvas.height
    glMatrix.mat4.perspective(pMatrix, field_of_view, aspect, zNear, zFar)


    shaderProg = buildShaderProgram(shaders)


    vertex_position = gl.getAttribLocation(shaderProg, 'aVertexPosition')
    vertex_color = gl.getAttribLocation(shaderProg, 'aVertexColor')

    mvp_matrix = gl.getUniformLocation(shaderProg, 'mvpMatrix')


    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clearDepth(1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

    position_buffer = gl.createBuffer()
    color_buffer = gl.createBuffer()
    index_buffer = gl.createBuffer()

    init_buffers(position_buffer, color_buffer)
    gl.useProgram(shaderProg)

    launch()
}

window.addEventListener("load", init)