import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TextField, Button, Tabs, Tab, Divider, Box } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  phoneRegisterSchema,
  emailRegisterSchema,
} from "@/features/farmer-registration/schemas/authSchemas"; // ✅ you should define these like login but with confirmPassword
import RequiredLabel from "@/components/ui/RequiredLabel";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";
import { Link } from "react-router-dom";

const MobileRegisterModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const schema = tab === 0 ? phoneRegisterSchema : emailRegisterSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await auth.register(data);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      onClose();
    } else {
      toast.error(response.message);
    }
  };

  const handleGoogleRegister = async (credential) => {
    const response = await auth.googleRegister(credential);
    if (response.success) {
      toast.success(response.message);
      onClose();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex h-[92%] flex-col bg-white rounded-t-2xl shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3 shadow-sm">
              <h2 className="flex-1 text-center text-base font-semibold text-gray-900">
                Create an account
              </h2>
              <button
                onClick={onClose}
                className="absolute right-4 rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-20">
              {/* Tabs */}
              <Tabs
                value={tab}
                onChange={(e, val) => setTab(val)}
                centered
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                  "& .MuiTab-root": {
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    textTransform: "none",
                  },
                  "& .Mui-selected": {
                    color: "#111827",
                    fontWeight: 600,
                  },
                }}
              >
                <Tab label="Phone" />
                <Tab label="Email" />
              </Tabs>

              {/* Form */}
              <Box className="mt-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  {tab === 0 ? (
                    <>
                      <TextField
                        label={<RequiredLabel label="Phone number" />}
                        type="tel"
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        {...register("phone")}
                      />
                      <TextField
                        label={<RequiredLabel label="Password" />}
                        type="password"
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password")}
                      />
                      <TextField
                        label={<RequiredLabel label="Confirm Password" />}
                        type="password"
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        {...register("confirmPassword")}
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        label={<RequiredLabel label="Email" />}
                        type="email"
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register("email")}
                      />
                      <TextField
                        label={<RequiredLabel label="Password" />}
                        type="password"
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password")}
                      />
                      <TextField
                        label={<RequiredLabel label="Confirm Password" />}
                        type="password"
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        {...register("confirmPassword")}
                      />
                    </>
                  )}

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      backgroundColor: "#ff385c",
                      "&:hover": { backgroundColor: "#e03352" },
                      textTransform: "none",
                      fontWeight: "600",
                      borderRadius: "12px",
                      py: 1.5,
                    }}
                  >
                    {loading ? "Loading..." : "Sign up"}
                  </Button>
                </form>
              </Box>

              {/* Divider */}
              <Divider sx={{ my: 4, fontSize: "0.85rem", color: "#6b7280" }}>
                or continue with
              </Divider>

              {/* Social login */}
              <div className="flex flex-col gap-3">
                <GoogleLogin
                  onSuccess={(cred) => handleGoogleRegister(cred.credential)}
                  onError={() => console.log("Signup failed")}
                  text="continue_with"
                  width="full"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t bg-white py-4">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-black underline">
                  Log in
                </Link>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileRegisterModal;
