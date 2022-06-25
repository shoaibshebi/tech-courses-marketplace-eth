import { useState } from "react";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

export default function Marketplace({ courses }: { courses: any }) {
  const { web3, contract } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  const _courses = courses.map((x) => {
    return {
      ...x,
      purchased: ownedCourses?.data?.some((item) => item.id === x.id),
    };
  });

  const purchaseCourse = async (order: any) => {
    const hexCourseId = web3.utils.utf8ToHex(String(selectedCourse.id));

    const orderHash = web3.utils.soliditySha3(
      {
        type: "bytes16",
        value: hexCourseId,
      },
      { type: "address", value: account.data }
    );

    const emailHash = web3.utils.sha3(order.email);

    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    const value = web3.utils.toWei(String(order.price));

    try {
      await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value });
      setSelectedCourse(null);
    } catch (error) {
      alert("Purchase Course: operation failed");
      setSelectedCourse(null);
    }
  };
  const dropPurchasedCourse = async (id: any) => {
    const hexCourseId = web3.utils.utf8ToHex(String(id));
    try {
      await contract.methods
        .dropCourse(hexCourseId)
        .send({ from: account.data });
    } catch (error) {
      alert("Drop Course: operation failed");
    }
  };

  return (
    <>
      <MarketHeader />
      <CourseList courses={_courses}>
        {(course: any) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={(): any => (
              <div className="mt-4">
                {course.purchased ? (
                  <Button
                    onClick={() => dropPurchasedCourse(course.id)}
                    disabled={!canPurchaseCourse}
                    variant="red"
                  >
                    Drop
                  </Button>
                ) : (
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    disabled={!canPurchaseCourse}
                    variant={"lightPurple"}
                  >
                    Purchase
                  </Button>
                )}
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onSubmit={purchaseCourse}
        />
      )}
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
