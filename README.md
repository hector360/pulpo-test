#Test técnico Pulpo

A continuación, presento la documentación correspondiente a la Prueba Técnica realizada utilizando Node.js para la empresa Pulpo.

##Instalación  
npm install 
npm run dev

Favor de instalar el archivo .env en la raiz del proyecto

##Documentación

El proyecto cuenta con 5 carpetas:
-config
-controllers
-functions
-models
-routes

Config (carpeta)
Contiene el archivo “db.js”, este archivo se encarga de la configuración a la base de datos, en este proyecto estamos usando una base de datos no relacional (MongoDB). 
El archivo contiene una función llamada conectDB la cual será llamada posteriormente en el archivo “index.js”

Controllers (carpeta)
La carpeta contiene un archivo llamado “monetaryHelpController.js” este archivo contiene una función llamada “getMonetaryHelp” esta función esta directamente vinculada con la ruta raíz , lo que quiere decir que cada vez que se llame a la ruta “/” la función será ejecutada.
•	Función getMonetaryHelp:
1) La función empieza con 3 variables: { totalYearsOfData, row, start }
- totalYearsOfData: esta variable indica cuantos años tomara de referencia la API, en la documentación decía 5 años así que la variable se inicializa con esa cantidad.
-row: esta variable se utilizará para los parámetros que se envían a la API de IATI, indica cuantos documentos traerá el api con cada petición
-start: esta variable indica a partir de que documento inicia la petición a la API de IATI.
2)Después se manda a llamar una función llamada “getLastStart”, esta función hace una consulta a la base de datos y busca el ultimo valor de la tabla el cual traerá la variable “last_start”, esta variable contiene el ultimo valor de start que se utilizo y este se sumara a la variable ya creada de start para así ir sumando las rows que ya fueron utilizadas.
3) Se llama a la función “getDatastore” esta función hace una llamada a la API de IATI la cual traerá todos los donativos echos a Sudan desde la fecha actual hasta 5 años atrás, por que así se especifico en el documento.
4) A continuación se hacen tres ciclos “for” uno se encarga de conseguir el nombre de la organización que hizo la donación, el siguiente ciclo se encarga de almacenar en una variable todas las transacciones que se hicieron y el tercer ciclo almacena los datos en la base de datos.
5) Por ultimo se hace una llamada a una función que trae todos los datos almacenados en la tabla de la base de datos y los formatea en la forma especificada en el documento.

Functions (carpeta)
Esta carpeta contiene un archivo llamado “iati-api.js” este archivo se encarga de contener la mayoría de las funciones del proyecto.
•	getDataStore (Función)
Esta función se encarga de hacer la llamda directa con la API de IATI., se le debe de pasar ciertos parámetros en la URL y en los headers debe de llevar la siguiente variable: “Ocp-Apim-Subscription-Key” que contiene la apikey del usuario.
•	saveMonetaryHelp (Función)
Esta función guarda los datos directamente en la base de datos, los parámetros que guardara son:
-fecha de transacción
-cantidad
-Nombre de la Organización 
-last_start
-y el número de rows
•	getLastStart (Función)
Esta función se encarga de traer la ultima fila insertada en la tabla MonetaryHelp
•	isEmpty (Función)
Esta función se encarga de validar si un objeto esta vació
•	getFormatedMonetaryHelp (Función)
Esta función se encarga de formatear el json que será devuelto en la función principal, lo formatea de la manera que fue especificada en la documentación.
•	isYearInRange (Función)
Esta función revisa si el año que se esta evaluando esta en el rango especificado entre los años a considerar y el año actual.
•	isKeyInUse (Función)
Esta función revisa si una key de un objeto ya esta en uso.
Models (Carpeta)
Esta carpeta contiene un archivo llamado “MonetaryHelp” este archivo tiene laconfiguracion del modelo de la base de datos.

Routes (Carpeta)
Esta carpeta contiene el archivo llamado “monetary-help.js” este archivo se encarga de contener las rutas que tendrá el proyecto, en este caso solo tiene una ruta, la ruta raíz “/” la cual llama a la función “getMonetaryHelp”
