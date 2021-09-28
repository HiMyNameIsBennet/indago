let gl = null
let canvas = null

let aspect_ratio
let current_rotation
let current_scale
let current_angle

let vtxArray = []
let vtxTotalLength = 0
let vtxBuffer
let vtxNumComponents = 2
let vtxCount

let scale
let color
let position
let rotation
let transform

let delta_time = 0.0
let measure_time = 0.0
let measure_frame = 0
let degPerSecond = 130.0

let pillars = []


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
    current_angle = 0.0

    let heights = processBlockchainData()
    let i = 0

    heights.forEach(elem => {
        let v_array = new Float32Array([0, -1, 0, elem, .1, elem,
                                        0, -1, .1, elem, .1, -1])        
        let split = 2 / heights.length
        pillars[i] = new RenderObject([split * i - 1, 0],
                                    current_scale,
                                    0,
                                    [0, 1],
                                    [52/255, 238/255, 218/255, 1.0],
                                    v_array)
        i++
    })

    console.log(pillars)

    vtxBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vtxBuffer)

    pillars.forEach(elem => {
        gl.bufferData(gl.ARRAY_BUFFER, elem.iVertices, gl.STATIC_DRAW)
        vtxTotalLength += elem.iVertices.length
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

const draw = render_object => {
    gl.bufferData(gl.ARRAY_BUFFER, render_object.iVertices, gl.STATIC_DRAW)
    vtxLength = render_object.iVertices.length

    vtxCount = vtxTotalLength/vtxNumComponents

    gl.uniform2fv(scale, render_object.iScale)
    gl.uniform2fv(rotation, render_object.iRotation)
    gl.uniform4fv(color, render_object.iColor)
    gl.uniform2fv(transform, render_object.iPosition)
    gl.drawArrays(gl.TRIANGLES, 0, vtxCount)
}

const animateScene = () => {
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.2, 0.2, 0.3, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(shaderProg)

    scale = gl.getUniformLocation(shaderProg, "scale")
    color = gl.getUniformLocation(shaderProg, "color")
    rotation = gl.getUniformLocation(shaderProg, "rotation")
    transform = gl.getUniformLocation(shaderProg, "transform")

    position = gl.getAttribLocation(shaderProg, "position")

    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, vtxNumComponents, gl.FLOAT, false, 0, 0)

    let i = 1
    pillars.forEach(elem => {
        draw(elem)
        elem.scale(0.1, elem.iScale[1])
        elem.rotate(5 + 2*i/pillars.length, 0)
        i++
    })

    window.requestAnimationFrame(current_time => {
        let delta_angle = ((current_time - delta_time) / 1000.0) * degPerSecond
        
        if(current_time - measure_time >= 1000){
            console.log(measure_frame)
            measure_time = current_time
            measure_frame = 0
        }
        measure_frame++

        delta_time = current_time
        animateScene()
    })
}


window.addEventListener("load", startup)