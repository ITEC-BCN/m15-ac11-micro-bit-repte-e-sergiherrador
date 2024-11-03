x = 2
y = 2
movimiento_activo = False  # Estado inicial

# Muestra el gráfico de temperatura una vez
def on_button_pressed_a():
    global movimiento_activo
    movimiento_activo = False  # Detiene el movimiento
    temperatura = input.temperature()
    led.plot_bar_graph(temperatura, 50)  # Muestra el gráfico

# Activa el movimiento de la gota al presionar B
def on_button_pressed_b():
    basic.clear_screen()
    global movimiento_activo
    movimiento_activo = True  # Activa el movimiento

# Mueve la gota continuamente si el movimiento está activo
def on_forever():
    global x, y
    if movimiento_activo:
        led.plot(x, y)
        basic.pause(50)
        led.unplot(x, y)
        
        accX = input.acceleration(Dimension.X)
        accY = input.acceleration(Dimension.Y)
        
        if accX < -150 and x > 0:
            x -= 1
        elif accX > 150 and x < 4:
            x += 1
        
        if accY < -150 and y > 0:
            y -= 1
        elif accY > 150 and y < 4:
            y += 1

# Asigna los botones
input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)

# Ejecuta el bucle de movimiento continuo
basic.forever(on_forever)