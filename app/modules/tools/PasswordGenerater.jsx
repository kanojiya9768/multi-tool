"use client";
import React, { useState, useEffect } from "react";
import { Input } from "/components/ui/input";
import { Button } from "/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";
import { Label } from "/components/ui/label";
import { Copy } from "lucide-react";
import { Progress } from "/components/ui/progress";
import { Checkbox } from "/components/ui/checkbox";
import { Slider } from "/components/ui/slider";
import { Download } from "lucide-react";

const generateRandomToken = (
  length,
  includeSpecialChars,
  includeNumbers,
  includeUppercase,
  includeLowercase,
  avoidSimilarChars
) => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  const similarChars = "1lIO0";

  let allChars = "";
  if (includeUppercase) allChars += uppercaseChars;
  if (includeLowercase) allChars += chars;
  if (includeNumbers) allChars += numberChars;
  if (includeSpecialChars) allChars += specialChars;
  if (avoidSimilarChars)
    allChars = allChars
      .split("")
      .filter((char) => !similarChars.includes(char))
      .join("");

  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    token += allChars[randomIndex];
  }
  return token;
};

const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[\W_]/.test(password)) strength += 1;
  return strength;
};

const calculateEntropy = (password) => {
  const charsetSize = new Set(password).size;
  return Math.log2(Math.pow(charsetSize, password.length));
};

const downloadPasswords = (passwords) => {
  const blob = new Blob([passwords.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "passwords.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [avoidSimilarChars, setAvoidSimilarChars] = useState(true);
  const [passwords, setPasswords] = useState([]);
  const [copied, setCopied] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedPreferences = JSON.parse(
      localStorage.getItem("passwordGeneratorPreferences")
    );
    if (savedPreferences) {
      setLength(savedPreferences.length || 12);
      setIncludeSpecialChars(savedPreferences.includeSpecialChars || false);
      setIncludeNumbers(savedPreferences.includeNumbers || true);
      setIncludeUppercase(savedPreferences.includeUppercase || true);
      setIncludeLowercase(savedPreferences.includeLowercase || true);
      setAvoidSimilarChars(savedPreferences.avoidSimilarChars || true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "passwordGeneratorPreferences",
      JSON.stringify({
        length,
        includeSpecialChars,
        includeNumbers,
        includeUppercase,
        includeLowercase,
        avoidSimilarChars,
      })
    );
  }, [
    length,
    includeSpecialChars,
    includeNumbers,
    includeUppercase,
    includeLowercase,
    avoidSimilarChars,
  ]);

  const generatePassword = () => {
    const generatedPassword = generateRandomToken(
      length,
      includeSpecialChars,
      includeNumbers,
      includeUppercase,
      includeLowercase,
      avoidSimilarChars
    );
    setPasswords([generatedPassword]);
    setCopied({});
    setHistory((prevHistory) => [
      generatedPassword,
      ...prevHistory.slice(0, 9),
    ]); // Keep last 10 passwords
  };

  const generateMultiplePasswords = () => {
    const generatedPasswords = Array.from({ length: 5 }, () =>
      generateRandomToken(
        length,
        includeSpecialChars,
        includeNumbers,
        includeUppercase,
        includeLowercase,
        avoidSimilarChars
      )
    );
    setPasswords(generatedPasswords);
    setCopied({});
    setHistory((prevHistory) => [
      ...generatedPasswords,
      ...prevHistory.slice(0, 5),
    ]); // Keep last 10 passwords
  };

  const handleCopyToClipboard = (index) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(passwords[index])
        .then(() => {
          setCopied((prevCopied) => ({ ...prevCopied, [index]: true }));
          setTimeout(() => {
            setCopied((prevCopied) => ({ ...prevCopied, [index]: false }));
          }, 2000);
        })
        .catch((err) => console.error("Failed to copy password: ", err));
    }
  };

  const strength = calculatePasswordStrength(passwords[0] || "");
  const entropy = calculateEntropy(passwords[0] || "");

  const getStrengthMessage = (strength) => {
    if (strength === 1) return "Very Weak";
    if (strength === 2) return "Weak";
    if (strength === 3) return "Medium";
    if (strength === 4) return "Strong";
    if (strength === 5) return "Very Strong";
    return "Very Weak";
  };

  const getSecurityWarning = (strength) => {
    if (strength < 2)
      return "Password is very weak. Consider increasing length or including more character types.";
    if (strength === 2)
      return "Password is weak. Consider increasing length or including more character types.";
    if (strength === 3)
      return "Password is medium strength. Consider increasing length or including more character types.";
    if (strength === 4) return "Password is strong.";
    if (strength === 5) return "Password is very strong.";
    return "";
  };

  return (
    <div className="min-h-full pb-20 bg-gradient-to-br from-background to-background/95 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center primary-text-gradient">
            Password Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <Label htmlFor="length" className="text-sm font-medium">
              Password Length
            </Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min={8}
              max={64}
              className="w-full"
            />
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              max={64}
              min={8}
              step={1}
              className="w-full"
            />
            <p className="text-sm font-medium">{length}</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked)}
              />
              <Label htmlFor="uppercase" className="text-sm font-medium">
                Include Uppercase Letters
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked)}
              />
              <Label htmlFor="lowercase" className="text-sm font-medium">
                Include Lowercase Letters
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked)}
              />
              <Label htmlFor="numbers" className="text-sm font-medium">
                Include Numbers
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="specialChars"
                checked={includeSpecialChars}
                onCheckedChange={(checked) => setIncludeSpecialChars(checked)}
              />
              <Label htmlFor="specialChars" className="text-sm font-medium">
                Include Special Characters
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="avoidSimilarChars"
                checked={avoidSimilarChars}
                onCheckedChange={(checked) => setAvoidSimilarChars(checked)}
              />
              <Label
                htmlFor="avoidSimilarChars"
                className="text-sm font-medium"
              >
                Avoid Similar Characters (1, l, I, O, 0)
              </Label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <Button onClick={generatePassword} className="w-full primary-gradient">
              Generate Password
            </Button>
            <Button onClick={generateMultiplePasswords} className="w-full primary-gradient">
              Generate 5 Passwords
            </Button>
          </div>
          {passwords.length > 0 && (
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p className="text-lg font-semibold text-center">
                Generated Passwords:
              </p>
              {passwords.map((password, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2"
                >
                  <p className="text-gray-800 whitespace-pre-wrap overflow-hidden text-ellipsis max-w-full line-clamp-1">
                    {password.length > 20
                      ? password.slice(0, 20) + "..."
                      : password}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleCopyToClipboard(index)}
                  >
                    <Copy className="mr-2 h-4 w-4" />{" "}
                    {copied[index] ? "Copied!" : "Copy"}
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => downloadPasswords(passwords)}
                className="w-full mt-2 primary-gradient text-white"
              >
                <Download className="mr-2 h-4 w-4" /> Download Passwords
              </Button>
            </div>
          )}
          {passwords.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Password Strength</Label>
              <Progress value={strength * 20} className="mt-1" />
              <p className="text-sm mt-1">{getStrengthMessage(strength)}</p>
            </div>
          )}
          {passwords.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Entropy</Label>
              <p className="text-sm mt-1">{entropy.toFixed(2)} bits</p>
            </div>
          )}
          {passwords.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Security Warning</Label>
              <p className="text-sm mt-1 text-red-500">
                {getSecurityWarning(strength)}
              </p>
            </div>
          )}
          {history.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium">Password History</Label>
              <div className="bg-gray-100 p-4 rounded mt-1">
                {history.map((password, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                  >
                    <p className="text-gray-800 whitespace-pre-wrap overflow-hidden text-ellipsis max-w-full line-clamp-1">
                      {password.length > 20
                        ? password.slice(0, 20) + "..."
                        : password}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
