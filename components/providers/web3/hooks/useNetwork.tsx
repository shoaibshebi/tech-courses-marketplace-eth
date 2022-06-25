import { useEffect } from "react";
import useSWR, { mutate } from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  2: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

let targetNetwork = "";

if (process.env.NODE_ENV === "production") {
  targetNetwork =
    NETWORKS[process.env.NEXT_PUBLIC_PROD_TARGET_CHAIN_ID as keyof unknown];
}

if (process.env.NODE_ENV !== "production") {
  targetNetwork =
    NETWORKS[process.env.NEXT_PUBLIC_DEV_TARGET_CHAIN_ID as keyof unknown];
}

export const handler = (web3: any, provider: any) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      // const netId = await web3.eth.net.getId();
      const chainId = await web3.eth.getChainId(); //this is the cahin id, in hex format
      if (!chainId) {
        throw new Error("Cannot retreive network. Please refresh the browser.");
      }
      return NETWORKS[chainId as keyof unknown];
    }
  );
  useEffect(() => {
    const mutator = (chainId: any) =>
      mutate(NETWORKS[parseInt(chainId, 16) as keyof unknown]);
    provider?.on("chainChanged", mutator);

    return () => {
      provider?.removeListener("chainChanged", mutator);
    };
  }, []);
  return {
    data,
    mutate,
    target: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  };
};
