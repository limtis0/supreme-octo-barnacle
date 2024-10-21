import fastify from 'fastify';
import cors from '@fastify/cors'

async function bootstrap() {
    const app = fastify();

    // ! Set up domain-name in production
    await app.register(cors);

    // TODO Add routes

    app.listen({ port: 3001 }, (error, address) => {
        if (error) {
            console.error(`Error while starting Fastify: ${error}`);
            process.exit(1);
        }

        console.log(`Server is listening at ${address}`);
    });
}

bootstrap();