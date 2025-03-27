'use client';
import { useForm } from 'react-hook-form';
import { parsePhoneNumberFromString } from 'libphonenumber-js'; // Import for validation
import InputHook from '@/lib/hooks/InputHook';

export default function Page() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      qualification: '',
      areaOfInterest: [],
      resume: null,
      captcha: '',
    },
  });

  // Watch the phone field to get the current value
  const phoneValue = watch('phone');

  // Custom validation function for phone number based on country code
  const validatePhoneNumber = (value) => {
    if (!value) return 'Phone number is required';

    console.log('Validate phone value:', value);

    // Ensure the value starts with '+' if it doesn’t already
    const normalizedValue = value.startsWith('+') ? value : `+${value}`;
    const phoneNumber = parsePhoneNumberFromString(normalizedValue);

    if (!phoneNumber) {
      console.log('Parsing failed for:', normalizedValue);
      return 'Invalid phone number format';
    }

    return phoneNumber.isValid() || `Invalid phone number for ${phoneNumber.country}`;
  };
  const FormFields = [
    {
      name: 'fullname',
      subName: 'Full Name',
      inputType: 'input',
      type: 'text',
      rules: { required: 'Full name is required' },
      placeholder: 'Enter your full name',
      inputClassName: 'bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
      required: true,
    },
    {
      name: 'email',
      subName: 'Email',
      inputType: 'input',
      type: 'email',
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Invalid email address',
        },
      },
      placeholder: 'Enter your email',
      inputClassName: 'bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
      required: true,
    },
    {
      name: 'phone',
      subName: 'Phone Number',
      inputType: 'phone',
      rules: {
        required: 'Phone number is required',
        validate: validatePhoneNumber, // Use custom validation
      },
      placeholder: 'Enter your phone number',
      inputClassName: 'bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
      required: true,
    },
    {
      name: 'qualification',
      subName: 'Qualification',
      inputType: 'select',
      FilterData: [
        { name: 'High School', value: 'high-school' },
        { name: 'Bachelor’s Degree', value: 'bachelor' },
        { name: 'Master’s Degree', value: 'master' },
        { name: 'PhD', value: 'phd' },
      ],
      rules: { required: 'Qualification is required' },
      placeholder: 'Select your qualification',
      selectClassName: 'w-full',
      required: true,
    },
    {
      name: 'areaOfInterest',
      subName: 'Area of Interest',
      inputType: 'select',
      FilterData: [
        { name: 'Technology', value: 'tech' },
        { name: 'Science', value: 'science' },
        { name: 'Arts', value: 'arts' },
        { name: 'Business', value: 'business' },
      ],
      rules: {
        required: 'At least one interest is required',
        validate: (value) => (value && value.length > 0) || 'Select at least one interest',
      },
      placeholder: 'Select your areas of interest',
      selectClassName: 'w-full',
      multiple: true,
      required: true,
    },
    {
      name: 'resume',
      subName: 'Upload Resume',
      inputType: 'file',
      rules: {
        required: 'Resume is required',
        validate: (file) =>
          file && file.type === 'application/pdf' ? true : 'Only PDF files are allowed',
      },
      accept: 'application/pdf',
      inputClassName: 'bg-gray-50 border-gray-300 rounded-lg shadow-sm',
      required: true,
    },
    {
      name: 'captcha',
      subName: 'Captcha',
      inputType: 'input',
      type: 'text',
      rules: {
        required: 'Captcha is required',
        validate: (value) => value === '1234' || 'Invalid captcha',
      },
      placeholder: 'Enter captcha code (e.g., 1234)',
      inputClassName: 'bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
      required: true,
    },
  ];

  const onSubmit = (data) => {
    console.log('Submitted:', data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg isolate mt-32">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {FormFields.map((field, index) => (
          <InputHook
            key={index}
            name={field.name}
            subName={field.subName}
            inputType={field.inputType}
            type={field.type}
            FilterData={field.FilterData}
            control={control}
            errors={errors}
            rules={field.rules}
            placeholder={field.placeholder}
            inputClassName={field.inputClassName}
            selectClassName={field.selectClassName}
            multiple={field.multiple}
            accept={field.accept}
            required={field.required}
            disabled={field?.disabled}
          />
        ))}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}