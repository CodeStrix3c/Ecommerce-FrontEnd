import { z } from "zod";

export const farmInfrastructureSchema = z.object({
  // Equipment (multi-select)
  equipmentOwned: z.preprocess(
    (val) => (val === undefined || val === null ? [] : val),
    z.array(z.string()).min(1, "Select at least one equipment owned")
  ),

  // Storage facilities (multi-select)
  storageFacilities: z.preprocess(
    (val) => (val === undefined || val === null ? [] : val),
    z.array(z.string()).min(1, "Select at least one storage facility")
  ),

  // Farm labor (optional multi-select)
  farmLabor: z.preprocess(
    (val) => (val === undefined || val === null ? [] : val),
    z.string().optional()
  ),

  // Other tools (multi-select, optional but if filled must contain at least one)
  otherTools: z.preprocess(
    (val) => (val === undefined || val === null ? [] : val),
    z.array(z.string()).optional()
  ),
});
