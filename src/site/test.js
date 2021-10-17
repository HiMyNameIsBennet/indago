let rb = new RenderBehavior()

let cube_rotation = 0.0
let delta_time = 0.0

let modelMatrix = glMatrix.mat4.create()
let viewMatrix = glMatrix.mat4.create()
let mvpMatrix = glMatrix.mat4.create()


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


let cube = new RenderObject(positions, colors, indices, modelMatrix)
glMatrix.mat4.translate(viewMatrix, viewMatrix, [0.0, 0.0, -5.0])

const loop = () => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    glMatrix.mat4.multiply(mvpMatrix, pMatrix, viewMatrix)
    glMatrix.mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix)
    cube.modelMatrix = mvpMatrix
    draw(cube)

    console.log(cube)
    
    glMatrix.mat4.rotate(modelMatrix, modelMatrix, 0.01, [1, 1, 1])
}

rb.render_loop = loop

rb.render()