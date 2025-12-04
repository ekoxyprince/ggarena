import React from "react";
import Good from "../../assets/images/Good.png";

const Success = () => {
  return (
    <div className="min-h-screen bg-background flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-secondary rounded-lg shadow-2xl border-2 border-primary p-10 flex flex-col items-center gap-8">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
          <img
            src={Good}
            alt="success-icon"
            className="w-full h-full object-cover"
            style={{
              imageRendering: "crisp-edges",
            }}
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-Mont font-bold text-primary mb-3">
            Thank You!
          </h1>
          <p className="text-xl font-Mont font-semibold text-white uppercase tracking-wide">
            Your order is confirmed
          </p>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
      </div>
    </div>
  );
};

export default Success;
