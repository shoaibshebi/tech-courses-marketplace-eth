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
// "coverImage": "https://i0.wp.com/www.iedunote.com/img/33350/how-is-blockchain-distinguished-from-bitcoin.jpg",
