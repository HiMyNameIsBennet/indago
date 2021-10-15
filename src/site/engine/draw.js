const draw = render_object => {
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(render_object.vertices), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(render_object.colors), gl.STATIC_DRAW)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(render_object.indices), gl.STATIC_DRAW)

    
    gl.uniformMatrix4fv(mvp_matrix, false, render_object.modelMatrix)


    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
}