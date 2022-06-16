import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  2: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Rinkeby Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const targetNetwork =
  NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as keyof unknown];
console.log("id ", process.env.NEXT_PUBLIC_TARGET_CHAIN_ID);

export const handler = (web3: any, provider: any) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      // const netId = await web3.eth.net.getId();
      const chainId = await web3.eth.getChainId(); //this is the cahin id, in hex format
      return NETWORKS[chainId as keyof unknown];
    }
  );
  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId: string) =>
        mutate(NETWORKS[parseInt(chainId, 16) as keyof unknown])
      );
  }, []);
  return {
    data,
    mutate,
    target: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  };
};
