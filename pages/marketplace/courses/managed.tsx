// @ts-nocheck
import { useState } from "react";
import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { Button, Message } from "@components/ui/common";
import { ManagedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-turk shadow-md focus:border-turk block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..."
      />
      <Button
        onClick={() => {
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
};

export default function ManagedCourses() {
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const [proofedOwnership, setProofedOwnership] = useState({});
  const { web3, contract } = useWeb3();
  const { managedCourses } = useManagedCourses(account);
  const verifyCourse = (email, { hash, proof }) => {
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    );

    proofToCheck === proof
      ? setProofedOwnership({
          ...proofedOwnership,
          [hash]: true,
        })
      : setProofedOwnership({
          ...proofedOwnership,
          [hash]: false,
        });
  };
  const activateCourse = async (courseHash) => {
    try {
      await contract.methods.activateCourse(courseHash).send({
        from: account.data,
      });
    } catch (e) {
      console.error(e.message);
    }
  };
  if (!account.isAdmin) {
    return null;
  }
  return (
    <>
      <MarketHeader />
      {/* <CourseFilter /> */}
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course: any, i: number) => (
          <ManagedCourseCard key={i} course={course}>
            <VerificationInput
              onVerify={(email) => {
                verifyCourse(email, {
                  hash: course.hash,
                  proof: course.proof,
                });
              }}
            />
            {proofedOwnership[course.hash as keyof unknown] && (
              <div className="mt-2">
                <Message>Verified!</Message>
              </div>
            )}
            {proofedOwnership[course.hash as keyof unknown] === false && (
              <div className="mt-2">
                <Message type="danger">Wrong Proof!</Message>
              </div>
            )}
            {course.state === "purchased" && (
              <div className="mt-2">
                <Button
                  onClick={() => activateCourse(course.hash)}
                  variant="green"
                >
                  Activate
                </Button>
                <Button variant="red">Deactivate</Button>
              </div>
            )}
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}

ManagedCourses.Layout = BaseLayout;
