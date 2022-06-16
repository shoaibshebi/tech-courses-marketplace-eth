import Image from "next/image";
import Link from "next/link";

import { ICourse, IChildrenProp } from "types";

export default function List({
  courses,
  children,
}: {
  courses: ICourse[];
  children: Function;
}) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course, i) => (
        <div key={i}>{children(course)}</div>
      ))}
    </section>
  );
}
