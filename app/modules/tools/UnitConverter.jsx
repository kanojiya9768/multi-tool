"use client";
import React, { useState } from "react";
import { Button } from "/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const conversionFactors = {
  distance: {
    meters: 1,
    kilometers: 0.001,
    miles: 0.000621371,
    feet: 3.28084,
    inches: 39.3701,
    yards: 1.09361,
    centimeters: 100,
    millimeters: 1000,
    nauticalMiles: 0.000539957,
  },
  weight: {
    kilograms: 1,
    pounds: 2.20462,
    grams: 1000,
    ounces: 35.274,
    stones: 0.157473,
    tons: 0.001,
    milligrams: 1000000,
    micrograms: 1000000000,
  },
  temperature: {
    celsius: 1,
    fahrenheit: function (celsius) {
      return (celsius * 9) / 5 + 32;
    },
    kelvin: function (celsius) {
      return celsius + 273.15;
    },
  },
};

const UnitConverter = () => {
  const [category, setCategory] = useState("distance");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("kilometers");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Please enter a valid number.");
      setResult(null);
      return;
    }

    if (fromUnit === toUnit) {
      setError("Please select different units for conversion.");
      setResult(null);
      return;
    }

    let convertedValue;
    if (category === "temperature") {
      let celsius;
      if (fromUnit === "celsius") {
        celsius = numValue;
      } else if (fromUnit === "fahrenheit") {
        celsius = ((numValue - 32) * 5) / 9;
      } else if (fromUnit === "kelvin") {
        celsius = numValue - 273.15;
      }

      if (toUnit === "celsius") {
        convertedValue = celsius;
      } else if (toUnit === "fahrenheit") {
        convertedValue = (celsius * 9) / 5 + 32;
      } else if (toUnit === "kelvin") {
        convertedValue = celsius + 273.15;
      }
    } else {
      const baseValue = numValue / conversionFactors[category][fromUnit];
      convertedValue = baseValue * conversionFactors[category][toUnit];
    }

    setResult(convertedValue);
    setError(null);
  };

  const units = Object.keys(conversionFactors[category]);

  return (
    <div className="min-h-full pb-20 bg-gradient-to-br from-background to-background/95 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center primary-text-gradient">Unit Converter</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <Label htmlFor="fromUnit">From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <Label htmlFor="toUnit">To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleConvert} className="w-full primary-gradient">
            Convert <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {result !== null && (
            <div className="mt-4 text-center">
              <p className="text-lg font-bold">
                Result: {result.toFixed(4)}{" "}
                {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
