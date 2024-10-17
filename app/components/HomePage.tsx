"use client";
import Lottie from "lottie-react";
import IssueAnimation from "../../public/Animation - 1729186342286.json";

export default function HomePage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Lottie animationData={IssueAnimation} className="sm:w-1/2 sm:h-1/2"/>
    </div>
  );
}
