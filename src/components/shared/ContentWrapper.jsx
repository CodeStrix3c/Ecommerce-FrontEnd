import useIsMobile from "@/hooks/useInMobile";

export default function ContentWrapper({ children, compactScreen = false }) {
  const isMobile = useIsMobile();

  const widthClass = compactScreen && !isMobile ? "w-[74vw]" : "w-[93vw]";

  return <div className={`${widthClass} mx-auto`}>{children}</div>;
}
