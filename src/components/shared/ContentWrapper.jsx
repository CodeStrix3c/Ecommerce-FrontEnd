import useIsMobile from "@/hooks/useInMobile";

export default function ContentWrapper({ children, isCompact = false }) {
  const isMobile = useIsMobile();

  const widthClass = isCompact && !isMobile ? "w-[74vw]" : "w-[93vw]";

  return <div className={`${widthClass} mx-auto`}>{children}</div>;
}
