import React from "react";

const CountDown: React.FC<React.PropsWithChildren> = ({ children: time }) => {
  let parsedTime = "00";
  if (typeof time === "number" && time >= 0) {
    parsedTime = (time as number) < 10 ? `0${time}` : `${time}`;
  }
  return <h1 className="text-2xl lg:text-4xl">{parsedTime}</h1>;
};

export default CountDown;
