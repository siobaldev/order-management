import { z } from "zod";

export const orderSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters.")
    .max(100, "Customer name is too long."),
  product: z
    .string()
    .min(2, "Product name must be at least 2 characters.")
    .max(100, "Product name is too long."),
  quantity: z.coerce
    .number("Quantity is required.")
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1."),
  totalPrice: z.coerce
    .number("Total price is required.")
    .min(0.01, "Total price must be greater than 0."),
});
