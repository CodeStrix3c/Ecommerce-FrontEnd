export const leafSizeClasses = {
  xs: "w-6 h-6 md:w-8 md:h-8",
  sm: "w-8 h-8 md:w-10 md:h-10",
  md: "w-12 h-12 md:w-16 md:h-16",
  lg: "w-14 h-14 md:w-24 md:h-24",
};

export const titleSizeClasses = {
  sm: "text-md md:text-lg",
  md: "text-2xl md:text-4xl",
  lg: "text-4xl md:text-8xl",
};

export const getLeafColor = (isGray) =>
  isGray ? "text-[var(--color-neutral)]" : "text-[var(--color-primary)]";

export const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  px: 2,
  py: 10,
};

export const loginCardStyle = {
  width: "100%",
  maxWidth: 400,
  borderRadius: 3,
  border: "1px solid",
  borderColor: "grey.400",
  bgcolor: "background.paper",
  px: 4,
  py: 6,
};

export const registerCardStyle = {
  width: "100%",
  borderRadius: 3,
  border: "1px solid",
  borderColor: "grey.400",
  bgcolor: "background.paper",
  px: 4,
  py: 6,
};

export const headerStyle = {
  textAlign: "center",
  color: "primary.secondary",
  fontWeight: "bold",
  mb: 1,
};

export const subHeaderStyle = {
  textAlign: "center",
  color: "text.secondary",
  mb: 3,
};

export const footerTextStyle = {
  textAlign: "center",
  color: "text.secondary",
  mt: 3,
};
