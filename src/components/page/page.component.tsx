import React from "react";
interface PageProps {
  children: React.ReactNode;
}
const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="flex h-full flex-col justify-center">
      {children}
    </div>
  );
};

export default Page;
