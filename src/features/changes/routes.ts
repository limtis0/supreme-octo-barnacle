import { FastifyInstance } from "fastify";
import { getChangesFromKlines, getKlines } from "./changesService";
import { BinanceInterval } from "@/lib/enums/binanceInterval";

export default async function changesRoutes(app: FastifyInstance) {
    app.get<{ Querystring: { symbol: string } }>('/api/changes', {
        schema: {
            querystring: {
                type: 'object',
                required: ['symbol'],
                properties: {
                    symbol: { type: 'string' }
                }
            }
        }
    }, async (request, reply) => {
        const { symbol } = request.query;
        
        try {
            const klines = await getKlines({
                symbol: symbol,
                interval: BinanceInterval['5m']
            });

            const changes = await getChangesFromKlines(klines);

            return reply.code(200).send(changes);
        }
        catch (error) {
            if (error instanceof BinanceException) {
                return reply.code(400).send({
                    error: error.message
                });
            }
            return reply.code(500).send({
                error: 'Internal server error'
            });
        }
    });
}
