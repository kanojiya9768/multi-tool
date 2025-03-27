"use client";
import React, { useState, useCallback } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import PhoneInput from "react-phone-input-2"; // Updated library
import "react-phone-input-2/lib/style.css"; // Updated CSS import

const InputHook = ({
  name,
  subName,
  control,
  rules,
  errors,
  type = "text",
  placeholder,
  parentClassName = "",
  subNameClassName = "",
  inputClassName = "",
  textareaClassName = "",
  selectClassName = "", // Container ke liye Tailwind class
  selectStyles = {}, // Custom styles object for overriding defaults
  inputType = "input",
  FilterData = [],
  disabled = false,
  required = false,
  rows = 4,
  readOnly = false,
  multiple = false,
  accept,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e, onChange) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files[0];
    if (files) onChange(files);
  }, []);

  // Default custom styles for react-select with Tailwind CSS
  const defaultSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f9fafb", // Tailwind gray-50
      borderRadius: "0.5rem", // Tailwind rounded-lg
      borderColor: errors[name] ? "#ef4444" : "#d1d5db", // Tailwind red-500 or gray-300
      padding: "0.25rem", // Tailwind p-1
      minHeight: multiple ? "2.5rem" : "auto", // Tailwind h-10 for multi-select
      "&:hover": {
        borderColor: errors[name] ? "#ef4444" : "#93c5fd", // Tailwind blue-300 on hover
      },
      boxShadow: "none",
      ...(selectStyles.control || {}), // Allow override
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff", // White
      borderRadius: "0.5rem", // Tailwind rounded-lg
      border: "1px solid #d1d5db", // Tailwind gray-300
      marginTop: "0.25rem", // Tailwind mt-1
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", // Tailwind shadow-md
      ...(selectStyles.menu || {}), // Allow override
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? multiple
          ? "#10b981" // Tailwind green-500 for multi-select
          : "#3b82f6" // Tailwind blue-500 for single select
        : state.isFocused
        ? multiple
          ? "#d1fae5" // Tailwind green-100
          : "#dbeafe" // Tailwind blue-100
        : "#ffffff", // White
      color: state.isSelected ? "#ffffff" : "#374151", // Tailwind gray-700
      padding: "0.5rem 1rem", // Tailwind py-2 px-4
      "&:active": {
        backgroundColor: multiple ? "#059669" : "#2563eb", // Tailwind green-600 or blue-600
      },
      ...(selectStyles.option || {}), // Allow override
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#10b981", // Tailwind green-500 for multi-select tags
      borderRadius: "0.25rem", // Tailwind rounded
      ...(selectStyles.multiValue || {}), // Allow override
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ffffff", // White text in tags
      ...(selectStyles.multiValueLabel || {}), // Allow override
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#059669", // Tailwind green-600 on hover
        color: "#ffffff",
      },
      ...(selectStyles.multiValueRemove || {}), // Allow override
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af", // Tailwind gray-400
      ...(selectStyles.placeholder || {}), // Allow override
    }),
  };

  return (
    <div className={`flex flex-col gap-2 ${parentClassName}`}>
      {subName && (
        <div className="flex gap-1 items-center">
          <span
            className={`!capitalize text-sm text-black font-medium ${subNameClassName}`}
          >
            {subName}
          </span>
          {required && <span className="text-xl text-red-500 pt-1">*</span>}
        </div>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <div>
            {inputType === "input" ? (
              <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                className={`
                  w-full p-3 border rounded-md
                  ${errors[name] ? "border-red-500" : "border-gray-300"}
                  ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                  ${readOnly ? "bg-gray-50 cursor-default" : ""}
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${inputClassName}
                `}
              />
            ) : inputType === "textarea" ? (
              <textarea
              placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                rows={rows}
                className={`
                  w-full p-3 border rounded-md
                  ${errors[name] ? "border-red-500" : "border-gray-300"}
                  ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                  ${readOnly ? "bg-gray-50 cursor-default" : ""}
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${textareaClassName}
                `}
              />
            ) : inputType === "select" ? (
              <Select
                options={FilterData.map(
                  ({ name: optName, value: optValue }) => ({
                    label: optName,
                    value: optValue,
                  })
                )}
                onChange={(selected) => {
                  if (multiple) {
                    onChange(selected ? selected.map((opt) => opt.value) : []);
                  } else {
                    onChange(selected ? selected.value : null);
                  }
                }}
                value={
                  multiple

                    ? FilterData.filter((opt) =>
                        value?.includes(opt.value)
                      ).map((opt) => ({
                        label: opt.name,
                        value: opt.value,
                      }))
                    : FilterData.filter((opt) => opt.value === value).map(
                        (opt) => ({
                          label: opt.name,
                          value: opt.value,
                        })
                      )[0] || null
                }
                isDisabled={disabled}
                isMulti={multiple}
                placeholder={placeholder}
                className={`w-full ${selectClassName}`} // Default w-full + user-provided classes
                classNamePrefix="react-select"
                styles={defaultSelectStyles} // Apply default styles with override option
                isSearchable={true}
              />
            ) : inputType === "phone" ? (
              <PhoneInput
              country="in"
              enableSearch={true}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              placeholder={placeholder}
              inputStyle={{
                width: "100%", // Full width for input
                padding: "0.75rem 1rem", // Matches p-3
                paddingLeft: "3rem", // Space for country code button
                borderRadius: "0.375rem", // Matches rounded-md
                border: errors[name] ? "1px solid #ef4444" : "1px solid #d1d5db",
                backgroundColor: disabled ? "#f3f4f6" : "#f9fafb",
                cursor: disabled ? "not-allowed" : "text",
                outline: "none",
                height: "2.75rem", // Matches other inputs
                fontSize: "1rem", // Consistent font size
              }}
              containerStyle={{
                width: "100%", // Ensure container takes full width
                position: "relative",
              }}
              buttonStyle={{
                width: "2.5rem", // Fixed width for country code button
                height: "100%", // Matches input height
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
                borderRight: "none",
                backgroundColor: disabled ? "#f3f4f6" : "#f9fafb",
                border: errors[name] ? "1px solid #ef4444" : "1px solid #d1d5db",
                borderRight: "none",
                padding: "0",
                display: "flex", // Ensure flag is visible
                alignItems: "center",
                justifyContent: "center",
              }}
              dropdownStyle={{
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              className={`${inputClassName}`} // Allow additional custom classes
            />
            ) : inputType === "file" ? (
              <div
                className={`
                  w-full p-6 border-2 border-dashed rounded-md text-center
                  ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-gray-50"
                  }
                  ${errors[name] ? "border-red-500" : ""}
                  ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                  ${inputClassName}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, onChange)}
              >
                <input
                  type="file"
                  onChange={(e) => onChange(e.target.files[0])}
                  accept={accept}
                  disabled={disabled}
                  className="hidden"
                  id={`file-input-${name}`}
                />
                <label
                  htmlFor={`file-input-${name}`}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-600">
                    {value ? (
                      <span className="font-medium">{value.name}</span>
                    ) : isDragging ? (
                      "Drop file here"
                    ) : (
                      <>
                        <span className="text-blue-500 underline">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </>
                    )}
                  </p>
                  {accept && (
                    <p className="text-sm text-gray-400">
                      ({accept} files only)
                    </p>
                  )}
                </label>
              </div>
            ) : null}
            {errors[name] && (
              <span className="text-red-500 text-sm">
                {errors[name].message}
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default InputHook;