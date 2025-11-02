import React from "react";

function Section({ children, className }) {
  return (
    <section
      className={` ${className} px-[10px] py-[5px] md:px-[60px] md:py-[30px]`}
    >
      {children}
    </section>
  );
}

export default Section;
