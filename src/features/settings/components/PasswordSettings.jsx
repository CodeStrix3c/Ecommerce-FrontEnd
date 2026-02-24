import React, { useState } from "react";
import SectionCard from "./SectionCard";
import InputField from "./InputField";

const PasswordSettings = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Password validation function
  const validatePassword = (value) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (value.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!specialCharRegex.test(value)) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  const handleChange = (field, value) => {
    const updated = { ...password, [field]: value };
    setPassword(updated);

    // Live validation for new password
    if (field === "newPassword") {
      setErrors((prev) => ({
        ...prev,
        newPassword: validatePassword(value),
      }));
    }

    // Live validation for confirm password
    if (field === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value && value !== updated.newPassword
            ? "Passwords do not match"
            : "",
      }));
    }
  };

  const handleSave = () => {
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (errors.newPassword || errors.confirmPassword) {
      alert("Please fix password errors before saving");
      return;
    }

    alert("Password updated successfully!");
    handleCancel();
  };

  const handleCancel = () => {
    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <SectionCard title="Change Password">
      <InputField
        label="Current Password"
        type="password"
        value={password.currentPassword}
        onChange={(e) => handleChange("currentPassword", e.target.value)}
      />

      <InputField
        label="New Password"
        type="password"
        value={password.newPassword}
        onChange={(e) => handleChange("newPassword", e.target.value)}
      />
      {errors.newPassword && (
        <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
      )}

      <InputField
        label="Confirm Password"
        type="password"
        value={password.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
      />
      {errors.confirmPassword && (
        <p className="text-xs text-red-500 mt-1">
          {errors.confirmPassword}
        </p>
      )}


      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded text-sm"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="border border-[var(--color-gray)] px-4 py-2 rounded text-sm"
        >
          Cancel
        </button>
      </div>
    </SectionCard>
  );
};

export default PasswordSettings;