import React from "react";

interface HomeProps {
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <div>
      <h1>Home</h1>
      {children}
    </div>
  );
};

export default Home;
