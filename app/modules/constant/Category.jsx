"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { categories } from "@/json/tools";

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

export function Category() {
  return (
    <div className="px-4 sm:px-10 lg:px-20" id="BrowseBycategory">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 animate-gradient" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Browse by Category
        </motion.h2>
        <Tabs defaultValue={categories[0]?.title} className="space-y-8">
          <TabsList className="mb-8 p-1 bg-background/50 backdrop-blur-sm w-full  flex flex-wrap">
            {categories.map((category, index) => (
              <TabsTrigger
                key={index}
                value={category.title}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category, index) => (
            <TabsContent key={index} value={category.title}>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {category.tools.map((tool, toolIndex) => (
                  <motion.div key={toolIndex} variants={item}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <tool.icon className="h-5 w-5" />
                          <CardTitle>{tool.name}</CardTitle>
                        </div>
                        <CardDescription>{tool.description}</CardDescription>
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
