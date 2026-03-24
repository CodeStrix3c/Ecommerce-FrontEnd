import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";

export default function DatePickerWithRange({
  className,
  dateRange,
  setDateRange,
}) {

  const [date, setDate] = React.useState(dateRange);

  React.useEffect(() => {
    setDate(dateRange);
  }, [dateRange]);

  const handleSelect = (range) => {
    setDate(range);
    setDateRange(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-[260px] flex items-center text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} →{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="text-sm">Start Date-End Date</span>
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}