/**
 * TODO /// Recomendado instalar la extensión del VSC "Better Comments" para leer mejor la documentación ///
 *  
 * * El store es un contenedor de datos que se encarga de gestionar el los datos global de la aplicación
 * * y de proporcionar métodos para modificarlos, esto se le llama el "state" o "estado de la aplicación".
 * 
 * * Para entenderlo mejor, podemos imaginarlo como una base de datos en memoria que contiene todos los datos de la aplicación
 * * y que proporciona métodos para acceder a esos datos y para modificarlos. Sería un paso medio entre guardar en caché
 * * o guardar en un localstorage.
 *
 * * Estos datos pueden ser accedidos desde cualquier componente de la aplicación y son tanto reactivos como inmutables.
 * * eso significa que cualquier cambio en el estado del store se reflejará automáticamente en todos los componentes que lo estén utilizando.
 * * y que no se pueden modificar directamente, sino que se deben modificar a través de los métodos proporcionados por el store, haciendolo muy seguro.
 * 
 * * Es una alternativa a los servicios y a las variables globales, ya que proporciona una forma más estructurada y segura de gestionar el estado de la aplicación.
 * * y así podemos evitar utilizar el localStorage o sessionStorage para guardar datos que necesitamos en la aplicación, creando una estructura más limpia y segura.
 * 
 * ! Hoy en día se utiliza el store como gestor de datos en las 3 grnades tecnologías de cliente: Angular, React y Vue,
 * ! siendo este el motivo de elegir ngrx, ya que es la versión de Angular de Redux, el store más utilizado en React y que en vue se llama Vuex.
 * ! Permitiendo que al cambiar de tecnología, el cambio sea más sencillo, ya que la estructura de los stores es similar en todas ellas.
 * 
 * =============================================================================================
 * 
 * * En este caso utilizo ngrx-signals, una librería que proporciona una forma sencilla de crear stores en Angular.
 * * y que se integra fácilmente con el ecosistema de Angular, ya que utiliza inyección de dependencias para traer los datos.
 * 
 * * Los signals son nativos desde Angular 17 y se pueden utilizar en cualquier componente de la aplicación. Permiten comunicar eventos entre componentes.
 * * y se pueden utilizar para enviar mensajes entre componentes, para actualizar el estado de la aplicación, para realizar acciones en respuesta a eventos, etc.
 * 
 * * Concretamente utilizo el método signalStore de ngrx-signals. También existe el método signalState, pero permite menos funcionalidades y menos escalabilidad.
 * * Aunque para aplicaciones más pequeñas puede valorarse su uso, ya que es más sencillo de implementar y tiene menos carga en la web.
 * 
 * =============================================================================================
 * 
 * * El enlace de la documentación es este:
 * ? https://ngrx.io/guide/signals
 * 
 * ! Como ejemplo de uso, ver el archivo user.store.ts, que tiene comentarios explicativos de cómo se utiliza el store.
 * 
 */