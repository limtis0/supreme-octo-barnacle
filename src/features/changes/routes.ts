import { FastifyInstance } from "fastify";
import { getChanges } from "./changesService";
import { BinanceInterval } from "@/lib/enums/binanceInterval";

export default async function changesRoutes(app: FastifyInstance) {
    app.get<{ Querystring: { symbol: string, startTime?: number, endTime?: number } }>('/api/changes', {
        schema: {
            querystring: {
                type: 'object',
                required: ['symbol', 'interval'],
                properties: {
                    symbol: { type: 'string' },
                    startTime: { type: 'integer' },
                    endTime: { type: 'integer' }
                }
            }
        }
    }, async (request, reply) => {
        const { symbol, startTime, endTime } = request.query;

            const object = await getChanges({
                symbol: symbol,
                startTime: startTime,
                interval: BinanceInterval["5m"],
                endTime: endTime
            })

            return reply.code(200).send(object);
    });
}
