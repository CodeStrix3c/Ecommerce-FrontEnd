import React from "react";

export default function LoginLink({ link }) {
  return (
    <p className="text-center text-[var(--color-black)] mt-4">
      Already have an account?{" "}
      <a
        href={link}
        className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold"
      >
        Login
      </a>
    </p>
  );
}
