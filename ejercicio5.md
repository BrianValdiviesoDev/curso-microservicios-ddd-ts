# Ejercicio práctico 5: CQRS
## Contexto
Nuestro proyecto ha tenido muy buena acogida y una funcionalidad muy utilizada es la de gestión de vehículos.\
Como acumulamos mucha información de miles de usuarios, hemos abierto como SaaS nuestra API. El problema es que tenemos una carga muy elevada de descarga de información y hemos tenido que escalar la infraestructura. Como medida de ahorro vamos a implementar el patrón CQRS para poder reducir la potencia de la parte de escritura y mejorar la de lectura.
