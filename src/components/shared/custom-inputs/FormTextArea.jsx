import { TextField } from "@mui/material";
import RequiredLabel from "@/components/ui/RequiredLabel";
import OptionalLabel from "@/components/ui/OptionalLabel";

export default function FormTextArea({
  name,
  label,
  rows = 4,
  register,
  errors,
  required = true,
  placeholder = "",
}) {
  const getLabel = () => {
    if (required === true) return <RequiredLabel label={label} />;
    if (required === false) return <OptionalLabel label={label} />;
    return label;
  };

  return (
 <div className="flex flex-col gap-1.5">
 {label && getLabel()}
    <TextField
      fullWidth
      multiline
      rows={rows}
      defaultValue={""}
      label={placeholder}
      variant="outlined"
      size="small"
      helperText={errors?.message}


      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
        },
      }}

      slotProps={{
        formHelperText: {
          sx: { color: "var(--color-error)" },
        },
      }}
      {...register(name)}
    />
 </div>
  );
}
