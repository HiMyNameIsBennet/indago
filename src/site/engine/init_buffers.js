const init_buffers = (position_buffer, color_buffer) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
    gl.vertexAttribPointer(vertex_position, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertex_position)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
    gl.vertexAttribPointer(vertex_color, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertex_color)
}