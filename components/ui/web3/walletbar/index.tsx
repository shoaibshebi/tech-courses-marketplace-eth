import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";

export default function Walletbar() {
  const { account, network } = useWalletInfo();
  return (
    <section className="text-white bg-turk rounded">
      <div className="p-8">
        <h1 className="text-base xs:text-xl break-words">
          Hello, {account.data} 👋
        </h1>
        <h2 className="subtitle mb-5 text-sm xs:text-base">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button className="mr-2 text-sm xs:text-lg p-2" variant="white">
              <a
                href="https://www.youtube.com/watch?v=YVgfHZMFFFQ"
                target="_blank"
              >
                Don't have account on metamask ? Click here
              </a>
            </Button>
          </div>
          <div>
            <div>
              {!network.isSupported && network.hasInitialResponse && (
                <div className="bg-red-400 p-4 rounded-lg">
                  <div>Connected to wrong network</div>
                  <div>
                    Connect to: {` `}
                    <strong className="text-2xl">{network.target}</strong>
                  </div>
                </div>
              )}
              {network.data && (
                <div>
                  <span>Currently on network: </span>
                  <strong className="text-2xl">{network.data}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
