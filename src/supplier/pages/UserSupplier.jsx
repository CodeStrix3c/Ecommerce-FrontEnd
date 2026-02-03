import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import {
    useUserProfile,
    useUpdateUserProfile,
} from "@/hooks/Vendor/useUserProfile";
import FormInput from "@/components/shared/custom-inputs/FormInput";

const AUTO_SAVE_DELAY = 800;

export default function UserSupplier() {
    const userId = Number(localStorage.getItem("userId"));
    const { data, refetch } = useUserProfile(userId);
    const { mutate: updateProfile, isPending } = useUpdateUserProfile();

    const [profileId, setProfileId] = useState(null);
    const [lastChangedField, setLastChangedField] = useState(null);
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState("");
    const [passwordSaved, setPasswordSaved] = useState(false);

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

    /* ===== LOAD PROFILE ===== */
    useEffect(() => {
        if (!data) return;

        setProfileId(data.id);
        setForm({
            fullName: data.fullName || "",
            email: data.email || "",
            phone: data.phone || "",
            age: data.age || "",
            gender: data.gender || "",
            profilePic: data.profilePic || "",
            password: "",
            confirmPassword: "",
        });
    }, [data]);

    /* ===== BUILD PAYLOAD ===== */
    const buildPayload = () => ({
        fullname: form.fullName,
        email: form.email,
        phone: form.phone,
        age: Number(form.age),
        gender: form.gender,
        profilepic: form.profilePic,
    });

    /* ===== INPUT CHANGE ===== */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "password" || name === "confirmPassword") {
            setPasswordSaved(false);
        }

        setForm((p) => ({ ...p, [name]: value }));
        setLastChangedField(name);
        setErrors((p) => ({ ...p, [name]: "" }));
    };

    /* ===== IMAGE CHANGE ===== */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setForm((p) => ({
            ...p,
            profilePic: URL.createObjectURL(file),
        }));
        setLastChangedField("profilePic");
    };

    /* ===== AUTO SAVE (PROFILE) ===== */
    useEffect(() => {
        if (!lastChangedField || !profileId) return;

        if (
            lastChangedField === "password" ||
            lastChangedField === "confirmPassword"
        ) {
            return;
        }

        const timer = setTimeout(() => {
            updateProfile(
                {
                    id: profileId,
                    payload: buildPayload(),
                },
                {
                    onSuccess: () => {
                        setToast("Profile saved");
                        setTimeout(() => setToast(""), 1200);
                        refetch();
                    },
                }
            );
        }, AUTO_SAVE_DELAY);

        return () => clearTimeout(timer);
    }, [form, lastChangedField]);

    /* ===== PASSWORD UPDATE ===== */
    const savePassword = () => {
        const err = {};

        if (!form.password) {
            err.password = { message: "Password required" };
        }

        if (form.password !== form.confirmPassword) {
            err.confirmPassword = { message: "Passwords do not match" };
        }

        if (Object.keys(err).length) {
            setErrors(err);
            return;
        }

        updateProfile(
            {
                id: profileId,
                payload: {
                    ...buildPayload(),
                    password: form.password,
                },
            },
            {
                onSuccess: () => {
                    setToast("Password saved successfully");
                    setPasswordSaved(true);

                    setForm((p) => ({
                        ...p,
                        password: "********",
                        confirmPassword: "********",
                    }));

                    setTimeout(() => setToast(""), 2000);
                    refetch();
                },
            }
        );
    };

    return (
        <div className="bg-[var(--color-white)] min-h-screen pt-[66px] md:pt-[94px] pb-12">
            {toast && (
                <div className="fixed top-5 right-5 bg-[var(--color-primary)] text-[var(--color-white)] px-4 py-2 rounded-lg">
                    {toast}
                </div>
            )}

            <div className="mx-auto max-w-4xl">
                {/* HEADER */}
                <div className="px-6 py-6 border-b flex gap-6 items-center">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full overflow-hidden border">
                            <img
                                src={form.profilePic || "/default-avatar.png"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label
                            htmlFor="profilePicInput"
                            className="absolute bottom-0 right-0 bg-[var(--color-secondary)] text-[var(--color-white)] p-2 rounded-full cursor-pointer"
                        >
                            <Pencil size={14} />
                        </label>
                        <input
                            id="profilePicInput"
                            type="file"
                            hidden
                            onChange={handleImageChange}
                        />
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold">{form.fullName}</h1>
                        <p className="text-sm">{form.email}</p>
                    </div>
                </div>

                {/* FORM */}
                <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        name="fullName"
                        label="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                    />
                    <FormInput
                        name="age"
                        label="Age"
                        type="number"
                        value={form.age}
                        onChange={handleChange}
                    />
                    <FormInput
                        name="email"
                        label="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <FormInput
                        name="phone"
                        label="Phone"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <FormInput
                        name="password"
                        label="New Password"
                        type="password"
                        value={form.password}
                        errors={errors.password}
                        onChange={handleChange}
                    />
                    <FormInput
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={form.confirmPassword}
                        errors={errors.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="px-6 pb-6">
                    <button
                        onClick={savePassword}
                        disabled={
                            passwordSaved ||
                            !form.password ||
                            !form.confirmPassword ||
                            isPending
                        }
                        className={`w-full py-2.5 rounded-lg text-[var(--color-white)]
                          ${passwordSaved ? "bg-[var(--color-primary)]" : "bg-[var(--color-secondary)]"}
                          ${isPending ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                    >
                        {passwordSaved ? "Password Saved ✓" : "Update Password"}
                    </button>
                </div>
            </div>
        </div>
    );
}
