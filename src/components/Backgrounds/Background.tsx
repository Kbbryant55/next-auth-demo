import React from "react";

type Props = {
  image: string;
};

const Background = (props: Props) => {
  const { image } = props;
  return (
    <div
      className="hidden min-h-screen lg:flex lg:w-1/2  bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default Background;
