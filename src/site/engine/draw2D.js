const draw2D = render_object => {
    gl.bufferData(gl.ARRAY_BUFFER, render_object.iVertices, gl.STATIC_DRAW)
    let vtxLength = render_object.iVertices.length

    vtxCount = vtxLength/vtxNumComponents

    gl.uniform2fv(scale, render_object.iScale)
    gl.uniform2fv(rotation, render_object.iRotation)
    gl.uniform4fv(color, render_object.iColor)
    gl.uniform2fv(transform, render_object.iPosition)
    gl.drawArrays(gl.TRIANGLES, 0, vtxCount)
}