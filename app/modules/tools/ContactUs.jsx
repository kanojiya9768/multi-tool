"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertContactMessageSchema } from "@/shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  User,
  Globe,
  MessageSquare,
  Send,
  LoaderIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTransition } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const reasons = [
  "General Inquiry",
  "Technical Support",
  "Business Proposal",
  "Feedback",
  "Other",
];

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "China",
  "Japan",
  "Germany",
  "France",
  "Brazil",
  "Russia",
  "South Africa",
  "Singapore",
  "United Arab Emirates",
  "Italy",
  "Spain",
  "Mexico",
  "Indonesia",
  "Malaysia",
  "Thailand",
  "Vietnam",
  "Philippines",
  "South Korea",
  "Saudi Arabia",
  "Other",
];

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

const ContactIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute"
    >
      {/* Main circle */}
      <motion.circle
        cx="250"
        cy="250"
        r="200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="10 5"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{ pathLength: 1, rotate: 360 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Inner circles */}
      <motion.circle
        cx="250"
        cy="250"
        r="150"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Floating elements */}
      <motion.g animate={floatingAnimation}>
        {/* Email icon */}
        <motion.path
          d="M150 250 L350 250 L350 350 L150 350 L150 250 L250 300 L350 250"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </motion.g>

      {/* Decorative elements */}
      <motion.path
        d="M200 150 Q250 100 300 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* Animated dots */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={200 + i * 50}
          cy="400"
          r="5"
          fill="currentColor"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: -20 }}
          transition={{
            duration: 1,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </motion.svg>

    {/* Text overlay */}
    <motion.div
      className="absolute text-center z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
      <p className="text-lg text-muted-foreground w-[250px]">
        {`We'd love to hear from you. Our team is always here to help and respond
        as soon as possible.`}
      </p>
    </motion.div>
  </div>
);

export default function ContactUs() {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(insertContactMessageSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      reason: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        const response = await axios.post("/api/send-contact", data);
        if (response?.status == 200) {
          form.reset();
          push("/thank-you");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="container mx-auto px-4 py-12  sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Animated Illustration */}
          <motion.div
            className="hidden lg:flex justify-center items-center relative h-[600px]"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-primary/80">
              <ContactIllustration />
            </div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-card rounded-lg shadow-lg p-6 backdrop-blur-sm border border-border/50"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Phone
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4" /> Country
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" /> Reason
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {reasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className={`w-full bg-primary hover:bg-primary/90 primary-gradient`}
                    disabled={isPending}
                  >
                    {!isPending ? (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    ) : (
                      <>
                        <LoaderIcon className="animate-spin w-4 h-4 mr-2" />
                        Sending
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
