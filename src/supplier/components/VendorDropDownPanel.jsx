import { useLogoutMutation } from "@/features/auth/hooks/useAuthQuery";
import useIsMobile from "@/hooks/useInMobile";
import { useAuth } from "@/providers/AuthContext";
import { removeItemFromLocalStorage } from "@/utils/localStorage";
import {
    Dashboard,
    DashboardCustomize,
    DashboardSharp,
    HandshakeOutlined,
} from "@mui/icons-material";
import {
    Info,
    User,
    HelpCircle,
    UserCheck,
    LogOut,
    Package,
    LayoutDashboard,
    UserPlusIcon,
    PackagePlus,
    FlaskRoundIcon,
    Home,
    LineChart,
    BarChart2,
    BarChart4,
    LineChartIcon,
    LucideLayoutDashboard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VendorDropdownPanel = ({ open, onClose, isSupplierLoggedIn }) => {
    const { logoutAll } = useAuth();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("vendor_token");
    const { mutate: logout } = useLogoutMutation();

    // const handleLogout = () => {
    //   logoutAll();
    //   toast.success("Logged out successfully!");
    //   navigate("/login");
    //   onClose();
    // };

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                logoutAll(); // clear local storage / tokens
                toast.success("Logged out successfully!");
                navigate("/login");
                onClose();
            },
            onError: () => {
                toast.error("Logout failed. Please try again.");
            },
        });
    };

    const vendorLinks = [
        {
            label: "Products",
            path: "/products",
            icon: <Package size={16} />,
        },
        // {
        //   label: "Dashboard",
        //   path: "/dashboard",
        //   icon: <LayoutDashboard size={16} />,
        // },
        {
            label: "Settings",
            path: "/menu",
            icon: <UserCheck size={16} />,
        },
        // {
        //   label: "Help Center",
        //   path: "/vendor/help",
        //   icon: <HelpCircle size={16} />,
        // },
    ];

    return (
        <div
            className={`absolute z-50 right-0 mt-4 w-64 rounded-lg bg-[var(--color-white)] shadow-lg transition-all duration-200 ease-out ${open
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-95 opacity-0"
                }`}
        >
            <div className="flex flex-col py-2">
                {/* <Link
          to="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
        >
          <LucideLayoutDashboard size={16} />
          <span>Analytics</span>
        </Link> */}

                <Link
                    to="/help-center"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-4 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
                >
                    <HelpCircle size={16} />
                    <span>Help Center</span>
                </Link>

                <hr className="my-1 border-[var(--color-black-hover)]" />

                <p className="px-4 py-1 text-xs uppercase tracking-wide opacity-60">
                    Vendor
                </p>

                {vendorLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}

                <hr className="my-1 border-[var(--color-black-hover)]" />

                {/* ORDERS */}
                <Link
                    to="/orders"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
                >
                    <Package size={16} />
                    <span>My Orders</span>
                </Link>

                <hr className="my-1 border-[var(--color-black-hover)]" />

                {/* ACCOUNT */}
                {isLoggedIn ? (
                    <>
                        <Link
                            to="/supplier-profile"
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
                        >
                            <User size={16} />
                            <span>Profile</span>
                        </Link>

                        <div
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </div>
                    </>
                ) : (
                    <Link
                        to="/login"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
                    >
                        <User size={16} />
                        <span>Log in / Sign up</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default VendorDropdownPanel;