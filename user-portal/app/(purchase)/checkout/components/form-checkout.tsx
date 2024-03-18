"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShippingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { z } from "zod";

type Inputs = z.infer<typeof ShippingSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Shipping",
    fields: ["firstName", "lastName", "phone", "wilaya", "address"],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: [],
  },
  { id: "Step 3", name: "Complete" },
];

function FormCheckout() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const form = useForm<Inputs>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      wilaya: "",
      address: "",
    },
  });

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    form.reset();
  };

  return (
    <div className="flex-1 space-y-12 px-10 py-4">
      {/* Steps */}
      <nav aria-label="Progress">
        <ol role="list" className="flex space-x-4 md:space-x-8">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* mobile screen: prev and next button */}
      <div className="flex w-full items-center justify-center gap-x-8 md:hidden">
        <Button variant={"outline"} size="icon" onClick={prev}>
          <HiChevronLeft className="h-7 w-7" />
        </Button>
        <Button variant={"outline"} size="icon" onClick={next}>
          <HiChevronRight className="h-7 w-7" />
        </Button>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)}>
          {/* Shipping */}
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-relaxed text-gray-900">
                Shipping Information
              </h2>
              <div className="flex flex-col gap-y-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Hamza" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please enter the first name of the beneficiary.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Boo" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please enter the Last name of the shipper.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="079236****" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please make sure that the phone number is functional and,
                      if possible, linked to a Viber/Whatsapp account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="wilaya"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wiliaya</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a shipping wilaya" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mostaganem">Mostaganem</SelectItem>
                          <SelectItem value="oran">Oran</SelectItem>
                          <SelectItem value="alger">Alger</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Please select the wilaya where you wish to ship your
                        order.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Garden street, Chemouma, Mostaganem"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter an address where the delivery person will
                        bring your order to you.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}
          {/* Billing */}
          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2>Billing Information</h2>
            </motion.div>
          )}
        </form>
      </Form>
      <div className="hidden w-full items-center justify-between gap-x-2 md:flex">
        <Button variant={"outline"} size="icon" onClick={prev}>
          <HiChevronLeft className="h-7 w-7" />
        </Button>
        <Button variant={"outline"} size="icon" onClick={next}>
          <HiChevronRight className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}

export default FormCheckout;
