import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

export const handler = (web3: any, provider: any) => () => {
  const { mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const netId = await web3.eth.net.getId();
      return netId;
    }
  );
  useEffect(() => {
    provider &&
      provider.on("chainChanged", (netId: string | Number) => mutate(netId));
  }, []);
  return {
    network: {
      mutate,
      ...rest,
    },
  };
};
