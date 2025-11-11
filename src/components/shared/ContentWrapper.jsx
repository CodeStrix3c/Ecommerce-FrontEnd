import useIsMobile from "@/hooks/useInMobile";

export default function ContentWrapper({
  children,
  compactScreen = false,
  topSpacing = false,
}) {
  const isMobile = useIsMobile();

  const widthClass = compactScreen && !isMobile ? "w-[74vw]" : "w-[93vw]";
  const topMarginClass = topSpacing ? "top-spacing" : "";

  return (
    <div className={`${widthClass} ${topMarginClass} mx-auto`}>{children}</div>
  );
}
