import axios from "axios";

export const binanceClient = axios.create({
    baseURL: 'https://api.binance.com/api/v3/',
    timeout: 1000
});
