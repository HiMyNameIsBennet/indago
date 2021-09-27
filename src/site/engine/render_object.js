class RenderObject {
    constructor(position, scale, angle, rotation, vertices) {
        this.position = position
        this.scale = scale
        this.angle = angle
        let i = 0
        vertices = vertices.map( function(e) { 
            i++
            if(i % 2 == 0)
                return e + position[1]
            else
                return e + position[0]
        } )
        console.log(vertices)
        this.vertices = vertices
        this.radians = angle * Math.PI / 180.0
        this.rotation = rotation
    }

    rotate(angle) {
        this.angle = (this.angle + angle) % 360
        this.rotation[0] = Math.sin(this.angle * Math.PI / 180.0)
        this.rotation[1] = Math.cos(this.angle * Math.PI / 180.0)
    }
}