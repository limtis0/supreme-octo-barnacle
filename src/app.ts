import fastify from 'fastify';
import cors from '@fastify/cors'
import healthzRoutes from './features/healthz/routes';
import changesRoutes from './features/changes/routes';

async function bootstrap() {
    const app = fastify();

    app.setErrorHandler((error, request, reply) => {
        console.error(`Error while requesting ${request.url}: ${error}`);

        if (error.statusCode && error.statusCode >= 500) {
            return reply.code(500).send({ error: 'Internal server error' });
        }
        else {
            return reply.code(error.statusCode ?? 400).send({
                error: error.message
            });
        }
    
    });

    // ! Set up domain-name in production
    await app.register(cors);

    // Add auto-load
    app.register(healthzRoutes);
    app.register(changesRoutes);

    app.listen({ port: 3001 }, (error, address) => {
        if (error) {
            console.error(`Error while starting Fastify: ${error}`);
            process.exit(1);
        }

        console.log(`Server is listening at ${address}`);
    });
}

bootstrap();