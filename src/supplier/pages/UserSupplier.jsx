import React, { useEffect, useState } from "react";
import {
    Pencil,
    User,
    Mail,
    Phone,
    Calendar,
    Users,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";
import {
    useUserProfile,
    useUpdateUserProfile,
} from "@/hooks/Vendor/useUserProfile";

export default function UserSupplier() {
    const userId = Number(localStorage.getItem("userId"));
    const { data, refetch } = useUserProfile(userId);
    const { mutate: updateProfile, isPending } = useUpdateUserProfile();

    const [profileId, setProfileId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState("");

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        profilePic: "",
        password: "",
        confirmPassword: "",
    });

    const [initialForm, setInitialForm] = useState(null);

    useEffect(() => {
        if (data) {
            const filled = {
                fullName: data.fullName || "",
                email: data.email || "",
                phone: data.phone || "",
                age: data.age || "",
                gender: data.gender || "",
                profilePic: data.profilePic || "",
                password: "",
                confirmPassword: "",
            };
            setProfileId(data.id);
            setForm(filled);
            setInitialForm(filled);
            setIsEditing(false);
            setErrors({});
        }
    }, [data]);

    const handleChange = (e) => {
        setIsEditing(true);
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsEditing(true);
        setForm((prev) => ({
            ...prev,
            profilePic: URL.createObjectURL(file),
        }));
    };

    const validate = () => {
        const err = {};
        if (!form.password) err.password = "Password is required";
        if (!form.confirmPassword)
            err.confirmPassword = "Confirm password is required";
        if (form.password !== form.confirmPassword)
            err.confirmPassword = "Passwords do not match";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        updateProfile(
            {
                id: profileId,
                payload: {
                    ...form,
                    age: Number(form.age),
                },
            },
            {
                onSuccess: () => {
                    setToast("Profile updated successfully");
                    setIsEditing(false);
                    refetch();
                    setTimeout(() => setToast(""), 2500);
                },
            }
        );
    };

    const handleCancel = () => {
        setForm(initialForm);
        setErrors({});
        setIsEditing(false);
    };

    return (
        <div className="bg-white min-h-screen  pt-[66px] md:pt-[94px] pb-12">
            {toast && (
                <div className="fixed top-5 right-5 bg-green-600 text-white  rounded-lg z-50">
                    {toast}
                </div>
            )}

            <div className="mx-auto w-full max-w-4xl">

                <div className="px-6 py-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">

                        {/* Avatar */}
                        <div className="flex justify-center sm:justify-start">
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border">
                                    <img
                                        src={form.profilePic || "/default-avatar.png"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <label
                                    htmlFor="profilePicInput"
                                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
                                >
                                    <Pencil size={14} />
                                </label>

                                <input
                                    id="profilePicInput"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>


                        <div className="mt-4 sm:mt-0 text-center sm:text-left flex-1">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                {form.fullName || "Your Name"}
                            </h1>
                            <p className="text-sm text-black">
                                {form.email || "your@email.com"}
                            </p>
                            <span className="inline-block mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                                User Account
                            </span>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LabeledInput label="Full Name" icon={<User size={16} />} name="fullName" value={form.fullName} onChange={handleChange} />
                    <LabeledInput label="Age" icon={<Calendar size={16} />} name="age" type="number" value={form.age} onChange={handleChange} />
                    <LabeledInput label="Email" icon={<Mail size={16} />} name="email" value={form.email} onChange={handleChange} />
                    <LabeledSelect label="Gender" name="gender" value={form.gender} onChange={handleChange} />
                    <LabeledInput label="Phone" icon={<Phone size={16} />} name="phone" value={form.phone} onChange={handleChange} full />
                    <PasswordField label="New Password" value={form.password} show={showPassword} toggle={() => setShowPassword(!showPassword)} onChange={(v) => handleChange({ target: { name: "password", value: v } })} error={errors.password} />
                    <PasswordField label="Confirm Password" value={form.confirmPassword} show={showConfirmPassword} toggle={() => setShowConfirmPassword(!showConfirmPassword)} onChange={(v) => handleChange({ target: { name: "confirmPassword", value: v } })} error={errors.confirmPassword} />
                </div>

                {/* ===== ACTIONS ===== */}
                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={handleSave}
                        disabled={!isEditing || isPending}
                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg disabled:opacity-40"
                    >
                        {isPending ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={!isEditing}
                        className="flex-1 border py-2.5 rounded-lg disabled:opacity-40"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}



const LabeledInput = ({ label, icon, name, value, onChange, type = "text", full }) => (
    <div className={full ? "md:col-span-2" : ""}>
        <label className="block mb-1.5 text-sm font-medium text-black">
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
                {icon}
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
        </div>
    </div>
);

const LabeledSelect = ({ label, name, value, onChange }) => (
    <div>
        <label className="block mb-1.5 text-sm font-medium text-black">
            {label}
        </label>
        <div className="relative">
            <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
            >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>
    </div>
);

const PasswordField = ({ label, value, show, toggle, onChange, error }) => (
    <div>
        <label className="block mb-1.5 text-sm font-medium text-black">
            {label}
        </label>
        <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full pl-9 pr-10 py-2.5 border rounded-lg text-sm focus:ring-2 outline-none ${error ? "border-red-500 focus:ring-red-100" : "focus:ring-blue-100"
                    }`}
            />
            <button
                type="button"
                onClick={toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
            >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);
