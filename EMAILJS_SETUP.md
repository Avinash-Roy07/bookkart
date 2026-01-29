# EmailJS Setup Guide for BookKart Order Confirmation

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. Go to Email Services in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

## Step 3: Create Email Template
1. Go to Email Templates in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Name: `order_confirmation`

### Subject: `BookKart Order Confirmation - Order #{{order_id}}`

### Template Content:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2874f0; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .order-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>BookKart</h1>
            <p>Your Premium Bookstore</p>
        </div>
        
        <div class="content">
            <h2>Order Confirmation</h2>
            <p>Dear {{customer_name}},</p>
            <p>Thank you for your order! We're excited to get your books to you.</p>
            
            <div class="order-details">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> {{order_id}}</p>
                <p><strong>Order Date:</strong> {{order_date}}</p>
                <p><strong>Expected Delivery:</strong> {{delivery_date}}</p>
                <p><strong>Total Amount:</strong> ₹{{total_amount}}</p>
            </div>
            
            <div class="order-details">
                <h3>Items Ordered</h3>
                <pre>{{items_list}}</pre>
            </div>
            
            <div class="order-details">
                <h3>Delivery Address</h3>
                <p>{{customer_name}}</p>
                <p>{{delivery_address}}</p>
                <p>Phone: {{phone_number}}</p>
            </div>
            
            <p>You can track your order status in your BookKart account.</p>
        </div>
        
        <div class="footer">
            <p>Thank you for choosing BookKart!</p>
            <p>Happy Reading! 📚</p>
        </div>
    </div>
</body>
</html>
```

4. Save the template and copy your **Template ID**

## Step 4: Get Public Key
1. Go to Account settings
2. Find your **Public Key**

## Step 5: Update Configuration
Update the file `src/services/orderEmailService.js` with your credentials:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

## Step 6: Test Email
1. Place a test order in your application
2. Check if the email is received
3. Verify all template variables are populated correctly

## Template Variables Used:
- `{{to_email}}` - Customer's email address
- `{{customer_name}}` - Customer's full name
- `{{order_id}}` - Unique order identifier
- `{{order_date}}` - Date when order was placed
- `{{delivery_date}}` - Expected delivery date
- `{{total_amount}}` - Total order amount
- `{{items_list}}` - List of ordered items
- `{{delivery_address}}` - Customer's delivery address
- `{{phone_number}}` - Customer's phone number

## Free Tier Limits:
- 200 emails per month
- Perfect for testing and small applications

## Security Note:
- Public key is safe to use in frontend
- Service ID and Template ID are also safe to expose
- Never expose your private key in frontend code

## Troubleshooting:
1. Check browser console for errors
2. Verify all IDs are correct
3. Ensure email service is properly configured
4. Check spam folder for test emails