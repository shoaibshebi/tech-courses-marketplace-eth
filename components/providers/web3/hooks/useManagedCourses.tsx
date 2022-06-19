import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3: any, contract: any) => (account: any) => {
  const swrRes = useSWR(
    () =>
      web3 && contract && account.data && account.isAdmin
        ? `web3/managedCourses/${account.data}`
        : null,
    async () => {
      const courses = [];
      try {
        const courseCount = await contract.methods.getCourseCount().call();

        for (let i = Number(courseCount) - 1; i >= 0; i--) {
          const courseHash = await contract.methods.getCourseHashByIndex(
            String(i)
          );
          const course = await contract.methods.getCourseByHash(courseHash);

          if (course) {
            const normalizedCourse = normalizeOwnedCourse(web3)(
              { hash: "courseHash" },
              course
            );
            // console.log("cc", course, courseHash, normalizedCourse);
            courses.push(normalizedCourse);
          }
        }
      } catch (error) {
        console.log("dobe dobe", error);
      }
      return courses;
    }
  );

  return swrRes;
};
