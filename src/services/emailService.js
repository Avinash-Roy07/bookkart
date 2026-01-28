import emailjs from '@emailjs/browser';

// EmailJS configuration - Your exact credentials
const EMAILJS_SERVICE_ID = 'service_8wi3pn9';
const EMAILJS_TEMPLATE_ID = 'template_y1gpl3k';
const EMAILJS_PUBLIC_KEY = 'coG1Dv03xyu-g0x9c';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Generate random 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email using your exact template parameters
export const sendOTPEmail = async (userEmail, otp) => {
  try {
    const templateParams = {
      email: userEmail,        // {{email}} - recipient email in your template
      user_name: userEmail.split('@')[0],  // {{user_name}} - user name
      otp_code: otp           // {{otp_code}} - the OTP code
    };

    console.log('Sending OTP email to:', userEmail, 'with OTP:', otp);
    
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, message: 'OTP sent to your email!' };
    
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, message: 'Failed to send OTP. Please try again.' };
  }
};

// Store OTP temporarily
const otpStorage = new Map();

export const storeOTP = (email, otp) => {
  otpStorage.set(email, {
    otp,
    timestamp: Date.now(),
    attempts: 0
  });
  
  // Auto-delete after 10 minutes
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