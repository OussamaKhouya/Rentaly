"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { carSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ColorPicker from "@/components/admin/ColorPicker";
import { updateCar } from "@/lib/admin/actions/car";
import { useEffect } from "react";
import { CarParams } from "@/types";

const EditForm = ({ car, id }: { car: CarParams; id: string }) => {
  const router = useRouter();
  const t = useTranslations("Admin");
  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: car.brand,
      model: car.model,
      year: car.year,
      order: car.order,
      fuelType: car.fuelType || undefined,
      transmission: car.transmission || undefined,
      pricePerDay: car.pricePerDay,
      seatingCapacity: car.seatingCapacity,
      color: car.color,
      availabilityStatus: car.availabilityStatus || undefined,
      imageUrl: car.imageUrl || undefined,
      description: car.description || undefined,
      createdAt: car.createdAt,
      isRented: false,
    },
  });

  useEffect(() => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      toast.error(t("Error"), {
        description: t("Required_Field"),
      });
      console.error(errors);
    }
  }, [form.formState.errors, t]);

  const onSubmit = async (values: z.infer<typeof carSchema>) => {
    try {
      const result = await updateCar({
        ...values,
        imageUrl: values.imageUrl || null,
        description: values.description || null,
      }, id);
      
      if (result.success) {
        toast.success(t("Success"), {
          description: t("Car_Updated"),
        });
        router.push("/admin/cars");
      } else {
        toast.error(t("Error"), {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error(t("Error"), {
        description: t("Something_Went_Wrong"),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Brand")}
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder={t("Brand")}
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
          name="model"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Model")}
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder={t("Model")}
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
          name="year"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Year")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1886}
                  max={new Date().getFullYear()}
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
          name="order"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Order")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
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
          name="fuelType"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Fuel_Type")}
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="car-form_input">
                    <SelectValue placeholder={t("Fuel_Type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">{t("petrol")}</SelectItem>
                    <SelectItem value="diesel">{t("diesel")}</SelectItem>
                    <SelectItem value="electric">{t("electric")}</SelectItem>
                    <SelectItem value="hybrid">{t("hybrid")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transmission"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Transmission")}
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="car-form_input">
                    <SelectValue placeholder={t("Transmission")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">{t("manual")}</SelectItem>
                    <SelectItem value="automatic">{t("automatic")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerDay"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Price")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
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
          name="seatingCapacity"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Seating_Capacity")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={9}
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
          name="availabilityStatus"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Status")}
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="car-form_input">
                    <SelectValue placeholder={t("Status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">{t("available")}</SelectItem>
                    <SelectItem value="rented">{t("rented")}</SelectItem>
                    <SelectItem value="processing">{t("processing")}</SelectItem>
                    <SelectItem value="under_maintenance">
                      {t("under_maintenance")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {t("Car_Image")}
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder={t("Upload_Car_Image")}
                  folder="cars/covers"
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
                  placeholder={t("Car_Description")}
                  {...field}
                  rows={5}
                  className="car-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          {t("Update_Car")}
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
