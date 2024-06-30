// reportMiddleware.js

// Función middleware para generar reportes
const reportMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const path = req.originalUrl;

console.log(`##########-Datos de Consulta-##########
Fecha: [${timestamp}] 
Método: ${method}
Ruta: ${path}
#######################################`
                );
next(); 
};

export default reportMiddleware;