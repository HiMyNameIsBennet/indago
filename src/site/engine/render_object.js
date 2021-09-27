class RenderObject {
    
    constructor(position, scale, angle, rotation, vertices) {
        this.position = position
        this.scale = scale
        this.angle = angle
        this.vertices = vertices
        this.radians = angle * Math.PI / 180.0
        this.rotation = rotation
    }
}