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
  charLimit = null, // ← renamed from wordLimit to charLimit
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
        // Hard stop — truncate to charLimit characters
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
        helperText={
          errors?.message ?? (charLimit ? `Max ${charLimit} characters` : "")
        }
        inputProps={{
          maxLength: charLimit ?? undefined, // native hard stop as backup
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
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
