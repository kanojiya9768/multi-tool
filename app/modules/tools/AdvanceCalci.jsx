"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";



export default function ComplexCalculator() {
    const [currentInput, setCurrentInput] = useState('0')
    const [currentOperation, setCurrentOperation] = useState(null)
    const [firstOperand, setFirstOperand] = useState(null)
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)
    const [history, setHistory] = useState([])
    const [memory, setMemory] = useState(null)
    const [theme, setTheme] = useState('light')
    const [decimalPrecision, setDecimalPrecision] = useState(2)
    const [highlightedButton, setHighlightedButton] = useState(null)
  
    const handleNumberClick = (digit) => {
      if (waitingForSecondOperand) {
        setCurrentInput(digit)
        setWaitingForSecondOperand(false)
      } else {
        setCurrentInput(currentInput === '0' ? digit : currentInput + digit)
      }
      setHighlightedButton(digit)
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleDecimalClick = () => {
      if (waitingForSecondOperand) {
        setCurrentInput('0.')
        setWaitingForSecondOperand(false)
        return
      }
  
      if (!currentInput.includes('.')) {
        setCurrentInput(currentInput + '.')
      }
      setHighlightedButton('.')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleClearClick = () => {
      setCurrentInput('0')
      setCurrentOperation(null)
      setFirstOperand(null)
      setWaitingForSecondOperand(false)
      setHighlightedButton('C')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleBackspaceClick = () => {
      if (currentInput.length > 1) {
        setCurrentInput(currentInput.slice(0, -1))
      } else {
        setCurrentInput('0')
      }
      setHighlightedButton('←')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleOperatorClick = (nextOperator) => {
      const inputValue = parseFloat(currentInput)
  
      if (firstOperand === null) {
        setFirstOperand(inputValue)
      } else if (currentOperation) {
        const result = performCalculation(firstOperand, inputValue, currentOperation)
        setCurrentInput(String(result))
        setFirstOperand(result)
      }
  
      setWaitingForSecondOperand(true)
      setCurrentOperation(nextOperator)
      setCurrentInput(currentInput + ` ${nextOperator} `)
      setHighlightedButton(nextOperator)
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleEqualsClick = () => {
      const inputValue = parseFloat(currentInput)
  
      if (firstOperand !== null && currentOperation !== null) {
        const result = performCalculation(firstOperand, inputValue, currentOperation)
        setCurrentInput(formatNumber(result))
        setFirstOperand(null)
        setCurrentOperation(null)
        setWaitingForSecondOperand(false)
        setHistory([...history, `${firstOperand} ${currentOperation} ${inputValue} = ${result}`])
      }
      setHighlightedButton('=')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const performCalculation = (firstOperand, secondOperand, operator) => {
      switch (operator) {
        case '+':
          return firstOperand + secondOperand
        case '-':
          return firstOperand - secondOperand
        case '*':
          return firstOperand * secondOperand
        case '/':
          if (secondOperand === 0) {
            alert('Error: Division by zero')
            return firstOperand
          }
          return firstOperand / secondOperand
        case '%':
          return firstOperand % secondOperand
        case '^':
          return Math.pow(firstOperand, secondOperand)
        case 'sqrt':
          return Math.sqrt(firstOperand)
        case 'cbrt':
          return Math.cbrt(firstOperand)
        case 'log10':
          return Math.log10(firstOperand)
        case 'ln':
          return Math.log(firstOperand)
        case 'sin':
          return Math.sin(firstOperand)
        case 'cos':
          return Math.cos(firstOperand)
        case 'tan':
          return Math.tan(firstOperand)
        case 'asin':
          return Math.asin(firstOperand)
        case 'acos':
          return Math.acos(firstOperand)
        case 'atan':
          return Math.atan(firstOperand)
        case 'sinh':
          return Math.sinh(firstOperand)
        case 'cosh':
          return Math.cosh(firstOperand)
        case 'tanh':
          return Math.tanh(firstOperand)
        case '!':
          return factorial(firstOperand)
        case 'inv':
          if (firstOperand === 0) {
            alert('Error: Division by zero')
            return firstOperand
          }
          return 1 / firstOperand
        default:
          return secondOperand
      }
    }
  
    const factorial = (n) => {
      if (n < 0) {
        alert('Error: Factorial of negative number')
        return 0
      }
      if (n === 0 || n === 1) return 1
      let result = 1
      for (let i = 2; i <= n; i++) {
        result *= i
      }
      return result
    }
  
    const handleMemoryStore = () => {
      const inputValue = parseFloat(currentInput)
      setMemory(inputValue)
      setHighlightedButton('M+')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleMemoryRecall = () => {
      if (memory !== null) {
        setCurrentInput(memory.toString())
      }
      setHighlightedButton('MR')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleMemoryClear = () => {
      setMemory(null)
      setHighlightedButton('MC')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleMemorySet = () => {
      const inputValue = parseFloat(currentInput)
      setMemory(inputValue)
      setCurrentInput('0')
      setHighlightedButton('MS')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleThemeChange = (value) => {
      setTheme(value)
      setHighlightedButton('Theme')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const handleDecimalPrecisionChange = (value) => {
      setDecimalPrecision(parseInt(value, 10))
      setHighlightedButton('Precision')
      setTimeout(() => setHighlightedButton(null), 200)
    }
  
    const formatNumber = (number) => {
      if (number >= 1e7 || number <= 1e-7) {
        return number.toExponential(decimalPrecision)
      }
      return number.toFixed(decimalPrecision)
    }
  
    useEffect(() => {
      const handleKeyPress = (event) => {
        const key = event.key
  
        if (/\d/.test(key)) {
          handleNumberClick(key)
        } else if (key === '.') {
          handleDecimalClick()
        } else if (key === 'Enter' || key === '=') {
          handleEqualsClick()
        } else if (key === 'Backspace' || key === 'Delete') {
          handleBackspaceClick()
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
          handleOperatorClick(key)
        } else if (key === '^') {
          handleOperatorClick('^')
        } else if (key === 's' && event.shiftKey) {
          handleOperatorClick('sqrt')
        } else if (key === 'c' && event.shiftKey) {
          handleOperatorClick('cbrt')
        } else if (key === 'l' && event.shiftKey) {
          handleOperatorClick('log10')
        } else if (key === 'n' && event.shiftKey) {
          handleOperatorClick('ln')
        } else if (key === 'i' && event.shiftKey) {
          handleOperatorClick('sin')
        } else if (key === 'o' && event.shiftKey) {
          handleOperatorClick('cos')
        } else if (key === 't' && event.shiftKey) {
          handleOperatorClick('tan')
        } else if (key === 'a' && event.shiftKey) {
          handleOperatorClick('asin')
        } else if (key === 'c' && event.shiftKey) {
          handleOperatorClick('acos')
        } else if (key === 'd' && event.shiftKey) {
          handleOperatorClick('atan')
        } else if (key === 'h' && event.shiftKey) {
          handleOperatorClick('sinh')
        } else if (key === 'j' && event.shiftKey) {
          handleOperatorClick('cosh')
        } else if (key === 'k' && event.shiftKey) {
          handleOperatorClick('tanh')
        } else if (key === 'f' && event.shiftKey) {
          handleOperatorClick('!')
        } else if (key === 'p' && event.shiftKey) {
          setCurrentInput(Math.PI.toString())
          setHighlightedButton('π')
          setTimeout(() => setHighlightedButton(null), 200)
        } else if (key === 'e' && event.shiftKey) {
          setCurrentInput(Math.E.toString())
          setHighlightedButton('e')
          setTimeout(() => setHighlightedButton(null), 200)
        } else if (key === 'm' && event.shiftKey) {
          handleMemoryStore()
        } else if (key === 'r' && event.shiftKey) {
          handleMemoryRecall()
        } else if (key === 'c' && event.ctrlKey) {
          handleMemoryClear()
        } else if (key === 's' && event.ctrlKey) {
          handleMemorySet()
        } else if (key === 'i' && event.ctrlKey) {
          handleOperatorClick('inv')
        } else if (key === 'q' && event.ctrlKey) {
          handleOperatorClick('sqrt')
        } else if (key === 'w' && event.ctrlKey) {
          handleOperatorClick('cbrt')
        } else if (key === 'e' && event.ctrlKey) {
          handleOperatorClick('^')
        }
      }
  
      window.addEventListener('keydown', handleKeyPress)
  
      return () => {
        window.removeEventListener('keydown', handleKeyPress)
      }
    }, [currentInput, currentOperation, firstOperand, waitingForSecondOperand, memory])
  
    return (
      <div className={`min-h-full pb-20 bg-gradient-to-br from-background to-background/95 p-8`}>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold primary-text-gradient">Complex Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-4 bg-gray-100 p-2 rounded mb-2">
                <div className="text-right text-2xl font-bold primary-text-gradient">{currentInput}</div>
              </div>
              <Button
                variant="destructive"
                onClick={handleClearClick}
                className={`col-span-1 ${highlightedButton === 'C' ? 'bg-red-600' : ''}`}
              >
                C
              </Button>
              <Button
                onClick={handleBackspaceClick}
                className={`col-span-1 ${highlightedButton === '←' ? 'bg-blue-600' : ''}`}
              >
                ←
              </Button>
              <Button
                onClick={() => handleNumberClick('7')}
                className={`col-span-1 ${highlightedButton === '7' ? 'bg-blue-600' : ''}`}
              >
                7
              </Button>
              <Button
                onClick={() => handleNumberClick('8')}
                className={`col-span-1 ${highlightedButton === '8' ? 'bg-blue-600' : ''}`}
              >
                8
              </Button>
              <Button
                onClick={() => handleNumberClick('9')}
                className={`col-span-1 ${highlightedButton === '9' ? 'bg-blue-600' : ''}`}
              >
                9
              </Button>
              <Button
                onClick={() => handleOperatorClick('/')}
                className={`col-span-1 ${highlightedButton === '/' ? 'bg-blue-600' : ''}`}
              >
                /
              </Button>
              <Button
                onClick={() => handleNumberClick('4')}
                className={`col-span-1 ${highlightedButton === '4' ? 'bg-blue-600' : ''}`}
              >
                4
              </Button>
              <Button
                onClick={() => handleNumberClick('5')}
                className={`col-span-1 ${highlightedButton === '5' ? 'bg-blue-600' : ''}`}
              >
                5
              </Button>
              <Button
                onClick={() => handleNumberClick('6')}
                className={`col-span-1 ${highlightedButton === '6' ? 'bg-blue-600' : ''}`}
              >
                6
              </Button>
              <Button
                onClick={() => handleOperatorClick('*')}
                className={`col-span-1 ${highlightedButton === '*' ? 'bg-blue-600' : ''}`}
              >
                *
              </Button>
              <Button
                onClick={() => handleNumberClick('1')}
                className={`col-span-1 ${highlightedButton === '1' ? 'bg-blue-600' : ''}`}
              >
                1
              </Button>
              <Button
                onClick={() => handleNumberClick('2')}
                className={`col-span-1 ${highlightedButton === '2' ? 'bg-blue-600' : ''}`}
              >
                2
              </Button>
              <Button
                onClick={() => handleNumberClick('3')}
                className={`col-span-1 ${highlightedButton === '3' ? 'bg-blue-600' : ''}`}
              >
                3
              </Button>
              <Button
                onClick={() => handleOperatorClick('-')}
                className={`col-span-1 ${highlightedButton === '-' ? 'bg-blue-600' : ''}`}
              >
                -
              </Button>
              <Button
                onClick={() => handleNumberClick('0')}
                className={`col-span-1 ${highlightedButton === '0' ? 'bg-blue-600' : ''}`}
              >
                0
              </Button>
              <Button
                onClick={handleDecimalClick}
                className={`col-span-1 ${highlightedButton === '.' ? 'bg-blue-600' : ''}`}
              >
                .
              </Button>
              <Button
                onClick={handleEqualsClick}
                className={`col-span-1 ${highlightedButton === '=' ? 'bg-green-600' : ''}`}
              >
                =
              </Button>
              <Button
                onClick={() => handleOperatorClick('+')}
                className={`col-span-1 ${highlightedButton === '+' ? 'bg-blue-600' : ''}`}
              >
                +
              </Button>
              <Button
                onClick={() => handleOperatorClick('%')}
                className={`col-span-1 ${highlightedButton === '%' ? 'bg-blue-600' : ''}`}
              >
                %
              </Button>
              <Button
                onClick={() => handleOperatorClick('^')}
                className={`col-span-1 ${highlightedButton === '^' ? 'bg-blue-600' : ''}`}
              >
                x^y
              </Button>
              <Button
                onClick={() => handleOperatorClick('sqrt')}
                className={`col-span-1 ${highlightedButton === 'sqrt' ? 'bg-blue-600' : ''}`}
              >
                √
              </Button>
              <Button
                onClick={() => handleOperatorClick('cbrt')}
                className={`col-span-1 ${highlightedButton === 'cbrt' ? 'bg-blue-600' : ''}`}
              >
                ∛
              </Button>
              <Button
                onClick={() => handleOperatorClick('log10')}
                className={`col-span-1 ${highlightedButton === 'log10' ? 'bg-blue-600' : ''}`}
              >
                log10
              </Button>
              <Button
                onClick={() => handleOperatorClick('ln')}
                className={`col-span-1 ${highlightedButton === 'ln' ? 'bg-blue-600' : ''}`}
              >
                ln
              </Button>
              <Button
                onClick={() => handleOperatorClick('sin')}
                className={`col-span-1 ${highlightedButton === 'sin' ? 'bg-blue-600' : ''}`}
              >
                sin
              </Button>
              <Button
                onClick={() => handleOperatorClick('cos')}
                className={`col-span-1 ${highlightedButton === 'cos' ? 'bg-blue-600' : ''}`}
              >
                cos
              </Button>
              <Button
                onClick={() => handleOperatorClick('tan')}
                className={`col-span-1 ${highlightedButton === 'tan' ? 'bg-blue-600' : ''}`}
              >
                tan
              </Button>
              <Button
                onClick={() => handleOperatorClick('asin')}
                className={`col-span-1 ${highlightedButton === 'asin' ? 'bg-blue-600' : ''}`}
              >
                asin
              </Button>
              <Button
                onClick={() => handleOperatorClick('acos')}
                className={`col-span-1 ${highlightedButton === 'acos' ? 'bg-blue-600' : ''}`}
              >
                acos
              </Button>
              <Button
                onClick={() => handleOperatorClick('atan')}
                className={`col-span-1 ${highlightedButton === 'atan' ? 'bg-blue-600' : ''}`}
              >
                atan
              </Button>
              <Button
                onClick={() => handleOperatorClick('sinh')}
                className={`col-span-1 ${highlightedButton === 'sinh' ? 'bg-blue-600' : ''}`}
              >
                sinh
              </Button>
              <Button
                onClick={() => handleOperatorClick('cosh')}
                className={`col-span-1 ${highlightedButton === 'cosh' ? 'bg-blue-600' : ''}`}
              >
                cosh
              </Button>
              <Button
                onClick={() => handleOperatorClick('tanh')}
                className={`col-span-1 ${highlightedButton === 'tanh' ? 'bg-blue-600' : ''}`}
              >
                tanh
              </Button>
              <Button
                onClick={() => handleOperatorClick('!')}
                className={`col-span-1 ${highlightedButton === '!' ? 'bg-blue-600' : ''}`}
              >
                !
              </Button>
              <Button
                onClick={() => setCurrentInput(Math.PI.toString())}
                className={`col-span-1 ${highlightedButton === 'π' ? 'bg-blue-600' : ''}`}
              >
                π
              </Button>
              <Button
                onClick={() => setCurrentInput(Math.E.toString())}
                className={`col-span-1 ${highlightedButton === 'e' ? 'bg-blue-600' : ''}`}
              >
                e
              </Button>
              <Button
                onClick={() => setCurrentInput(Math.abs(parseFloat(currentInput)).toString())}
                className={`col-span-1 ${highlightedButton === '|x|' ? 'bg-blue-600' : ''}`}
              >
                |x|
              </Button>
              <Button
                onClick={handleMemoryStore}
                className={`col-span-1 ${highlightedButton === 'M+' ? 'bg-blue-600' : ''}`}
              >
                M+
              </Button>
              <Button
                onClick={handleMemoryRecall}
                className={`col-span-1 ${highlightedButton === 'MR' ? 'bg-blue-600' : ''}`}
              >
                MR
              </Button>
              <Button
                onClick={handleMemoryClear}
                className={`col-span-1 ${highlightedButton === 'MC' ? 'bg-blue-600' : ''}`}
              >
                MC
              </Button>
              <Button
                onClick={handleMemorySet}
                className={`col-span-1 ${highlightedButton === 'MS' ? 'bg-blue-600' : ''}`}
              >
                MS
              </Button>
              <Button
                onClick={() => handleOperatorClick('inv')}
                className={`col-span-1 ${highlightedButton === 'inv' ? 'bg-blue-600' : ''}`}
              >
                1/x
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select onValueChange={handleThemeChange} defaultValue="light">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="decimal-precision">Decimal Precision</Label>
                <Select onValueChange={handleDecimalPrecisionChange} defaultValue="2">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select decimal precision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>History</Label>
              <div className="bg-gray-100 p-2 rounded h-40 overflow-y-auto">
                {history.map((entry, index) => (
                  <div key={index} className="mb-1">{entry}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }