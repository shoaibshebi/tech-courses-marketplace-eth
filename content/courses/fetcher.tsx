import courses from "./index.json";

export const getAllCourses = () => {
  return {
    data: courses,
    courseMap: courses.reduce((a: any, c: any, i: any) => {
      a[c.id] = c;
      a[c.id].index = i;
      return a;
    }, {}),
  };
};
