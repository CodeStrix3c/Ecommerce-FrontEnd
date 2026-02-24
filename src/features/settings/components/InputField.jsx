import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({ label, type = "text", value, onChange, name }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="text-sm font-medium text-[var(--color-black)]">
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword && show ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full mt-1 p-2 pr-10 rounded
                     bg-[var(--color-white)]
                     border border-[var(--color-gray)]
                     text-[var(--color-black)]
                     focus:outline-none
                     focus:border-[var(--color-primary)]
                     focus:ring-1 focus:ring-[var(--color-primary)]"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-[var(--color-black)]
                       opacity-60 hover:opacity-100 transition"
          >
            {show ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;