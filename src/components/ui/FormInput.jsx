import { TextField, InputAdornment } from "@mui/material";
import RequiredLabel from "@/components/ui/RequiredLabel";

export default function FormInput({
  name,
  label,
  type = "text",
  icon = null,
  size = "small",
  register,
  errors,
}) {
  return (
    <TextField
      fullWidth
      type={type}
      label={<RequiredLabel label={label} />}
      variant="outlined"
      size={size}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      {...register(name)}
      slotProps={{
        input: {
          endAdornment: icon ? (
            <InputAdornment position="end">{icon}</InputAdornment>
          ) : null,
        },
      }}
    />
  );
}
