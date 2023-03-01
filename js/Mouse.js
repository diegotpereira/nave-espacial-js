const mouse = {
    x: undefined,
    y: undefined,

    porcentagem: {

        x: 0,
        y: 0,
    }
}

addEventListener('mousemove', function(e) {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    mouse.porcentagem.x = mouse.x / innerWidth;
    mouse.porcentagem.y = mouse.y / innerHeight;
});

export default mouse;