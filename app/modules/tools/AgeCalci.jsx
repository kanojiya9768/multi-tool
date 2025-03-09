"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Clock, X } from "lucide-react"
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Progress } from "/components/ui/progress"

export default function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [ageYears, setAgeYears] = useState(null)
  const [ageMonths, setAgeMonths] = useState(null)
  const [ageDays, setAgeDays] = useState(null)
  const [ageWeeks, setAgeWeeks] = useState(null)
  const [ageHours, setAgeHours] = useState(null)
  const [ageMinutes, setAgeMinutes] = useState(null)
  const [ageSeconds, setAgeSeconds] = useState(null)
  const [error, setError] = useState(null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isCurrentDatePickerOpen, setIsCurrentDatePickerOpen] = useState(false)

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate())

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [currentDay, setCurrentDay] = useState(currentDate.getDate())

  useEffect(() => {
    if (dateOfBirth) {
      calculateAge(dateOfBirth, currentDate)
    }
  }, [dateOfBirth, currentDate])

  const calculateAge = (dob, current) => {
    if (dob > current) {
      setError('Date of birth cannot be after the current date')
      setAgeYears(null)
      setAgeMonths(null)
      setAgeDays(null)
      setAgeWeeks(null)
      setAgeHours(null)
      setAgeMinutes(null)
      setAgeSeconds(null)
      return
    }

    const years = differenceInYears(current, dob)
    const months = differenceInMonths(current, dob) % 12
    const days = differenceInDays(current, new Date(current.getFullYear(), current.getMonth(), dob.getDate()))
    const weeks = differenceInWeeks(current, dob)
    const hours = differenceInHours(current, dob)
    const minutes = differenceInMinutes(current, dob)
    const seconds = differenceInSeconds(current, dob)

    setError(null)
    setAgeYears(years)
    setAgeMonths(months)
    setAgeDays(days)
    setAgeWeeks(weeks)
    setAgeHours(hours)
    setAgeMinutes(minutes)
    setAgeSeconds(seconds)
  }

  const handleDateOfBirthChange = (year, month, day) => {
    const dob = new Date(year, month, day)
    setDateOfBirth(dob)
    setSelectedYear(year)
    setSelectedMonth(month)
    setSelectedDay(day)
    setIsDatePickerOpen(false) // Close the date picker after selecting a date
  }

  const handleCurrentDateChange = (year, month, day) => {
    const current = new Date(year, month, day)
    setCurrentDate(current)
    setCurrentYear(year)
    setCurrentMonth(month)
    setCurrentDay(day)
    setIsCurrentDatePickerOpen(false) // Close the date picker after selecting a date
  }

  const handleClear = () => {
    setDateOfBirth(null)
    setSelectedYear(currentDate.getFullYear())
    setSelectedMonth(currentDate.getMonth())
    setSelectedDay(currentDate.getDate())
    setCurrentDate(new Date())
    setCurrentYear(currentDate.getFullYear())
    setCurrentMonth(currentDate.getMonth())
    setCurrentDay(currentDate.getDate())
    setAgeYears(null)
    setAgeMonths(null)
    setAgeDays(null)
    setAgeWeeks(null)
    setAgeHours(null)
    setAgeMinutes(null)
    setAgeSeconds(null)
    setError(null)
  }

  const handleSetCurrentDate = () => {
    const today = new Date()
    setDateOfBirth(today)
    setSelectedYear(today.getFullYear())
    setSelectedMonth(today.getMonth())
    setSelectedDay(today.getDate())
    setIsDatePickerOpen(false) // Close the date picker after setting current date
  }

  const handleSetCurrentDateToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setCurrentYear(today.getFullYear())
    setCurrentMonth(today.getMonth())
    setCurrentDay(today.getDate())
    setIsCurrentDatePickerOpen(false) // Close the date picker after setting current date
  }

  const renderDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center text-gray-300"> </div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = dateOfBirth && date.toDateString() === dateOfBirth.toDateString()

      days.push(
        <button
          key={day}
          className={`text-center p-1 rounded-full w-8 h-8 ${
            isToday ? 'bg-blue-500 text-white' : isSelected ? 'bg-indigo-500 text-white' : 'text-gray-700'
          } hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          onClick={() => {
            setSelectedDay(day)
            handleDateOfBirthChange(year, month, day)
          }}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const renderCurrentDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center text-gray-300"> </div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = currentDate.toDateString() === date.toDateString()

      days.push(
        <button
          key={day}
          className={`text-center p-1 rounded-full w-8 h-8 ${
            isToday ? 'bg-blue-500 text-white' : isSelected ? 'bg-indigo-500 text-white' : 'text-gray-700'
          } hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          onClick={() => {
            setCurrentDay(day)
            handleCurrentDateChange(year, month, day)
          }}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const renderMonths = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return months.map((month, index) => (
      <option key={index} value={index}>
        {month}
      </option>
    ))
  }

  const renderYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear; year >= 1900; year--) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      )
    }
    return years
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-full pb-20 bg-gradient-to-br from-background to-background/95 p-8"
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold primary-text-gradient">Age Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900 primary-text-gradient">
              Date of Birth
            </Label>
            <div className="relative">
              <Input
                id="dob"
                type="text"
                value={dateOfBirth ? format(dateOfBirth, 'PPP') : ''}
                readOnly
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                aria-label="Date of Birth"
              />
              {isDatePickerOpen && (
                <div className="absolute z-20 bg-white top-full left-0 right-0 mt-1  border border-gray-300 rounded-lg shadow-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex space-x-2">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-2 py-1"
                        aria-label="Year"
                      >
                        {renderYears()}
                      </select>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-2 py-1"
                        aria-label="Month"
                      >
                        {renderMonths()}
                      </select>
                    </div>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setIsDatePickerOpen(false)}
                      aria-label="Close Date Picker"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderDays(selectedYear, selectedMonth)}
                  </div>
                  <button
                    className="mt-2 px-4 py-2 bg-indigo-500  text-white rounded-md hover:bg-indigo-600 primary-gradient focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleSetCurrentDate}
                    aria-label="Set Current Date"
                  >
                    Set to Current Date
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Label htmlFor="current" className="block text-sm font-medium leading-6 text-gray-900">
              Current Date
            </Label>
            <div className="relative">
              <Input
                id="current"
                type="text"
                value={format(currentDate, 'PPP')}
                readOnly
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onClick={() => setIsCurrentDatePickerOpen(!isCurrentDatePickerOpen)}
                aria-label="Current Date"
              />
              {isCurrentDatePickerOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex space-x-2">
                      <select
                        value={currentYear}
                        onChange={(e) => setCurrentYear(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-2 py-1"
                        aria-label="Year"
                      >
                        {renderYears()}
                      </select>
                      <select
                        value={currentMonth}
                        onChange={(e) => setCurrentMonth(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-2 py-1"
                        aria-label="Month"
                      >
                        {renderMonths()}
                      </select>
                    </div>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setIsCurrentDatePickerOpen(false)}
                      aria-label="Close Date Picker"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCurrentDays(currentYear, currentMonth)}
                  </div>
                  <button
                    className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md primary-gradient hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleSetCurrentDateToToday}
                    aria-label="Set Current Date to Today"
                  >
                    Set to Today
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-2 text-sm text-red-600"
              role="alert"
            >
              {error}
            </motion.p>
          )}
          {ageYears !== null && ageMonths !== null && ageDays !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-gray-500" />
                <p className="text-xl font-bold">
                  You are {ageYears} years, {ageMonths} months, and {ageDays} days old on {format(currentDate, 'PPP')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-gray-500" />
                <p className="text-lg font-medium">
                  {ageWeeks} weeks, {ageDays % 7} days
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-gray-500" />
                <p className="text-lg font-medium">
                  {ageHours} hours, {ageMinutes % 60} minutes
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-gray-500" />
                <p className="text-lg font-medium">
                  {ageSeconds} seconds
                </p>
              </div>
              <div className="mt-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Age Breakdown</Label>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Years</span>
                    <span className="text-gray-900 font-medium">{ageYears}</span>
                  </div>
                  <Progress value={(ageYears / 100) * 100} className="h-2" />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Months</span>
                    <span className="text-gray-900 font-medium">{ageMonths}</span>
                  </div>
                  <Progress value={(ageMonths / 12) * 100} className="h-2" />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Days</span>
                    <span className="text-gray-900 font-medium">{ageDays}</span>
                  </div>
                  <Progress value={(ageDays / 365) * 100} className="h-2" />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Weeks</span>
                    <span className="text-gray-900 font-medium">{ageWeeks}</span>
                  </div>
                  <Progress value={(ageWeeks / 52) * 100} className="h-2" />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Hours</span>
                    <span className="text-gray-900 font-medium">{ageHours}</span>
                  </div>
                  <Progress value={(ageHours / 8760) * 100} className="h-2" />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Minutes</span>
                    <span className="text-gray-900 font-medium">{ageMinutes}</span>
                  </div>
                  <Progress value={(ageMinutes / 525600) * 100} className="h-2" />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Seconds</span>
                    <span className="text-gray-900 font-medium">{ageSeconds}</span>
                  </div>
                  <Progress value={(ageSeconds / 31536000) * 100} className="h-2" />
                </div>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleClear}
                aria-label="Clear Date of Birth"
              >
                Clear
              </button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}