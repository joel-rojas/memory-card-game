import React from "react";

interface HeadlineProps {
  children: React.ReactNode;
  clsList?: string;
}

const Headline: React.FC<HeadlineProps> = ({ children, clsList = "" }) => {
  return (
    <h1 className={`mb-6 text-center ${clsList || "text-2xl  md:text-4xl"}`}>
      {children}
    </h1>
  );
};

export default Headline;
