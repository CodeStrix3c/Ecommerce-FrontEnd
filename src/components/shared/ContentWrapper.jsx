export default function ContentWrapper({ children, variant = "default" }) {
  const widthClass = variant === "place" ? "w-[74vw]" : "w-[93vw]";
  return <div className={`${widthClass} mx-auto`}>{children}</div>;
}
