
> Obre aquesta pàgina a [https://raimonizard.github.io/microbit-template-repo-python/](https://raimonizard.github.io/microbit-template-repo-python/)

## Utilitza-ho com a extensió

Aquest dipòsit es pot afegir com una **extensió** a MakeCode.

* obre [https://makecode.microbit.org/](https://makecode.microbit.org/)
* fes clic a **Projecte nou**
* fes clic a **Extensions** sota el menú de la roda dentada
* cercar **https://github.com/raimonizard/microbit-template-repo-python** i importar

## Edita aquest projecte

Per editar aquest repositori a MakeCode.

* obre [https://makecode.microbit.org/](https://makecode.microbit.org/)
* fes clic a ** Importa** i després a ** Importa URL**
* enganxa **https://github.com/raimonizard/microbit-template-repo-python** i clica importar

#### Metadades (utilitzades per a la cerca, renderització)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

# 🌡️ Estación Meteorológica en Micro:bit 🌧️

Este proyecto convierte tu micro:bit en una pequeña estación meteorológica que puede mostrar la temperatura o simular el movimiento de una gota de agua en la pantalla de LEDs. ¡Prueba los dos modos!

## 🚀 ¿Cómo funciona?

### Botón A: Gráfico de Temperatura 🌡️
- Al presionar **A**, el micro:bit muestra un gráfico de barras que indica la **temperatura actual** (en grados Celsius) en la pantalla LED.
- La escala del gráfico llega hasta un máximo de **50°C** para representar temperaturas altas.
  
### Botón B: Movimiento de la Gota 💧
- Al presionar **B**, el micro:bit activa el modo de **simulación de la gota**.
- En este modo, un solo LED representa una gota que se mueve en la pantalla:
  - La gota responde a la **inclinación** del micro:bit: inclina la tarjeta en diferentes direcciones y observa cómo la gota se desplaza en esa dirección.
  
## 🔄 Alterna entre modos
- **Botón A**: Muestra el gráfico de temperatura y pausa el movimiento de la gota.
- **Botón B**: Activa el movimiento de la gota. 

## 📋 Código de ejemplo

```python
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
    global movimiento_activo
    movimiento_activo = True  # Activa el movimiento

# Mueve la gota continuamente si el movimiento está activo
def on_forever():
    global x, y
    if movimiento_activo:
        led.plot(x, y)
        basic.pause(50)
        led.unplot(x, y)
        
        # Control de dirección según la inclinación
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
