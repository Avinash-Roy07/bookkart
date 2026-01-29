import emailjs from '@emailjs/browser';

// Your exact EmailJS credentials
const SERVICE_ID = 'service_8wi3pn9';
const TEMPLATE_ID = 'template_y1gpl3k';
const PUBLIC_KEY = 'coG1Dv03xyu-g0x9c';

// Initialize EmailJS with your public key
emailjs.init(PUBLIC_KEY);

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (userEmail, otp) => {
  try {
    const templateParams = {
      email: userEmail,
      user_name: userEmail.split('@')[0],
      otp_code: otp
    };

    console.log('Sending email with params:', templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log('EmailJS response:', response);
    return { success: true, message: 'OTP sent successfully!' };
  } catch (error) {
    console.error('EmailJS error details:', error);
    return { success: false, message: 'Failed to send OTP. Please try again.' };
  }
};

const otpStorage = new Map();

export const storeOTP = (email, otp) => {
  otpStorage.set(email, {
    otp,
    timestamp: Date.now(),
    attempts: 0
  });
  
  setTimeout(() => {
    otpStorage.delete(email);
  }, 10 * 60 * 1000);
};

export const verifyOTP = (email, inputOTP) => {
  const stored = otpStorage.get(email);
  
  if (!stored) {
    return { success: false, message: 'OTP expired. Please request a new one.' };
  }
  
  if (Date.now() - stored.timestamp > 10 * 60 * 1000) {
    otpStorage.delete(email);
    return { success: false, message: 'OTP expired. Please request a new one.' };
  }
  
  if (stored.attempts >= 3) {
    otpStorage.delete(email);
    return { success: false, message: 'Too many attempts. Please request new OTP.' };
  }
  
  if (stored.otp === inputOTP) {
    otpStorage.delete(email);
    return { success: true, message: 'OTP verified successfully' };
  } else {
    stored.attempts++;
    return { success: false, message: 'Invalid OTP. Please try again.' };
  }
};