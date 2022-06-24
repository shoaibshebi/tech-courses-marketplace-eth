import { useEffect, useState } from "react";
import useSWR from "swr";

const adminAddresses = {
  // "0xBba3a1b26E31edCC73326fbb617c17F63Df1B09f": true, // this key is keccak256 decoded, below is encoded
  "0x8e061f8c33d9dc1336e0ccfdb645b55382aae1ca0bb43714f2bcd38e47ab088c": true,
};

export const handler = (web3: any, provider: any) => () => {
  const { mutate, data, ...rest } = useSWR(
    () => (web3 !== null ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      if (!account) {
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      }
      return account;
    }
  );
  console.log("keccak256", web3?.utils?.keccak256(data ?? ""), data);

  useEffect(() => {
    const mutator = (accounts: any) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    isAdmin:
      (data && adminAddresses[web3?.utils?.keccak256(data) as keyof unknown]) ??
      false,
    mutate,
    ...rest,
  };
};
