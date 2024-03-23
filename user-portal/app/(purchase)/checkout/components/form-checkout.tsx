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
import { OrderSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiTakeMyMoney, GiSwipeCard } from "react-icons/gi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { z } from "zod";
import FormStepper from "./form-stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/lib/store/cart-store-provider";
import { formatPrice } from "@/utils/helpers";
import { orderCommand } from "@/actions/order";
import LoadingUI from "@/components/loading-ui";
import { toast } from "sonner";
import { TCommand } from "@/types/order";
import Link from "next/link";

type Inputs = z.infer<typeof OrderSchema>;
type FieldName = keyof Inputs;

const steps = [
  {
    name: "Shipping",
    fields: [
      "shipping.firstName",
      "shipping.lastName",
      "shipping.phone",
      "shipping.wilaya",
      "shipping.address",
    ],
  },
  {
    name: "Billing",
  },
  { name: "Complete" },
];

enum PaymentMethods {
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  EDAHABIA_CARD = "EDAHABIA_CARD",
}

const DELIVERY_PRICE = 600;

function FormCheckout() {
  const cartSupplements = useCartStore((state) => state.supplements);
  const clearCartSupplements = useCartStore((state) => state.clearCart);

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const [isPending, startTransition] = useTransition();

  const totalPriceSupplement = cartSupplements.reduce(
    (accumulator, { price, quantity }) =>
      (accumulator = accumulator + price * quantity),
    0,
  );

  const [orderedCommand, setOrderedCommand] = useState<TCommand | null>(null);

  const form = useForm<Inputs>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      // supplements: orderedSupplements,
      payment: { method: PaymentMethods.CASH_ON_DELIVERY },
      shipping: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        wilaya: "",
        address: "",
      },
    },
  });

  useEffect(() => {
    if (cartSupplements && cartSupplements.length > 0) {
      const orderedSupplements = cartSupplements.map(({ _id, quantity }) => ({
        data: _id,
        quantity,
      }));
      form.setValue("supplements", orderedSupplements);
    }
  }, [cartSupplements]);

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // await form.handleSubmit(processForm)();
        form.handleSubmit(processForm)();
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
    startTransition(async () => {
      const res = await orderCommand(data);
      if (!res.success) {
        toast.error(res.error.message);
      } else {
        setOrderedCommand(res.data.command);
        clearCartSupplements();
        form.reset();
      }
    });
  };

  if (cartSupplements.length === 0) {
    return <section>Your shopping cart is empty</section>;
  }

  return (
    <div className="flex-1 space-y-12 overflow-hidden px-10 py-4">
      {/* Steps */}
      <FormStepper
        currentStep={currentStep}
        steps={steps.map((step) => ({ name: step.name }))}
      />

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
                  name="shipping.firstName"
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
                  name="shipping.lastName"
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
                name="shipping.phoneNumber"
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
                  name="shipping.wilaya"
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
                  name="shipping.address"
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
              <h2 className="mb-2 text-base font-semibold leading-relaxed text-gray-900">
                Billing Information
              </h2>
              <Tabs defaultValue="cash_on_delivery">
                <TabsList className="flex w-full items-center">
                  <TabsTrigger
                    value="cash_on_delivery"
                    className="grow space-x-2"
                  >
                    <GiTakeMyMoney className="h-5 w-5" />
                    <span>Cash</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="EDAHABIYA"
                    disabled
                    className="grow space-x-2"
                  >
                    <GiSwipeCard className="h-5 w-5" />
                    <span>Edahabiya</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="cash_on_delivery">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cash on Delivery</CardTitle>
                      <CardDescription>
                        You will have to hand over the agreed sum to the
                        deliveryman who will bring your order to you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full space-y-1">
                        <p className="flex items-center justify-between gap-x-1">
                          <span className="text-sm">Supplement Prices:</span>
                          <span className="text-sm font-medium">
                            {formatPrice(totalPriceSupplement)}
                          </span>
                        </p>
                        <p className="flex items-center justify-between gap-x-1">
                          <span className="text-sm">Delivery Price:</span>
                          <span className="text-sm font-medium">
                            {formatPrice(DELIVERY_PRICE)}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="flex w-full items-center justify-between gap-x-1">
                        <span className="text-sm">Total:</span>
                        <span className="text-sm font-semibold">
                          {formatPrice(totalPriceSupplement + DELIVERY_PRICE)}
                        </span>
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="EDAHABIYA">
                  Change your password here.
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {/* Complete */}
          {currentStep === 2 && (
            <div>
              {isPending ? (
                <LoadingUI />
              ) : (
                orderedCommand && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <p className="flex w-full items-center justify-between gap-x-1">
                          <span>Tracking Number:</span>
                          <span>{orderedCommand.trackingNumber}</span>
                        </p>
                        <p className="flex w-full items-center justify-between gap-x-1">
                          <span>Status:</span>
                          <span>{orderedCommand.status}</span>
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/shop">
                        <Button
                          variant="outline"
                          size={"lg"}
                          className="w-full"
                        >
                          Go to Shop
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          )}
        </form>
      </Form>

      {/* Navigation */}
      <div className="flex w-full items-center justify-between gap-x-2">
        <Button
          variant={"outline"}
          size="lg"
          onClick={prev}
          disabled={currentStep === 0 || isPending}
        >
          <HiChevronLeft className="h-7 w-7" />
        </Button>
        <Button
          variant={"outline"}
          size="lg"
          onClick={next}
          disabled={isPending}
        >
          <HiChevronRight className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}

export default FormCheckout;
