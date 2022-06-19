import useSWR, { mutate } from "swr";

export const COURSE_PRICE = 15;

const URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";
const fetcher = async (url: string) => {
  const data = await fetch(url);
  const json = await data.json();
  return json.market_data.current_price.usd ?? null;
};
export const useEthPrice = () => {
  const { data, ...rest } = useSWR(URL, fetcher, { refreshInterval: 60000 });
  const perItem = (data && (COURSE_PRICE / Number(data)).toFixed(6)) ?? null;
  return { eth: { data, perItem, ...rest } };
};
