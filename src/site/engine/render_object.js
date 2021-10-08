class RenderObject {
    constructor(position, scale, angle, rotation, color, vertices) {
        this.iPosition = position
        this.iScale = scale
        this.iAngle = angle
        this.iVertices = vertices
        this.iRadians = angle * Math.PI / 180.0
        this.iRotation = rotation
        this.iColor = color
    }

    rotate(angle) {
        this.iAngle = (this.iAngle + angle) % 360
        this.iRotation[0] = Math.sin(this.iAngle * Math.PI / 180.0)
        this.iRotation[1] = Math.cos(this.iAngle * Math.PI / 180.0)
    }

    transform(x, y) {
        this.iPosition[0] += x
        this.iPosition[1] += y
    }

    scale(x, y) {
        this.iScale[0] = x
        this.iScale[1] = y
    }
}