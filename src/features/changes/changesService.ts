import { binanceClient } from "@/lib/binanceClient";
import { BinanceInterval } from "@/lib/enums/binanceInterval";

type KlinesResponse = (number | string)[][];
type KlinesError =  { code: number, msg: string };

function isKlinesError(obj: KlinesResponse | KlinesError): obj is KlinesError {
    return (obj as unknown as any)['msg'] !== undefined;
}

export async function getChanges(params: {
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
            openPrice: kline[1] as string,
            highPrice: kline[2] as string,
            lowPrice: kline[3] as string,
            closePrice: kline[4] as string,
            closeTime: kline[6] as number,
        };
    });
}
