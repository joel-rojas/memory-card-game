import React from "react";
interface HeaderProps extends React.PropsWithChildren {
  flex?: number;
}
const Header: React.FC<HeaderProps> = ({ children, flex = -1 }) => {
  return (
    <header
      data-testid="header"
      className={`container flex justify-around items-center mx-auto p-4 ${
        flex >= 0 ? `flex-${flex}` : ""
      }`}
    >
      {children}
    </header>
  );
};

export default Header;
