const headerWidthMap = {
  default: "93vw",
  placePage: "74vw",
  sprayPage: "74vw",
  cartPage: "74vw",
};

export const getHeaderWidth = (p) => {
  const pathname = p.split("/")[1];
  if (pathname === "place") return headerWidthMap.placePage;
  if (pathname === "spray") return headerWidthMap.sprayPage;
  if (pathname === "cart") return headerWidthMap.cartPage;
  return headerWidthMap.default;
};
