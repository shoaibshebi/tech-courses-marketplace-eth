import type { NextPage } from "next";

import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useWeb3 } from "@components/providers";

const Home = ({ courses }: any) => {
  const { connect } = useWeb3();
  return (
    <>
      <Hero />
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

Home.Layout = BaseLayout;
export default Home;
