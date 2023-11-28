import { Role } from "@prisma/client";

//NOTE: This file contains  options for the select fields in the app

export const roleOptions: { value: Role; label: string }[] = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
  { value: "support", label: "Support" },
];
