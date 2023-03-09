import React from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  type: "submit" | "reset" | "button";
  text: string;
  slide_text: string;
  disabled: boolean;
  icon: JSX.Element;
};

const SlideButton = (props: Props) => {
  const { type, text, slide_text, disabled, icon } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className="relative w-full inline-flex items-center justify-center px-8 py-3 mt-4 overflow-hidden font-medium bg-blue-500 transition duration-300 ease-out border-3 rounded-md group"
    >
      {disabled ? (
        <PulseLoader color="#fff" size={10} />
      ) : (
        <>
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
            {icon} &nbsp; {slide_text}
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            {text}
          </span>
          <span className="relative invisible"></span>
        </>
      )}
    </button>
  );
};
4;

export default SlideButton;
