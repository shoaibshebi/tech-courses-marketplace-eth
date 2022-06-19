import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler =
  (web3: any, contract: any) => (courses: any, account: any) => {
    const swrRes = useSWR(
      () =>
        web3 && contract && account ? `web3/ownedCourses/${account}` : null,
      async () => {
        const ownedCourses = [];
        for (let i = 0; i < courses.length; i++) {
          const course = courses[i];

          if (!course.id) {
            continue;
          }

          const courseHash = createCourseHash(web3)(String(course.id), account);

          const ownedCourse = await contract.methods
            .getCourseByHash(courseHash)
            .call();

          if (
            ownedCourse.owner !== "0x0000000000000000000000000000000000000000"
          ) {
            const normalizedCourse = normalizeOwnedCourse(web3)(
              course,
              ownedCourse
            );
            ownedCourses.push(normalizedCourse);
          }
        }

        return ownedCourses;
      }
    );
    return swrRes;
  };
