import { ICourse } from "types";

export default function List({
  courses,
  children,
}: {
  courses: ICourse[];
  children: Function;
}) {
  return (
    <>
      <h4 className="text-4xl font-semibold text-gray-900 leading-none my-9">
        Course List 👇
      </h4>
      <section
        className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5"
        id="courses"
      >
        {courses.map((course, i) => (
          <div key={i}>{children(course)}</div>
        ))}
      </section>
    </>
  );
}
