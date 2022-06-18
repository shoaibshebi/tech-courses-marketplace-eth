// import contract from "truffle-contract";
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, web3: object) => {
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

// import contract from "truffle-contract";

// export const loadContract = async (name: string, provider: object) => {
//   const res = await fetch(`/contracts/${name}.json`);

//   const Artifact = await res.json();

//   const _contract = window.TruffleContract(Artifact);
//   _contract.setProvider(provider);

//   let deployedContract = null;
//   try {
//     deployedContract = await _contract.deployed();
//   } catch (error) {
//     console.log(`Contract ${name} cant be loaded.`);
//   }

//   return deployedContract;
// };
