import type { NextPage } from "next";

import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import Walletbar from "@components/ui/web3/walletbar";
import { useAccount } from "@components/hooks/web3/useAccount";

const MarketPlace = ({ courses }: any) => {
  const { account } = useAccount();
  console.log("ac", account);
  return (
    <>
      <div className="py-5">
        <Walletbar address={account?.data} />
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
