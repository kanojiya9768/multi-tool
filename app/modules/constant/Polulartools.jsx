"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { categories } from "@/json/tools";

const popularTools = categories
  .flatMap((category) => category.tools)
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 6);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function PopularTools() {
  return (
    <section className="pt-40 pb-20 container mx-auto px-4 sm:px-10 lg:px-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 flex items-center gap-2"
      >
        <Star className="h-6 w-6 text-yellow-500" /> Popular Tools
      </motion.h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {popularTools.map((tool, index) => (
          <motion.div key={index} variants={item}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <tool.icon className="h-5 w-5" />
                  <CardTitle>{tool.name}</CardTitle>
                </div>
                <CardDescription className="line-clamp-1">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/tools/${tool.slug}`}>
                  <Button className="w-full primary-gradient hover:opacity-90">
                    Launch Tool
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
