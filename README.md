# Network Calculator — Calculadora de Redes IPv4

Herramienta web para calcular subredes IPv4, desarrollada por **Avocado's Network**.

## Descripcion

Aplicacion cliente 100% frontend que permite:

- Identificar la clase de una direccion IP (A, B, C, D, E)
- Calcular la mascara de subred a partir de notacion CIDR
- Obtener direccion de red, primer/ultimo host utilizable y broadcast de cualquier subred
- Calcular la direccion de un host especifico dentro de una subred
- Realizar calculos VLSM (Variable Length Subnet Mask) para multiples subredes con distintos requerimientos de hosts

## Demo

Visita [avocadosnetwork.com](https://www.avocadosnetwork.com/Nosotros.html) para conocer mas sobre el proyecto.

## Uso

No requiere instalacion ni servidor. Abre `index.html` directamente en el navegador.

```
redes/
├── index.html   # Estructura y formularios
├── index.js     # Logica de calculo de redes
├── style.css    # Estilos personalizados
└── Assets/
    ├── favicon.png
    └── logo_peque_gris.png
```

## Funcionalidades

### Calculadora de Red

1. Ingresa los octetos de la direccion IP
2. Ingresa el prefijo CIDR (`/`)
3. Haz clic en **Calcular Redes** para ver clase, mascara, numero de subredes y hosts

### Calculadora de Subred

Tras calcular la red, ingresa el numero de subred para obtener:
- Direccion de red
- Primer y ultimo host utilizable
- Direccion de broadcast

### Host Personalizado

Ingresa subred + numero de host para obtener la direccion IP exacta de ese host.

### Calculadora VLSM

1. Haz clic en **Calculadora VLSM**
2. Ingresa el numero de subredes requeridas
3. Ingresa el numero de hosts para cada subred
4. La herramienta ordena las subredes de mayor a menor y calcula el bloque optimo para cada una

## Tecnologias

| Tecnologia | Version |
|-----------|---------|
| HTML5 | — |
| CSS3 | — |
| JavaScript | ES6+ (Vanilla) |
| Bootstrap | 5.0.0 |

Sin dependencias de npm ni proceso de build. Todo corre en el navegador.

## Clases IP soportadas

| Clase | Rango primer octeto | Bits de red |
|-------|-------------------|-------------|
| A | 1 – 127 | /8 |
| B | 128 – 191 | /16 |
| C | 192 – 223 | /24 |
| D | 224 – 239 | Multicast |
| E | 240 – 255 | Reservado |

## Creditos

Desarrollado con 🥑 por:

- [@DiPa71](https://github.com/DiPa71)
- [@NaH-22](https://github.com/NaH-22)
- [@John024x](https://github.com/john024x)

---

© 2021 Avocado's Network. All Rights Reserved.
