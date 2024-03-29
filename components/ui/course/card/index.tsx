// @ts-nocheck
import Image from "next/image";
import Link from "next/link";

export default function Card({
  course,
  Footer,
  disabled,
}: {
  course: any;
  Footer: JSX.Element;
  disabled: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex h-full">
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            src={course.coverImage}
            layout="fixed"
            width="200"
            height="230"
            alt={course.title}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-turk font-semibold">
            {course.type}
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className="h-12 block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {course.description}
          </p>
          {Footer && <Footer />}
        </div>
      </div>
    </div>
  );
}
