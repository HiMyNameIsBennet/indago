const launch = () => {
    for(let rb of RenderBehavior.instances){
        rb.enable()
    }
}