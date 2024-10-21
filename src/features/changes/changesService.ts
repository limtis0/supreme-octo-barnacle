import { binanceClient } from "@/lib/binanceClient";
import { BinanceInterval } from "@/lib/enums/binanceInterval";

export async function getChanges(params: {
    symbol: string;
    interval: BinanceInterval;
    startTime?: number;
    endTime?: number;
    limits?: number
}) {

    const response = await binanceClient.get<(number|string)[][]>('klines', {
        params: params
    });

    return response.data.map(kline => {
        return {
            openTime: kline[0] as number,
            openPrice: kline[1] as string,
            highPrice: kline[2] as string,
            lowPrice: kline[3] as string,
            closePrice: kline[4] as string,
            closeTime: kline[6] as number,
        };
    });
}
