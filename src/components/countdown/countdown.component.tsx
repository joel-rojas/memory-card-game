import React from "react";

interface CountDownProps {
  children: React.ReactNode;
}

const CountDown: React.FC<CountDownProps> = ({ children: time }) => {
  let parsedTime = "00";
  if (typeof time === "number" && time >= 0) {
    parsedTime = (time as number) < 10 ? `0${time}` : `${time}`;
  }
  return <h1 className="sm:text-sm lg:text-lg">{parsedTime}</h1>;
};

export default CountDown;
