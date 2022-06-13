import { useEffect, useState } from "react";

export const handler = (web3: any) => () => {
  const [account, setAccount] = useState();
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3 && getAccount();
  }, [web3]);
  return {
    account,
  };
};
