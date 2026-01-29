import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    const templateParams = {
      to_email: orderData.customerEmail,
      customer_name: orderData.customerName,
      order_id: orderData.orderId,
      order_date: orderData.orderDate,
      delivery_date: orderData.deliveryDate,
      total_amount: orderData.totalAmount,
      items_list: orderData.itemsList,
      delivery_address: orderData.deliveryAddress,
      phone_number: orderData.phoneNumber
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};