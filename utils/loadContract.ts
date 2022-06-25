let NETWORK_ID: any = "";
if (process.env.NODE_ENV === "production") {
  NETWORK_ID = process.env.PROD_NEXT_PUBLIC_NETWORK_ID;
}
if (process.env.NODE_ENV !== "production") {
  NETWORK_ID = process.env.DEV_NEXT_PUBLIC_NETWORK_ID;
}

export const loadContract = async (name: string, web3: { eth: any }) => {
  const res = await fetch(`/contracts/${name}.json`);

  const Artifact = await res.json();

  let contract = null;
  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
  } catch (error) {
    console.log(`Contract ${name} cant be loaded.`);
  }

  return contract;
};
