import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HelpButton() {
    const navigate = useNavigate();
  

  return (
    <div className="flex justify-end w-full pt-4 pr-10 ">
      <button className="flex items-center text-[var(--color-black)] hover:text-[var(--color-secondary)] text-sm sm:text-base"
      onClick={()=>{navigate("/help-center")}}
      >
        <HelpCircle size={18} className="mr-1" />
        Help
      </button>
    </div>
  );
}
