// @ts-nocheck

import { Hero } from "@components/ui/common";
import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useWeb3 } from "@components/providers";
import { ICourse } from "types";
import { useState } from "react";
import { WalletChatWidget } from "react-wallet-chat-v0";
import "react-wallet-chat-v0/dist/index.css";

const Home = ({ courses }: any) => {
  const [widgetState, setWidgetState] = useState({
    chatAddr: "0x17FA0A61bf1719D12C08c61F211A063a58267A19",
    isOpen: false,
  });
  const { connect } = useWeb3();
  return (
    <>
      <Hero />
      <CourseList courses={courses}>
        {(course: ICourse, i: number) => <CourseCard key={i} course={course} />}
      </CourseList>
      <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <WalletChatWidget widgetState={widgetState} />
      </div>
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

Home.Layout = BaseLayout;
export default Home;
