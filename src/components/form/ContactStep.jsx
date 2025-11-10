import React from 'react';
import FormInput from './FormInput';

const ContactStep = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Contact Section Details</h3>
      
      <FormInput
        label="Contact Message"
        name="contact.message"
        placeholder="e.g., Get in touch for collaborations."
        isTextarea={true}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Contact Email"
          name="contact.email"
          type="email"
          placeholder="your.contact.email@example.com"
        />
        <FormInput
          label="Contact Phone"
          name="contact.phone"
          placeholder="+91..."
        />
      </div>
    </div>
  );
};

export default ContactStep;