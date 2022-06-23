import React from "react";

export default function Hero() {
  return (
    <>
      <section
        className="lg:2/6 text-left"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <div className="text-6xl font-semibold text-gray-900 leading-none">
          Welcome To The World Of Tech & Metaverse
        </div>
        <div className="text-6xl font-semibold text-gray-900 leading-none my-3">
          Only Crypto Allowed To Make Trx
        </div>
        <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">
          You can learn here how to buy virtual properties, programming and
          blockchain the easy way!
        </div>
        <div className="mt-5 sm:mt-8 flex lg:justify-start">
          <div className="rounded-full shadow">
            <a
              href="#courses"
              className="w-full rounded-full flex items-center justify-center px-8 py-3 border-2 border-transparent text-base font-medium text-black border-turk hover:text-white hover:bg-turk md:py-4 md:text-lg md:px-10"
              // style={{ backgroundColor: "#42a586 !important" }}
            >
              Get started
            </a>
          </div>
        </div>
      </section>
      <div
        className="mb-10 relative"
        style={{
          backgroundImage: `url('/meta.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "700px",
          width: "100%",
        }}
      >
        <p
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(50%,-50%)",
            fontSize: "25px",
            color: "white",
          }}
        >
          In futurism and science fiction, the metaverse is a hypothetical
          iteration of the Internet as a single, universal and immersive virtual
          world that is facilitated by the use of virtual reality and augmented
          reality headsets. In colloquial use, a metaverse is a network of 3D
          virtual worlds focused on social connection.
        </p>
      </div>
    </>
  );
}
