import React from 'react';
import FormInput from './FormInput';

const BasicDetailsStep = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Basic Company Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Your company name (used in URL)"
          name="basic.companyName"
          placeholder="Your company name"
        />
        <FormInput
          label="Your Name"
          name="basic.name"
          placeholder="John Doe"
        />
        <FormInput
          label="Email"
          name="basic.email"
          type="email"
          placeholder="you@example.com"
        />
        <FormInput
          label="Phone Number"
          name="basic.phone"
          placeholder="+91 9876543210"
        />
      </div>
    </div>
  );
};

export default BasicDetailsStep;