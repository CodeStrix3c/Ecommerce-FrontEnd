import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  User,
  Landmark,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplierRegisterSchema } from "@/schemas/authSchemas";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import useIsMobile from "@/hooks/useInMobile";
import SupplierRegistrationModal from "../components/SupplierRegistrationModal";
import FormInput from "../../../components/ui/FormInput";
import CustomButton from "@/components/ui/CustomButton";
import {
  containerStyle,
  footerTextStyle,
  headerStyle,
  registerCardStyle,
  subHeaderStyle,
} from "@/utils/supplierLoginStyles";

export default function SupplierRegister() {
  const isMobile = useIsMobile();
  const [redirect, setRedirect] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supplierRegisterSchema),
  });

  const onSubmit = async (data) => {
    console.log("Supplier Registration Data:", data);
    toast.success("Supplier registered successfully!");
    setRedirect(true);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported in your browser");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setValue("address", `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setLoadingLocation(false);
        toast.info("Location detected");
      },
      () => {
        toast.error("Unable to fetch location");
        setLoadingLocation(false);
      }
    );
  };

  if (redirect || isLoggedIn) return <Navigate to="/" />;

  return (
    <>
      {isMobile ? (
        <SupplierRegistrationModal
          isOpen={true}
          onClose={() => setRedirect(true)}
        />
      ) : (
        <Box sx={containerStyle}>
          <Box sx={registerCardStyle}>
            <Typography variant="h4" sx={headerStyle}>
              Supplier Registration
            </Typography>
            <Typography variant="body2" sx={subHeaderStyle}>
              Please fill in the details to create your supplier account.
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="companyName"
                    label="Company Name"
                    icon={<Building2 size={18} />}
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="contactPerson"
                    label="Contact Person"
                    icon={<User size={18} />}
                    register={register}
                    errors={errors}
                  />
                </Grid>

                {/* Email & Phone */}
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    icon={<Mail size={18} />}
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="phone"
                    label="Phone"
                    type="tel"
                    icon={<Phone size={18} />}
                    register={register}
                    errors={errors}
                  />
                </Grid>

                {/* Password */}
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    icon={<Lock size={18} />}
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    icon={<Lock size={18} />}
                    register={register}
                    errors={errors}
                  />
                </Grid>

                {/* License & Address */}
                <Grid item xs={12}>
                  <FormInput
                    name="licenseNumber"
                    label="Pesticide License Number"
                    icon={<Landmark size={18} />}
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    name="address"
                    label="Street Address"
                    icon={<MapPin size={18} />}
                    register={register}
                    errors={errors}
                  />
                </Grid>

                {/* City, State, Country */}
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name="city"
                    label="City"
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name="state"
                    label="State"
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name="country"
                    label="Country"
                    register={register}
                    errors={errors}
                  />
                </Grid>

                {/* Location & Submit */}
                <Grid item xs={12} sm={6}>
                  <CustomButton
                    fullWidth
                    variant="text"
                    onClick={handleUseLocation}
                    text="Use Current Location"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomButton
                    fullWidth
                    type="submit"
                    text="Register Supplier"
                  />
                </Grid>
              </Grid>
            </form>

            {/* Login link */}
            <Typography variant="body2" sx={footerTextStyle}>
              Already have an account?{" "}
              <Link
                to="/supplier-login"
                style={{ color: "#1976d2", fontWeight: 500 }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
