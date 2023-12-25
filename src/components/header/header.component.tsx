import React from "react";
interface HeaderProps {
  children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="container flex justify-around items-center mx-auto p-4">
      {children}
    </div>
  );
};

export default Header;
