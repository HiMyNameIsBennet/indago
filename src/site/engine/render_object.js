class RenderObject {
    constructor(position, scale, angle, rotation, vertices) {
        this.position = position
        this.scale = scale
        this.angle = angle
        this.vertices = vertices
        this.radians = angle * Math.PI / 180.0
        this.rotation = rotation
    }

    rotate(angle) {
        this.angle = (this.angle + angle) % 360
        this.rotation[0] = Math.sin(this.angle * Math.PI / 180.0)
        this.rotation[1] = Math.cos(this.angle * Math.PI / 180.0)
    }

    transform(x, y) {
        this.position[0] += x
        this.position[1] += y
    }
}