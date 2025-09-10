import { Asterisk } from "lucide-react";

const RequiredLabel = ({ label }) => (
  <span className="flex items-center">
    {label}
    <Asterisk size={12} className="ml-1 text-[var(--color-secondary)]" />
  </span>
);
export default RequiredLabel;
