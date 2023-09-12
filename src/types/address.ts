import { z } from "zod";

export const AddressValidator = z.object({
  address: z.string().min(42).max(42),
});

export type Address = z.infer<typeof AddressValidator>;
