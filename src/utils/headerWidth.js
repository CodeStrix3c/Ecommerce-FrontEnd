const headerWidthMap = {
  default: "93vw",
  placePage: "74vw",
  sprayPage: "74vw",
};

export const getHeaderWidth = (pathname) => {
  if (/^\/place\/\d+/.test(pathname)) return headerWidthMap.placePage;
  if (pathname === "/spray") return headerWidthMap.sprayPage;
  return headerWidthMap.default;
};
