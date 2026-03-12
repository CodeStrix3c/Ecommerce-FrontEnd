import { RefreshCcw, Search, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function SelectInput({
  name,
  label,
  options,
  optional = false,
  error,
  modalLabel = "",
  showInputLabel = true,
  onValueChange,
  disabled = false,
  searchable = false,
}) {
  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [searchText, setSearchText] = useState("");
  const { control } = useFormContext();

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchText) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [options, searchText, searchable]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange }, fieldState }) => {
        const liveError = fieldState?.error || error;

        useEffect(() => {
          const match = options.find((o) => String(o.value) === String(value));
          setSelectedLabel(match ? match.label : "");
        }, [value, options]);

        return (
          <div className="flex flex-col gap-1.5">
            {/* Label */}
            {showInputLabel && (
              <label className="text-sm font-medium text-gray-800">
                {label}
                {!optional && <span className="ml-1 text-red-500">*</span>}
              </label>
            )}

            {/* Selector */}
            <div
              onClick={() => {
                if (!disabled) setVisible(true);
              }}
              className={`
                flex items-center justify-between
                rounded-lg border px-4 min-h-[52px] text-sm
                transition cursor-pointer bg-white
                ${
                  disabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : liveError
                      ? "border-red-500"
                      : "border-gray-300 hover:border-gray-400 focus-within:border-primary"
                }
              `}
            >
              <span
                className={`${
                  selectedLabel ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {selectedLabel || `Select ${label}`}
                {!optional &&
                  !selectedLabel &&
                  !disabled &&
                  !showInputLabel && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
              </span>
            </div>

            {/* Error */}
            {liveError && (
              <p className="text-xs text-red-500 mt-1">{liveError?.message}</p>
            )}

            {/* Modal */}
            {!disabled && visible && (
              <div
                onClick={() => {
                  setVisible(false);
                  setSearchText("");
                }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="
                    w-full max-w-sm rounded-xl bg-white
                    shadow-lg overflow-hidden
                  "
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {modalLabel || label}
                    </h4>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          onChange("");
                          onValueChange?.("");
                          setSelectedLabel("");
                          setVisible(false);
                          setSearchText("");
                        }}
                        className="p-2 hover:bg-gray-100 rounded-md"
                      >
                        <RefreshCcw className="h-4 w-4 text-[var(--color-primary)]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setVisible(false);
                          setSearchText("");
                        }}
                        className="p-2 hover:bg-gray-100 rounded-md"
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Search */}
                  {searchable && (
                    <div className="p-3 border-b">
                      <div className="flex items-center gap-2 rounded-[10px] border px-3 py-4">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          placeholder={`Search ${label}`}
                          className="flex-1 text-sm outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Options */}
                  <div className="max-h-72 overflow-y-auto">
                    {filteredOptions.map((item) => (
                      <div
                        key={item.value}
                        onClick={() => {
                          onChange(String(item.value));          // FIX
                          onValueChange?.(String(item.value));   // FIX
                          setVisible(false);
                          setSearchText("");
                        }}
                        className={`
                          px-5 py-3 text-sm cursor-pointer
                          hover:bg-green-50
                          ${
                            String(item.value) === String(value)
                              ? "text-green-700 font-medium bg-white"
                              : "text-gray-800"
                          }
                        `}
                      >
                        {item.label}
                      </div>
                    ))}

                    {!filteredOptions.length && (
                      <p className="px-5 py-6 text-center text-sm text-gray-400">
                        No results found
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}