export const ContactUsFormTemlate = (data) => {
  const { name, email, phone, country, reason, message } = data;
  data;
  return `
 <body>
  <div style="max-width: 800px; margin: 0 auto; padding: 24px; animation: fadeIn 1s ease-in-out;">
   <div style="background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 32px; position: relative; overflow: hidden;">
    <div style="position: relative; z-index: 10;">
     <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 24px; color: #1f2937;">
      New Contact Us Form Submission
     </h2>
     <table style="width: 100%; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
      <tbody>
       <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 16px; color: #374151; font-weight: bold; background: #f3f4f6;">
         Name
        </td>
        <td style="padding: 16px; color: #6b7280;">
         ${name}
        </td>
       </tr>
       <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 16px; color: #374151; font-weight: bold; background: #f3f4f6;">
         Email
        </td>
        <td style="padding: 16px; color: #6b7280;">
         ${email}
        </td>
       </tr>
       <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 16px; color: #374151; font-weight: bold; background: #f3f4f6;">
         Phone
        </td>
        <td style="padding: 16px; color: #6b7280;">
         ${phone}
        </td>
       </tr>
       <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 16px; color: #374151; font-weight: bold; background: #f3f4f6;">
         Country
        </td>
        <td style="padding: 16px; color: #6b7280;">
         ${country}
        </td>
       </tr>
       <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 16px; color: #374151; font-weight: bold; background: #f3f4f6;">
         Reason
        </td>
        <td style="padding: 16px; color: #6b7280;">
         ${reason}
        </td>
       </tr>
       <tr>
        <td style="padding: 16px; color: #374151; font-weight: bold; background: #f3f4f6;">
         Message
        </td>
        <td style="padding: 16px; color: #6b7280;">
         ${message}
        </td>
       </tr>
      </tbody>
     </table>
    </div>
   </div>
  </div>
 </body>
`;
};

export const ContactUsThankYouTemplate = (data) => {
    const { name, email, phone, country, reason, message } = data;
  return `
 <body style="font-family: Arial, sans-serif; background-color: #f0f4f8; margin: 0; padding: 0;">
  <div style="max-width: 800px; margin: 0 auto; padding: 24px; animation: fadeIn 1s ease-in-out;">
   <table style="width: 100%; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
    <thead>
     <tr>
      <th colspan="2" style="background-color: #4a90e2; color: white; padding: 16px; text-align: center;">
       <h2 style="margin: 0;">
        Thank You for Contacting Us
       </h2>
      </th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td colspan="2" style="padding: 24px;">
       <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">
        Dear ${name},
       </p>
       <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">
        Thank you for reaching out to us. We have received your message and will get back to you as soon as possible. Below is a summary of your submission:
       </p>
      </td>
     </tr>
     <tr>
      <td style="padding: 16px; background-color: #f3f4f6; color: #374151; font-weight: bold; text-align: left;">
       Name
      </td>
      <td style="padding: 16px; color: #6b7280; text-align: left;">
       ${name}
      </td>
     </tr>
     <tr>
      <td style="padding: 16px; background-color: #f3f4f6; color: #374151; font-weight: bold; text-align: left;">
       Email
      </td>
      <td style="padding: 16px; color: #6b7280; text-align: left;">
       ${email}
      </td>
     </tr>
     <tr>
      <td style="padding: 16px; background-color: #f3f4f6; color: #374151; font-weight: bold; text-align: left;">
       Phone
      </td>
      <td style="padding: 16px; color: #6b7280; text-align: left;">
       ${phone}
      </td>
     </tr>
     <tr>
      <td style="padding: 16px; background-color: #f3f4f6; color: #374151; font-weight: bold; text-align: left;">
       Country
      </td>
      <td style="padding: 16px; color: #6b7280; text-align: left;">
       ${country}
      </td>
     </tr>
     <tr>
      <td style="padding: 16px; background-color: #f3f4f6; color: #374151; font-weight: bold; text-align: left;">
       Reason
      </td>
      <td style="padding: 16px; color: #6b7280; text-align: left;">
      ${reason}
      </td>
     </tr>
     <tr>
      <td style="padding: 16px; background-color: #f3f4f6; color: #374151; font-weight: bold; text-align: left;">
       Message
      </td>
      <td style="padding: 16px; color: #6b7280; text-align: left;">
      ${message}
      </td>
     </tr>
    </tbody>
    <tfoot>
     <tr>
      <td colspan="2" style="text-align: center; padding: 16px; background-color: #f3f4f6;">
       <p style="font-size: 16px; color: #374151;">
        Best regards,
        <br/>
        The Multi Tool Team
       </p>
      </td>
     </tr>
    </tfoot>
   </table>
  </div>
 </body>`;
};
