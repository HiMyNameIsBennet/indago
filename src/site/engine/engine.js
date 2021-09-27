let gl = null
let canvas = null

let aspect_ratio
let current_rotation
let current_scale
let current_angle

let vtxArray = []
let vtxTotalLength = 0
let vtxBuffer
let vtxNumComponents
let vtxCount

let scale
let color
let position
let rotation
let transform

let delta_time = 0.0
let degPerSecond = 130.0

let test
let test2

vtxArray[0] = new Float32Array([
    -.5, .35, -.25, .5, 0, .35,
    0, .35, .25, .5, .5, .35,
    -.5, .35, 0, .35, 0, 0,
    0, .35, .5, .35, 0, 0,
    -.5, .35, -.5, 0, 0, 0,
    .5, .35, .5, 0, 0, 0,
    0, 0, -.5, 0, 0, -.3,
    0, 0, .5, 0, 0, -.3
])


const startup = () => {
    canvas = document.getElementById("glcanvas")
    gl = canvas.getContext("webgl")

    const shaders = [
        {
            type: gl.VERTEX_SHADER,
            code: "vertex-shader"
        },
        {
            type: gl.FRAGMENT_SHADER,
            code: "fragment-shader"
        }
    ]

    shaderProg = buildShaderProgram(shaders)

    aspect_ratio = canvas.width/canvas.height
    current_rotation = [1, 0]
    current_scale = [0.5, aspect_ratio/2]
    current_angle = 0.0

    test = new RenderObject([0.5, 0], current_scale, 0, [1, 0], vtxArray[0])
    test2 = new RenderObject([-0.625, 0], [0.25, current_scale[1]/2], 0, [1, 0], vtxArray[0])

    vtxBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vtxBuffer)

    vtxArray.forEach(elem => {
        gl.bufferData(gl.ARRAY_BUFFER, elem, gl.STATIC_DRAW)
        vtxTotalLength += elem.length
    })

    vtxNumComponents = 2

    vtxCount = vtxTotalLength/vtxNumComponents

    animateScene()
}

const buildShaderProgram = shaders => {
    let program = gl.createProgram()

    shaders.forEach(elem => {
        let shader = compileShader(elem.code, elem.type)

        if (shader) {
            gl.attachShader(program, shader)
        }
    })

    gl.linkProgram(program)

    return program
}

const compileShader = (id, type) => {
    let code = document.getElementById(id).firstChild.nodeValue
    let shader = gl.createShader(type)

    gl.shaderSource(shader, code)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(`Error compiling ${type === gl.VERTEX_SHADER ? "vertex" : "fragment"} shader:`)
    console.log(gl.getShaderInfoLog(shader))
    }
    
    return shader
}

const animateScene = () => {
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.2, 0.2, 0.3, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    test.radians = test.angle * Math.PI / 180.0
    test2.radians = test2.angle * Math.PI / 180.0

    test2.transform(Math.sin(test2.radians)/50, 0)
    test.transform(0, Math.cos(test.radians)/85)

    console.log(test2.position)

    gl.useProgram(shaderProg)

    scale = gl.getUniformLocation(shaderProg, "scale")
    color = gl.getUniformLocation(shaderProg, "color")
    rotation = gl.getUniformLocation(shaderProg, "rotation")
    transform = gl.getUniformLocation(shaderProg, "transform")

    position = gl.getAttribLocation(shaderProg, "position")

    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, vtxNumComponents, gl.FLOAT, false, 0, 0)

    gl.uniform2fv(scale, test.scale)
    gl.uniform2fv(rotation, test.rotation)
    gl.uniform4fv(color, [0.1, 0.7, 0.2, 1.0])
    gl.uniform2fv(transform, test.position)
    gl.drawArrays(gl.TRIANGLES, 0, vtxCount)

    gl.uniform2fv(scale, test2.scale)
    gl.uniform2fv(rotation, test2.rotation)
    gl.uniform4fv(color, [0.1, 0.2, 0.7, 1.0])
    gl.uniform2fv(transform, test2.position)
    gl.drawArrays(gl.TRIANGLES, 0, vtxCount)


    window.requestAnimationFrame(current_time => {
        let delta_angle = ((current_time - delta_time) / 1000.0) * degPerSecond
        test.rotate(-delta_angle)
        test2.rotate(2*delta_angle)

        delta_time = current_time
        animateScene()
    })
}


window.addEventListener("load", startup)