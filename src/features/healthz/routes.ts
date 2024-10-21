import { FastifyInstance } from "fastify";

export default function healthzRoutes(app: FastifyInstance) {
    app.get('/api/healthz', async (request, reply) => {
        return reply.code(200).send();
    });
}
