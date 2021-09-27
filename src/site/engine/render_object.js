class RenderObject {
    constructor(position, scale, angle, rotation, vertices) {
        this.iPosition = position
        this.iScale = scale
        this.iAngle = angle
        this.iVertices = vertices
        this.iRadians = angle * Math.PI / 180.0
        this.iRotation = rotation
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

    scale(scale) {
        let factor = (this.iScale[0] + scale) / this.iScale[0]
        this.iScale[0] *= factor
        this.iScale[1] *= factor
    }
}