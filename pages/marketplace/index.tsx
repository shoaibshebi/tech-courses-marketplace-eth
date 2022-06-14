import type { NextPage } from "next";

import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import Walletbar from "@components/ui/web3/walletbar";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useNetwork } from "@components/hooks/web3/useNetwork";

const MarketPlace = ({ courses }: any) => {
  const { account } = useAccount();
  const { network } = useNetwork();
  console.log("network", network);
  console.log("da ", account);
  return (
    <>
      {"account=>" + account}
      {"network=>" + network}
      <div className="py-5">
        <Walletbar address={account?.data} network={network} />
      </div>
      <CourseList courses={courses} />
    </>
  );
};

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

MarketPlace.Layout = BaseLayout;
export default MarketPlace;
