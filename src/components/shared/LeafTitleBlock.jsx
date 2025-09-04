import leftleaf from "/assets/images/left-leaf.png";
import rightleaf from "/assets/images/right-leaf.png";

export default function LeafTitleBlock({
  title = "Guest Favourite",
  subtitle = "",
  leafSize = "md",
  titleSize = "md",
  isGray = false,
  titleColor = "text-[#222222]",
}) {
  const leafSizeClasses = {
    xs: "w-6 h-8 md:w-8 md:h-10",
    sm: "w-8 h-10 md:w-10 md:h-12",
    md: "w-12 h-14 md:w-16 md:h-20",
    lg: "w-14 h-28 md:w-24 md:h-44 opacity-90",
  };

  const titleSizeClasses = {
    sm: "text-md md:text-lg",
    md: "text-2xl md:text-4xl",
    lg: "text-4xl md:text-8xl",
  };

  return (
    <div className="flex items-center justify-center space-x-2 text-center">
      <img
        src={leftleaf}
        alt="Left Leaf Icon"
        className={`${leafSizeClasses[leafSize]} ${isGray ? "grayscale" : ""} mt-1 md:mt-2`}
      />

      <h1 className={`font-bold ${titleSizeClasses[titleSize]} ${titleColor} `}>
        {title}
      </h1>

      <img
        src={rightleaf}
        alt="Right Leaf Icon"
        className={`${leafSizeClasses[leafSize]} ${isGray ? "grayscale" : ""} mt-1 md:mt-2`}
      />

      {subtitle && (
        <p className="text-sm text-gray-600 hidden md:inline-block max-w-xs">
          {subtitle}
        </p>
      )}
    </div>
  );
}
