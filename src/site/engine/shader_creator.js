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

const compileShader = (code, type) => {
    let shader = gl.createShader(type)

    gl.shaderSource(shader, code)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(`Error compiling ${type === gl.VERTEX_SHADER ? "vertex" : "fragment"} shader:`)
        console.log(gl.getShaderInfoLog(shader))
    }
    
    return shader
}