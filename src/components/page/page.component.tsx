import React from "react";

const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex h-full flex-col justify-center">{children}</div>;
};

export default Page;
