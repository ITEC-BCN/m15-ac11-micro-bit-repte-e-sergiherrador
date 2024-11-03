let x = 2
let y = 2
let movimiento_activo = false
//  Estado inicial
//  Muestra el gráfico de temperatura una vez
//  Muestra el gráfico
//  Activa el movimiento de la gota al presionar B
//  Activa el movimiento
//  Mueve la gota continuamente si el movimiento está activo
//  Asigna los botones
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    movimiento_activo = false
    //  Detiene el movimiento
    let temperatura = input.temperature()
    led.plotBarGraph(temperatura, 50)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    basic.clearScreen()
    
    movimiento_activo = true
})
//  Ejecuta el bucle de movimiento continuo
basic.forever(function on_forever() {
    let accX: number;
    let accY: number;
    
    if (movimiento_activo) {
        led.plot(x, y)
        basic.pause(50)
        led.unplot(x, y)
        accX = input.acceleration(Dimension.X)
        accY = input.acceleration(Dimension.Y)
        if (accX < -150 && x > 0) {
            x -= 1
        } else if (accX > 150 && x < 4) {
            x += 1
        }
        
        if (accY < -150 && y > 0) {
            y -= 1
        } else if (accY > 150 && y < 4) {
            y += 1
        }
        
    }
    
})
