import { TextField, InputAdornment } from "@mui/material";
import RequiredLabel from "@/components/ui/RequiredLabel";
import OptionalLabel from "@/components/ui/OptionalLabel";

export default function FormDateInput({
  name,
  label,
  register,
  errors,
  optional = false,
  size = "small",
  icon = null,
  onClick,
}) {
  return (
    <TextField
      fullWidth
      type="date"
      defaultValue={""}
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
      InputLabelProps={{
        shrink: true, // important for date fields so the label stays above
      }}
      InputProps={{
        endAdornment: icon ? (
          <InputAdornment position="end" onClick={onClick}>
            {icon}
          </InputAdornment>
        ) : null,
      }}
      FormHelperTextProps={{
        sx: { color: "var(--color-error)" },
      }}
      {...register(name)}
    />
  );
}
