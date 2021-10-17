class RenderBehavior {
    constructor(render_loop = () => {}){
        this.render_loop = render_loop
        this.enabled = false
        RenderBehavior.instances = []
        RenderBehavior.instances.push(this)
    }

    render(){
        window.requestAnimationFrame(current_time => {
            if(this.enabled){
                this.render_loop()
            }
            this.render()
        })
    }

    enable(){
        this.enabled = true
    }

    disable(){
        this.enabled = false
    }
}