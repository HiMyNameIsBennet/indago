let gl = null
let canvas = null

let aspect_ratio
let current_rotation
let current_scale
let current_angle

let vtxArray
let vtxBuffer
let vtxNumComponents
let vtxCount

let scale
let color
let position
let rotation

let delta_time = 0.0
let degPerSecond = 90.0


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
    current_rotation = [0, 1]
    current_scale = [0.5, aspect_ratio/2]

    vtxArray = new Float32Array([
        -0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5, -0.5, -0.5, -0.5
    ])

    vtxBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vtxBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vtxArray, gl.STATIC_DRAW)

    vtxNumComponents = 2
    vtxCount = vtxArray.length/vtxNumComponents

    current_angle = 0.0

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

    let rads = current_angle * Math.PI / 180.0
    current_rotation[0] = Math.sin(rads)
    current_rotation[1] = Math.cos(rads)

    gl.useProgram(shaderProg)

    scale = gl.getUniformLocation(shaderProg, "scale")
    color = gl.getUniformLocation(shaderProg, "color")
    rotation = gl.getUniformLocation(shaderProg, "rotation")
    
    gl.uniform2fv(scale, current_scale)
    gl.uniform2fv(rotation, current_rotation)
    gl.uniform4fv(color, [0.1, 0.7, 0.2, 1.0])

    gl.bindBuffer(gl.ARRAY_BUFFER, vtxBuffer)

    position = gl.getAttribLocation(shaderProg, "position")

    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, vtxNumComponents, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.TRIANGLES, 0, vtxCount)

    window.requestAnimationFrame(current_time => {
        let delta_angle = ((current_time - delta_time) / 1000.0) * degPerSecond

        current_angle = (current_angle + delta_angle) % 360

        delta_time = current_time
        animateScene()
    })
}


window.addEventListener("load", startup)