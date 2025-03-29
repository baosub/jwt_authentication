import express from 'express';


const app = express();

// Middlewares
app.use(express.json());


// Rutas
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Middleware simple de manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.message); // Imprime el error en la consola
    res.status(500).send('Algo salió mal en el servidor'); // Respuesta genérica
  });

export default app;
