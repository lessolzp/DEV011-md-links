# Markdown Links
# Resumen del Proyecto: Analizador de Enlaces en Archivos Markdown

## Descripción del Proyecto

El *Analizador de Enlaces en Archivos Markdown* es una herramienta desarrollada en Node.js que aborda la problemática común de enlaces rotos o no válidos en archivos Markdown, utilizados ampliamente en plataformas como GitHub, foros y blogs. Esta herramienta, ahora lista y funcional, permite a las desarrolladoras mejorar la calidad de la información compartida en sus repositorios y documentos.

## Funcionalidades Principales

### Análisis de Enlaces

La librería es capaz de leer archivos Markdown y realizar un análisis exhaustivo de los enlaces presentes en ellos. Mediante consultas de red, verifica la validez de cada enlace, proporcionando así un informe detallado sobre su estado.

### Estadísticas de Enlaces

Además del análisis individual de enlaces, la herramienta genera estadísticas completas que ofrecen una visión general de la calidad de los enlaces en un archivo. Proporciona información clave, como la cantidad total de enlaces, la proporción de enlaces válidos y rotos, y otros datos útiles.

## Implementación

La librería está disponible de dos maneras:

### Módulo de Node.js en GitHub

La librería se publica como un módulo de Node.js en GitHub, lo que facilita su integración en proyectos existentes. Las usuarias pueden instalarlo a través de npm, permitiendo una fácil incorporación de la funcionalidad de análisis de enlaces en sus desarrollos.

### Interfaz de Línea de Comandos (CLI)

La librería también cuenta con una interfaz de línea de comandos que permite ejecutar el análisis directamente desde el terminal. Esto brinda una solución rápida y eficiente para verificar enlaces en archivos Markdown sin necesidad de integración en un proyecto específico.