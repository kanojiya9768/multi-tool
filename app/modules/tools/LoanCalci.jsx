"use client";
import { useState } from "react";
import { Button } from "/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";

const currencies = [
  { label: "Indian Rupee (₹)", value: "INR" },
  { label: "United States Dollar ($)", value: "USD" },
  { label: "Euro (€)", value: "EUR" },
  { label: "British Pound (£)", value: "GBP" },
  { label: "Japanese Yen (¥)", value: "JPY" },
  { label: "Chinese Yuan (¥)", value: "CNY" },
  { label: "Australian Dollar ($)", value: "AUD" },
  { label: "Canadian Dollar ($)", value: "CAD" },
  { label: "Swiss Franc (CHF)", value: "CHF" },
  { label: "Russian Ruble (₽)", value: "RUB" },
];

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [rateOfInterest, setRateOfInterest] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(5);
  const [currency, setCurrency] = useState("INR");
  const [view, setView] = useState("monthly");
  const [showAmortization, setShowAmortization] = useState(false);

  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const numberOfPayments = tenure * 12;
    const emi =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return emi;
  };

  const monthlyEMI = calculateEMI(loanAmount, rateOfInterest, loanTenure);
  const totalInterest = monthlyEMI * loanTenure * 12 - loanAmount;
  const totalAmount = loanAmount + totalInterest;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateAmortizationSchedule = (view) => {
    const monthlyRate = rateOfInterest / (12 * 100);
    const numberOfPayments = loanTenure * 12;
    let remainingPrincipal = loanAmount;
    const schedule = [];

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = monthlyEMI - interestPayment;
      remainingPrincipal -= principalPayment;

      if (view === "yearly" && i % 12 !== 0) {
        continue;
      }

      const period =
        view === "yearly" ? `${Math.ceil(i / 12)} Year` : `${i} Month`;
      schedule.push({
        period,
        payment: monthlyEMI * (view === "yearly" ? 12 : 1),
        principal: principalPayment * (view === "yearly" ? 12 : 1),
        interest: interestPayment * (view === "yearly" ? 12 : 1),
        balance: remainingPrincipal,
      });
    }

    return schedule;
  };

  const amortizationSchedule = generateAmortizationSchedule(view);

  return (
    <div className="min-h-full pb-20 bg-gradient-to-br from-background to-background/95 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold primary-text-gradient">
            Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="loan-amount">Loan Amount:</Label>
              <Input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="rate-of-interest">Rate of Interest (p.a.):</Label>
              <Input
                id="rate-of-interest"
                type="number"
                step="0.01"
                value={rateOfInterest}
                onChange={(e) => setRateOfInterest(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="loan-tenure">Loan Tenure (years):</Label>
              <Input
                id="loan-tenure"
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="currency">Currency:</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currencyOption) => (
                    <SelectItem
                      key={currencyOption.value}
                      value={currencyOption.value}
                    >
                      {currencyOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Monthly EMI:</span>
              <span className="font-bold">{formatCurrency(monthlyEMI)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Principal Amount:</span>
              <span className="text-green-600 font-bold">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Interest:</span>
              <span className="text-green-600 font-bold">
                {formatCurrency(totalInterest)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Amount:</span>
              <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </div>
            <div className="mt-4">
              <Select value={view} onValueChange={(value) => setView(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                className="p-2"
                onClick={() => setShowAmortization(!showAmortization)}
              >
                Show Amortization Details
              </Button>
            </div>
            {showAmortization && (
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left">Period</th>
                      <th className="border p-2 text-right">Payment</th>
                      <th className="border p-2 text-right">Principal</th>
                      <th className="border p-2 text-right">Interest</th>
                      <th className="border p-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.map((entry, index) => (
                      <tr key={index}>
                        <td className="border p-2 text-left">{entry.period}</td>
                        <td className="border p-2 text-right">
                          {formatCurrency(entry.payment)}
                        </td>
                        <td className="border p-2 text-right">
                          {formatCurrency(entry.principal)}
                        </td>
                        <td className="border p-2 text-right">
                          {formatCurrency(entry.interest)}
                        </td>
                        <td className="border p-2 text-right">
                          {formatCurrency(entry.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
