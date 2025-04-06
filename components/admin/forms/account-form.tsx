"use client";

import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/FileUpload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { accountSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateAccount } from "@/lib/admin/actions/car";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import {AccountParams} from "@/types";

const AccountForm = ({ account }: { account: AccountParams }) => {
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      logo: account.logo,
      description: account.description,
      facebook: account.facebook,
      instagram: account.instagram,
      whatsapp: account.whatsapp,
      email: account.email,
      phone: account.phone,
      address: account.address,
      map: account.map,
    },
  });
  useEffect(() => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      toast.error("Form validation failed. Please check your inputs.");
      console.error(errors);
    }
  }, [form.formState.errors]);

  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    const result = await updateAccount(values);
    if (result.success) {
      toast.success("Success", {
        description: "Account updated successfully",
      });
      redirect("/admin/account");
    } else {
      toast.error("Error", {
        description: result.message,
      });
      console.error(result);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  logo
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type="image"
                    accept="image/*"
                    placeholder="Upload car image"
                    folder="account"
                    variant="light"
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Car Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Car description"
                    {...field}
                    rows={2}
                    className="car-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  whatsapp
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Account whatsapp"
                    {...field}
                    className="car-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  facebook
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Account facebook"
                    {...field}
                    className="car-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  instagram
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Account instagram"
                    {...field}
                    className="car-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  email
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Account email"
                    {...field}
                    className="car-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  phone
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Account phone"
                    {...field}
                    className="car-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  address
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=" address"
                    {...field}
                    rows={2}
                    className="car-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="map"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Map
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Car map"
                    {...field}
                    rows={3}
                    className="car-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="book-form_btn text-white">
            Update Car
          </Button>
        </form>
      </Form>
    </>
  );
};
export default AccountForm;
