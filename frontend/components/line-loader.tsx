import React from "react";

const LineLoader = () => {
    return (
        <>
            <style>
                {`
          @keyframes gradientMove {
            from {
              background-position: 100% 50%;
            }
            to {
              background-position: 0% 50%;
            }
          }
        `}
            </style>

            <div className="w-full h-0.75 relative overflow-hidden">
                <div
                    className="
            absolute inset-0 h-[4.8px]
            bg-[linear-gradient(21deg,rgba(255,255,255,0)_0%,rgb(55,121,196)_48%,rgba(255,255,255,0)_100%)]
           bg-size-[300%_100%]
            animate-[gradientMove_1.2s_ease-in-out_infinite_alternate]
          "
                />
            </div>
        </>
    );
};

export default LineLoader;
