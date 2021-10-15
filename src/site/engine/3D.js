const field_of_view = 45 * Math.PI / 180
const pMatrix = glMatrix.mat4.create()
const zFar = 100.0
const zNear = 0.1

let cube_rotation = 0.0
let delta_time = 0.0

let shaderProg
let aspect
let canvas
let gl

let mvp_matrix

let modelMatrix = glMatrix.mat4.create()
let viewMatrix = glMatrix.mat4.create()
let mvpMatrix = glMatrix.mat4.create()

let vertex_position
let vertex_color

let position_buffer
let color_buffer
let index_buffer


const positions = [
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
]

const face_colors = [
    [52/255,  238/255,  218/255,  1.0],
    [52/255,  238/255,  218/255,  1.0],
    [52/255,  238/255,  218/255,  1.0],
    [235/255,  248/255,  175/255,  1.0],
    [235/255,  248/255,  175/255,  1.0],
    [235/255,  248/255,  175/255,  1.0]
]

const indices = [
    0,  1,  2,      0,  2,  3,
    4,  5,  6,      4,  6,  7,
    8,  9,  10,     8,  10, 11,
    12, 13, 14,     12, 14, 15,
    16, 17, 18,     16, 18, 19,
    20, 21, 22,     20, 22, 23
]

let colors = []
for (let j = 0; j < 4; j++) {
    for (let i = 0; i < face_colors.length; i++) {
        colors = colors.concat(face_colors[i])
    }
}


let cube


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


    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
    gl.vertexAttribPointer(vertex_position, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertex_position)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
    gl.vertexAttribPointer(vertex_color, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertex_color)
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)
    gl.useProgram(shaderProg)


    cube = new RenderObject(positions, colors, indices, modelMatrix)
    glMatrix.mat4.translate(viewMatrix, viewMatrix, [0.0, 0.0, -5.0])


    animateScene()    
}


const animateScene = () => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)


    glMatrix.mat4.multiply(mvpMatrix, pMatrix, viewMatrix)
    glMatrix.mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix)
    console.log(mvpMatrix)
    cube.modelMatrix = mvpMatrix
    draw(cube)
    
    glMatrix.mat4.rotate(modelMatrix, modelMatrix, 0.01, [1, 1, 1])

    window.requestAnimationFrame(current_time => {
        animateScene()
    })
}


window.addEventListener("load", init)