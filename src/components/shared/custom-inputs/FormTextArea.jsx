import { TextField } from "@mui/material";
import RequiredLabel from "@/components/ui/RequiredLabel";
import OptionalLabel from "@/components/ui/OptionalLabel";

export default function FormTextArea({
  name,
  label,
  rows = 4,
  register,
  errors,
  required = true, // true = required, false = optional, null = plain
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
      multiline
      rows={rows}
      defaultValue={""}
      label={getLabel()}
      variant="outlined"
      size="small"
      helperText={errors?.message}
      slotProps={{
        formHelperText: {
          sx: { color: "var(--color-error)" },
        },
      }}
      {...register(name)}
    />
  );
}
