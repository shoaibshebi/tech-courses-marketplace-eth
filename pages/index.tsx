import type { NextPage } from "next";

import { Hero } from "@components/ui/common";
import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useWeb3 } from "@components/providers";
import { ICourse } from "types";

const Home = ({ courses }: any) => {
  const { connect } = useWeb3();
  return (
    <>
      <Hero />
      <CourseList courses={courses}>
        {(course: ICourse, i: number) => <CourseCard key={i} course={course} />}
      </CourseList>
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
