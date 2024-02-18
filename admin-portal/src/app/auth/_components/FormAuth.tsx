"use client";

import { login } from "@/app/auth/_utils/actions";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FormAuth() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AuthSchema>) {
    setError(undefined);
    startTransition(() => {
      login(values).then((data) => setError(data?.error));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8 rounded p-4"
      >
        <div className="flex w-full flex-col items-center gap-y-2">
          <h1 className="flex w-full items-center justify-center gap-x-4 text-4xl font-semibold">
            <LockOpen1Icon className="h-8 w-8" />
            <p>Auth</p>
          </h1>
          <p className="text-secondary-foreground text-sm">
            Welcome back champion
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Hamza@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your admin email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your admin password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />

        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
