import React from "react";
interface HeaderProps {
  children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="container flex justify-center mx-auto">{children}</div>
  );
};

export default Header;
