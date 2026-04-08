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
  charLimit = null,
}) {
  const getLabel = () => {
    if (required === true) return <RequiredLabel label={label} />;
    if (required === false) return <OptionalLabel label={label} />;
    return label;
  };

  const registered = register(name);

  const handleChange = (e) => {
    if (charLimit) {
      const value = e.target.value;
      if (value.length > charLimit) {
        e.target.value = value.slice(0, charLimit);
      }
    }
    registered.onChange(e);
  };

  const currentLength = register(name)?.ref?.value?.length ?? 0;

  return (
    <div className="flex flex-col gap-1.5">
      {label && getLabel()}

      <TextField
        fullWidth
        multiline
        rows={rows}
        defaultValue=""
        label={placeholder}
        variant="outlined"
        size="small"
        error={Boolean(errors)}
        helperText={
          errors?.message ?? (charLimit ? `Max ${charLimit} characters` : "")
        }
        inputProps={{
          maxLength: charLimit ?? undefined,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0,0,0,0.4)",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0,0,0,0.4)",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: errors ? "var(--color-error)" : "rgba(0,0,0,0.4)",
              borderWidth: "1px",
            },

            "&.Mui-focused": {
              boxShadow: "none",
            },

            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--color-error)",
            },
          },
        }}
        slotProps={{
          formHelperText: {
            sx: {
              color: errors?.message
                ? "var(--color-error)"
                : "var(--color-gray)",
            },
          },
        }}
        {...registered}
        onChange={handleChange}
      />
    </div>
  );
}
