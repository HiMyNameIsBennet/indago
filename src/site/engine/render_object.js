class RenderObject {
    constructor(vertices, colors, indices, modelMatrix) {
        this.vertices = vertices
        this.colors = colors
        this.indices = indices
        this.modelMatrix = modelMatrix
    }
/*
    rotate(angle) {
        this.angle = (this.angle + angle) % 360
        this.rotation[0] = Math.sin(this.angle * Math.PI / 180.0)
        this.rotation[1] = Math.cos(this.angle * Math.PI / 180.0)
    }

    transform(x, y) {
        this.position[0] += x
        this.position[1] += y
    }

    scale(x, y) {
        this.scale[0] = x
        this.scale[1] = y
    }*/
}