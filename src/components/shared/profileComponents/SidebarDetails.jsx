import { ChevronDown } from "lucide-react";

// Component for a link/item in the left sidebar
const SidebarDetails = ({ title, subtitle, isCheckbox = false, icon: Icon, isSelected = false }) => (
  <div className="flex items-center justify-between py-2 px-6 transition-colors  rounded-lg">
    <div className="flex items-center space-x-4">
      {isCheckbox ? (
        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
          {isSelected && <div className="w-2 h-2 bg-green-600 rounded-full" />}
        </div>
      ) : (
        Icon && <Icon className="w-5 h-5 text-gray-600" />
      )}
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{title}</span>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
    </div>
  </div>
);
export default SidebarDetails;