const field_of_view = 45 * Math.PI / 180
const pMatrix = mat4.create()
const zFar = 100.0
const zNear = 0.1

let cube_rotation = 0.0
let delta_time = 0.0

let shaderProg
let aspect
let canvas
let gl

let projection_matrix
let model_view_matrix
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
    [18/255,  23/255,  23/255,  1.0],
    [18/255,  23/255,  23/255,  1.0],
    [18/255,  23/255,  23/255,  1.0],
    [18/255,  23/255,  23/255,  1.0],
]

const indices = [
    0,  1,  2,      0,  2,  3,
    4,  5,  6,      4,  6,  7,
    8,  9,  10,     8,  10, 11,
    12, 13, 14,     12, 14, 15,
    16, 17, 18,     16, 18, 19,
    20, 21, 22,     20, 22, 23
]

let colors = [];
  for (let j = 0; j < face_colors.length; j++) {
    let c = face_colors[j];
    colors = colors.concat(c, c, c, c);
}


const startup = () => {
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
    mat4.perspective(pMatrix, field_of_view, aspect, zNear, zFar)


    shaderProg = buildShaderProgram(shaders)


    vertex_position = gl.getAttribLocation(shaderProg, 'aVertexPosition')
    vertex_color = gl.getAttribLocation(shaderProg, 'aVertexColor')

    projection_matrix = gl.getUniformLocation(shaderProg, 'uProjectionMatrix')
    model_view_matrix = gl.getUniformLocation(shaderProg, 'uModelViewMatrix')


    position_buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    color_buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

    index_buffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)


    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clearDepth(1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)


    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
    gl.vertexAttribPointer(vertex_position, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertex_position)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
    gl.vertexAttribPointer(vertex_color, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertex_color)

    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)
    gl.useProgram(shaderProg)


    animateScene()    
}


const animateScene = () => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)


    const mViewMatrix = mat4.create()

    mat4.translate(mViewMatrix, mViewMatrix, [-0.0, 0.0, -6.0])
    mat4.rotate(mViewMatrix, mViewMatrix, cube_rotation, [1, .75, .5])


    gl.uniformMatrix4fv(projection_matrix, false, pMatrix)
    gl.uniformMatrix4fv(model_view_matrix, false, mViewMatrix)


    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)


    window.requestAnimationFrame(current_time => {
        cube_rotation = current_time / 1000

        animateScene()
    })
}


window.addEventListener("load", startup)