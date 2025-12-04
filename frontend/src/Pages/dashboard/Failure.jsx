import React from "react";
import Warning from "../../assets/images/Warning.png";
import CustomButton from "../../Components/CustomButton";

const Failure = () => {
  const text = "Try Again";

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-lg  rounded-lg shadow-2xl border-2 border-primary p-10 flex flex-col items-center gap-8">
        <div className="w-40 h-40 rounded-full overflow-hidden bg-red-600 border-4 border-primary shadow-lg flex items-center justify-center">
          <img
            src={Warning}
            alt="warning-icon"
            className="w-20 h-20 object-cover"
            style={{
              imageRendering: "crisp-edges",
            }}
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-Mont font-bold text-primary mb-3">
            Payment Failed
          </h1>
          <p className="text-xl font-Mont font-semibold text-white uppercase tracking-wide leading-relaxed">
            The payment was unsuccessful due to an abnormality. Please try again
            later or use another payment method.
          </p>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-red-500 to-primary rounded-full"></div>
        <div className="flex flex-col items-center gap-4">
          <CustomButton
            text={text}
            className="bg-primary text-secondary w-[160px] text-center font-Mont font-bold py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          />
          <p className="text-white font-Mont text-sm">Need help?</p>
        </div>
      </div>
    </div>
  );
};

export default Failure;
