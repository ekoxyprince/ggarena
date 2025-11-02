function Layout({ children, className }) {
  return (
    <div
      className={`w-full  md:max-w-[87%] sm:max-w-[87%] mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

export default Layout;
