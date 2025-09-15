import { Home, Landmark, Map, Globe, Hash, Locate } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import FormSection from "@/components/FormSection";

export default function StepAddress({ register, errors, detectLocation }) {
  return (
    <FormSection
      title="Address"
      actionText="Use Current Location"
      onActionClick={detectLocation}
    >
      <div className="space-y-4">
        <FormInput
          name="village"
          label="Village"
          register={register}
          errors={errors}
          icon={<Home size={16} className="text-[var(--color-primary)]" />}
        />
        <FormInput
          name="tehsil"
          label="Tehsil"
          register={register}
          errors={errors}
          icon={<Landmark size={16} className="text-[var(--color-primary)]" />}
        />
        <FormInput
          name="district"
          label="District"
          register={register}
          errors={errors}
          icon={<Map size={16} className="text-[var(--color-primary)]" />}
        />
        <FormInput
          name="state"
          label="State"
          register={register}
          errors={errors}
          icon={<Globe size={16} className="text-[var(--color-primary)]" />}
        />
        <FormInput
          name="pincode"
          label="Pin Code"
          type="number"
          register={register}
          errors={errors}
          icon={<Hash size={16} className="text-[var(--color-primary)]" />}
        />

        {/* GPS Location with Detect Action inside input */}
        <div className="relative">
          <FormInput
            name="gps"
            label="GPS Location"
            register={register}
            errors={errors}
            readOnly
            icon={<Locate size={16} className="text-[var(--color-primary)]" />}
          />
          <button
            type="button"
            onClick={detectLocation}
            className="absolute right-2 top-[34px] text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] text-sm font-medium"
          >
            Detect
          </button>
        </div>
      </div>
    </FormSection>
  );
}
