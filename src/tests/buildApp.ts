import changesRoutes from '@/features/changes/routes';
import healthzRoutes from '@/features/healthz/routes';
import fastify from 'fastify';

export default function buildApp() {
    const app = fastify();

    app.register(healthzRoutes);
    app.register(changesRoutes);

    return app;
}
