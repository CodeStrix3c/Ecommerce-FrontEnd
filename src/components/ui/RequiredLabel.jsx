import { Asterisk } from 'lucide-react';

const RequiredLabel = ({ label }) => (
  <span className="flex items-center">
    {label}
    <Asterisk size={12} className="ml-1 text-red-500" />
  </span>
);
export default RequiredLabel;
