export default function OverviewCard({ img, title, amount }) {
  return (
    <div className="w-full h-fit relative gap-2 flex flex-col items-center !bg-[#262626] border-[#2e2e2e] border-[2px] rounded-lg cursor-pointer p-2 py-3 text-center">
      {/* <div class="corner tl"></div>
      <div class="corner br"></div> */}
      <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#2e2e2e]">
        <img className="w-[1.5rem] mx-auto" src={img} alt="" />
      </div>
      <p className="text-[25px] font-Poppins font-bold">{amount}</p>
      <h2 className=" font-Oxanium font-semibold text-[16px]">{title}</h2>
    </div>
  );
}
