import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "Server";

export const trpc = createReactQueryHooks<AppRouter>();
