import React from "react";

const LineLoader = () => {
  return (
    <div className=" h-[3px] w-full">
      <div className="h-full w-1/3 animate-loading-line bg-primary" />
    </div>
  );
};

export default LineLoader;
