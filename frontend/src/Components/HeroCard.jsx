import React from 'react'

function HeroCard({IMG, title, desc, miniText,miniIMG, index}) {
    const tag = index === 1;
  return (
    <div className={`${tag ? 'hero-card2' : index === 3 ? 'hero-card3': '' } hero-card h-[35vh] gap-[15px]`}>
      <img src={IMG} alt="" className={` w-[46px]`} />
      <div>
        <h1 className="font-Oxanium font-semibold text-[18px]">{title}</h1>
        <p className="text-[16px] text-white/60">{desc}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img className={tag ? `w-[100px]` : ` w-auto`} src={miniIMG} alt="" />
        <h1 className="tor text-[15px]">{miniText}</h1>
      </div>
    </div>
  );
}

export default HeroCard