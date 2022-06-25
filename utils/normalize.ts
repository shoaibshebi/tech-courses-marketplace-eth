// @ts-nocheck
export const COURSE_STATES = {
  0: "purchased",
  1: "activated",
  2: "deactivated",
};

export const normalizeOwnedCourse = (web3) => (course, ownedCourse) => {
  return {
    ...course,
    ownedCourseId: String(ownedCourse.id),
    proof: ownedCourse.proof,
    owned: ownedCourse.owner,
    price: 32,
    state: COURSE_STATES[ownedCourse.state as keyof unknown],
  };
};
