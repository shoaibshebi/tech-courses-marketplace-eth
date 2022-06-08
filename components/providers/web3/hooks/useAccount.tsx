export const handler = (web3: any) => () => {
  return {
    account: web3 ? "Test Account" : "null!!!",
  };
};
