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
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

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

export function SearchTools() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const tabActiveCategory = useMemo(() => {
    return searchParams?.get("ct");
  }, [searchParams]);

  // Function to handle the search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter tools based on the search query
  const filteredTools = categories.flatMap((category) =>
    category.tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery) ||
        tool.description.toLocaleLowerCase().includes(searchQuery)
    )
  );

  return (
    <div
      className="container  mx-auto min-h-screen pb-20 p-8 mt-20 px-4 sm:px-14 lg:px-28"
      id="BrowseBycategory"
    >
      <div className=" relative z-10">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-8 capitalize primary-text-gradient "
          >
            Browse All tools
          </motion.h2>

          {/* Search bar */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for tools..."
              className="p-3 rounded-full w-full md:w-1/2 bg-black text-white shadow-xl transition-all border-2 border-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <Tabs
          defaultValue={tabActiveCategory || "All"}
          className="space-y-8 w-full"
        >
          <div className="w-full overflow-auto">
            <TabsList className="bg-black backdrop-blur-sm flex min-w-max">
              {/* Map over categories and add an "All" tab */}
              <TabsTrigger
                value="All"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>

              {categories.map((category, index) => (
                <TabsTrigger
                  key={index}
                  value={category.title}
                  className="data-[state=active]:bg-gradient-to-r text-sm sm:text-[17px] text-white data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* All tab content */}
          <TabsContent value="All">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, toolIndex) => (
                  <motion.div key={toolIndex} variants={item}>
                    <Card className="group hover:shadow-lg duration-300 hover:bg-white hover:text-black transition-all bg-black text-white cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <tool.icon className="h-5 w-5" />
                          <CardTitle>{tool.name}</CardTitle>
                        </div>
                        <CardDescription className="line-clamp-1">
                          {tool.description}
                        </CardDescription>
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
                ))
              ) : (
                <div className="col-span-full text-center text-lg text-gray-500">
                  {`No tools found for "${searchQuery}"`}
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Content for each category */}
          {categories.map((category, index) => (
            <TabsContent key={index} value={category.title}>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {category.tools
                  .filter((tool) =>
                    tool.name.toLowerCase().includes(searchQuery)
                  )
                  .map((tool, toolIndex) => (
                    <motion.div key={toolIndex} variants={item}>
                      <Card className="group hover:shadow-lg duration-300 hover:bg-white hover:text-black transition-all bg-black text-white cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <tool.icon className="h-5 w-5" />
                            <CardTitle className="!text-base sm:!text-2xl">
                              {tool.name}
                            </CardTitle>
                          </div>
                          <CardDescription className="line-clamp-1">
                            {tool.description}
                          </CardDescription>
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
