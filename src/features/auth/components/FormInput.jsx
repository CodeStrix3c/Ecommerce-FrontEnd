import { TextField, InputAdornment } from "@mui/material";
import RequiredLabel from "@/features/auth/components/RequiredLabel";
import OptionalLabel from "@/features/auth/components/OptionalLabel";

export default function FormInput({
  name,
  label,
  type = "text",
  icon = null,
  size = "small",
  register,
  errors,
  optional = false,
  onClick,
}) {
  return (
    <TextField
      fullWidth
      defaultValue={""}
      type={type}
      label={
        optional ? (
          <OptionalLabel label={label} />
        ) : (
          <RequiredLabel label={label} />
        )
      }
      variant="outlined"
      size={size}
      helperText={errors?.message}
      slotProps={{
        formHelperText: {
          sx: { color: "var(--color-error)" },
        },
        input: {
          endAdornment: icon ? (
            <InputAdornment position="end" onClick={onClick}>
              {icon}
            </InputAdornment>
          ) : null,
        },
      }}
      {...register(name)}
    />
  );
}
