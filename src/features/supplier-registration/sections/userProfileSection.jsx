import SelectField from "@/components/shared/custom-inputs/SelectField";
import Inputs from "@/components/shared/Inputs";
import { useFormContext, Controller } from "react-hook-form";

export default function UserProfileSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <Inputs
        required
        name="fullName"
        label="Full Name :"
        type="name"
        errors={errors?.fullName}
      />

      <Inputs
        name="email"
        label="Email :"
        type="email"
        errors={errors?.email}
      />
      {/* 
      <Inputs
        required
        name="phone"
        label="Mobile Number :"
        type="phone"
        countryCode="+91"
        errors={errors?.phone}
      /> */}

      <Inputs
        required
        name="age"
        label="Age :"
        type="number"
        errors={errors?.age}
      />

      <Controller
        name="gender"
        control={control}
        rules={{ required: "Gender is required" }}
        render={() => (
          <SelectField
            name="gender"
            label="Gender :"
            control={control}
            errors={errors?.gender}
            placeholder="Select Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        )}
      />

      {/* <Inputs
        required
        name="password"
        label="Password :"
        type="password"
        errors={errors?.password}
      />

      <Inputs
        required
        name="confirmPassword"
        label="Confirm Password :"
        type="password"
        errors={errors?.confirmPassword}
      /> */}
    </div>
  );
}
