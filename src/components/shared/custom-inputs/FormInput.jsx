import { TextField, InputAdornment } from "@mui/material";
import RequiredLabel from "@/components/ui/RequiredLabel";
import OptionalLabel from "@/components/ui/OptionalLabel";

export default function FormInput({
  name,
  label,
  type = "text",
  icon = null,
  size = "small",
  register,
  errors,
  required = true, // true = required, false = optional, null = plain
  onClick,
}) {
  // Decide which label to render
  const getLabel = () => {
    if (required === true) return <RequiredLabel label={label} />;
    if (required === false) return <OptionalLabel label={label} />;
    return label; // plain string if null
  };

  return (
    <TextField
      fullWidth
      defaultValue={""}
      type={type}
      label={getLabel()}
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
