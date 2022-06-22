import React from "react";

export default function index() {
  return (
    <footer className="bg-turk pt-1">
      <div className="container mx-auto px-6">
        <div className="mt-5 flex flex-col items-center">
          <div className="py-6">
            <p className="mb-6 text-white text-sm text-primary-2 font-bold">
              © {new Date().getFullYear()} M. Shoaib
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
