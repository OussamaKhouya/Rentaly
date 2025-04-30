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
import { AccountParams } from "@/types";
import { useTranslations } from "next-intl";

const AccountForm = ({ account }: { account: AccountParams }) => {
  const t = useTranslations("Admin.Account");
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      logo: account.logo,
      logo2: account.logo2,
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
      toast.error(t("Error.Title"), {
        description: t("Error.Message"),
      });
      console.error(errors);
    }
  }, [form.formState.errors, t]);

  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    const result = await updateAccount(values);
    if (result.success) {
      toast.success(t("Success.Title"), {
        description: t("Success.Message"),
      });
      redirect("/admin");
    } else {
      toast.error(t("Error.Title"), {
        description: t("Error.Message"),
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
                  {t("Logo")}
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type="image"
                    accept="image/*"
                    placeholder={t("Logo")}
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
                name="logo2"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                  {t("FooterLogo")}
                        </FormLabel>
                        <FormControl>
                            <FileUpload
                                type="image"
                                accept="image/*"
                    placeholder={t("FooterLogo")}
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
                  {t("Description")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("Description")}
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
                  {t("WhatsApp")}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={t("WhatsApp")}
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
                  {t("Facebook")}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={t("Facebook")}
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
                  {t("Instagram")}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={t("Instagram")}
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
                  {t("Email")}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={t("Email")}
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
                  {t("Phone")}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={t("Phone")}
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
                  {t("Address")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("Address")}
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
                  {t("Map")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("Map")}
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
            {t("Update")}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AccountForm;
