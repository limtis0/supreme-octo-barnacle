import { binanceClient } from "@/lib/binanceClient";
import { BinanceInterval } from "@/lib/enums/binanceInterval";

type KlinesResponse = (number | string)[][];
type KlinesError =  { code: number, msg: string };

function isKlinesError(obj: KlinesResponse | KlinesError): obj is KlinesError {
    return (obj as unknown as any)['msg'] !== undefined;
}

export async function getKlines(params: {
    symbol: string;
    interval: BinanceInterval;
    startTime?: number;
    endTime?: number;
    limits?: number
}) {
    const response = await binanceClient.get<KlinesResponse | KlinesError>('klines', {
        params: params,
        validateStatus: (status) => status === 200 || status === 400
    });

    const data = response.data;

    if (isKlinesError(data)) {
        throw new Error(data.msg);
    }

    return data.map(kline => {
        return {
            openTime: kline[0] as number,
            closeTime: kline[6] as number,
            openPrice: Number(kline[1] as string),
            closePrice: Number(kline[4] as string),
            lowPrice: Number(kline[3] as string),
            highPrice: Number(kline[2] as string),
        };
    });
}

export async function getChangesFromKlines(klines: Awaited<ReturnType<typeof getKlines>>) {
    let startNode = klines[klines.length - 1];
    let currentPrice = startNode.openPrice;

    const result: { changeAmount: number, price: number, timestamp: number}[] = [
        {
            changeAmount: 0,
            price: currentPrice,
            timestamp: startNode.openTime
        }
    ];
    
    for (let i = klines.length - 1; i >= 0; i--) {
        const change = klines[i];
        const difference = Number((change.openPrice - currentPrice).toFixed(6));

        if (difference !== 0) {
            result.push({
                changeAmount: difference,
                price: change.openPrice,
                timestamp: change.openTime
            });
        }
    }

    return result;
}
