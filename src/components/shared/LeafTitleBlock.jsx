import {
  leafSizeClasses,
  titleSizeClasses,
  getLeafColor,
} from "@/constants/theme";
import { Leaf } from "lucide-react";

export default function LeafTitleBlock({
  title = "Guest Favourite",
  subtitle = "",
  leafSize = "md",
  titleSize = "md",
  isGray = false,
  titleColor = "text-[var(--color-black)]",
}) {
  const leafColor = getLeafColor(isGray);

  return (
    <div className="flex flex-col items-center text-center space-y-1">
      <div className="flex items-center space-x-2">
        <Leaf
          className={`${leafSizeClasses[leafSize]} ${leafColor}`}
          strokeWidth={1}
        />
        <h1
          className={`font-bold ${titleSizeClasses[titleSize]} ${titleColor}`}
        >
          {title}
        </h1>
        <Leaf
          className={`${leafSizeClasses[leafSize]} ${leafColor}`}
          strokeWidth={1}
        />
      </div>

      {subtitle && (
        <p className="text-sm text-[var(--color-black)]">{subtitle}</p>
      )}
    </div>
  );
}
