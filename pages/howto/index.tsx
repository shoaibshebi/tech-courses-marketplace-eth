import { BaseLayout } from "@components/ui/layout";

export default function Howto() {
  return (
    <>
      <div style={{ maxWidth: "80rem" }} className="my-4 mb-10 flex">
        <img src="/how to.jpeg" />
        <img src="/how to.jpeg" />
      </div>
      <div>
        <div className="text-center">
          <p className="text-3xl font-semibold text-gray-900 leading-none">
            Steps to purchase the course:
          </p>
          <p className="text-sm leading-none flex justify-center">
            These are the instructions to buy course on website running at live
            server at Goerli network
          </p>
        </div>
        <div className="list-container">
          <ol className="list">
            <li className="item">
              First of all install metamask extension in your browser
            </li>
            <li className="item">
              Create account on `metamask`, save you secret key and login to
              metamask.
            </li>
            <li className="item">
              You should have amount in you Goerli network account to buy the
              course
            </li>
            <li className="item">
              This is all the process you have to follow. If found any issue, DM
              me on @shoaib_shebi twitter
            </li>
            <p>Enjoy 🥂</p>
          </ol>
        </div>
      </div>
      <div>
        <div className="text-center">
          <p className="text-3xl font-semibold text-gray-900 leading-none ">
            Steps to purchase the course:
          </p>
          <p className="text-sm leading-none">
            These are the instructions for local setup on you system at Ganache
            network
          </p>
        </div>
        <div className="list-container">
          <ol className="list">
            <li className="item">
              <span>
                First of all you have to install the `metamask` extension in
                your browser and have an account on it
              </span>
            </li>
            <li className="item">
              Create account on `metamask`, save you secret key and login to
              metamask.
            </li>
            <li className="item">
              Install truffle setup on you PC using this command "npm install -g
              truffle" and then install `Ganache` on you system{" "}
            </li>
            <li className="item">
              Now go into project dir and to deploy the solidity smart contracts
              run command "truffle migrate"
            </li>
            <li className="item">
              Now run the `Ganache` and to connect it with `metamask` and to
              import account into the `metamask` please follow{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/watch?v=lv4HEyiw4EQ"
              >
                this tutorial
              </a>
            </li>
            <li className="item">
              This is all the process you have to follow. If found any issue,
              mail me on shoaib4030891@gmail.com
            </li>
            <p>Enjoy 🥂</p>
          </ol>
        </div>
      </div>
    </>
  );
}
Howto.Layout = BaseLayout;
