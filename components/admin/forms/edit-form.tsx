"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
      toast.error("Form validation failed. Please check your inputs.");
      console.error(errors);
    }
  }, [form.formState.errors]);

  const onSubmit = async (values: z.infer<typeof carSchema>) => {
    try {
      const result = await updateCar({
        ...values,
        imageUrl: values.imageUrl || null,
        description: values.description || null,
      }, id);
      
      if (result.success) {
        toast.success("Success", {
          description: "Car updated successfully",
        });
        router.push("/admin/cars");
      } else {
        toast.error("Error", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update car",
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
                Brand
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Car brand"
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
                Model
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Car model"
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
                Year
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
                Order
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
                Fuel Type
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="car-form_input">
                    <SelectValue placeholder="Select Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
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
                Transmission
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="car-form_input">
                    <SelectValue placeholder="Select Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
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
                Price Per Day
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
                Seating Capacity
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
                Availability Status
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="car-form_input">
                    <SelectValue placeholder="Select Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="under_maintenance">
                      Under Maintenance
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
                Car Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload car image"
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
                Car Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Car description"
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
          Update Car
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
