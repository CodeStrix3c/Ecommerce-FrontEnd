const headerWidthByLayout = {
  wide: "93vw",
  narrow: "74vw",
};

export const getHeaderWidthByPath = (path) => {
  const firstPathSegment = path.split("/")[1];

  return firstPathSegment === "home"
    ? headerWidthByLayout.wide
    : headerWidthByLayout.narrow;
};
