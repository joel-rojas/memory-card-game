import React from "react";
interface HeaderProps {
  children: React.ReactNode;
  flex?: number;
}
const Header: React.FC<HeaderProps> = ({ children, flex = -1 }) => {
  return (
    <div
      className={`container flex justify-around items-center mx-auto p-4 ${
        flex >= 0 ? `flex-${flex}` : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Header;
