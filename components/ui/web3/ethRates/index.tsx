import { useEthPrice } from "@components/hooks/useEthPrice";
import { Loader } from "@components/ui/common";
import Image from "next/image";
import React from "react";

export default function EthRates() {
  const { eth } = useEthPrice();
  return (
    <div className="grid grid-cols-2 my-5">
      <div className="flex  text-center">
        <div className="p-10 border drop-shadow rounded-md flex flex-col items-center content-center w-full">
          <div className="flex items-center">
            {eth.data ? (
              <>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
                <span className="text-2xl font-bold">= {eth.data}$</span>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Loader size="md" />
              </div>
            )}
          </div>
          <p className="text-xl text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md flex flex-col items-center content-center w-full">
          <div className="flex items-center ">
            {eth.data ? (
              <>
                <span className="text-2xl font-bold">{eth.perItem}</span>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
                <span className="text-2xl font-bold">=$</span>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Loader size="md" />
              </div>
            )}
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
}
