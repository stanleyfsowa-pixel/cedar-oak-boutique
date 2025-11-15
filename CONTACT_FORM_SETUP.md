# 📧 Contact Form Email Setup

## 🎯 Current Configuration
The contact form is set to send emails directly to: **cedarandoaknewlenox@gmail.com**

## 📋 Setup Options

### Option 1: Formspree (Recommended - Easy Setup)

1. **Go to**: https://formspree.io/
2. **Sign up** with cedarandoaknewlenox@gmail.com
3. **Create a new form** and get your form ID
4. **Update index.html line 154** with your form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Benefits:**
- ✅ No server setup required
- ✅ Spam protection included
- ✅ Works immediately
- ✅ Free for up to 50 submissions/month

### Option 2: Netlify Forms (If hosting on Netlify)

1. **Add** `netlify` attribute to form:
   ```html
   <form netlify name="contact" action="#" method="POST">
   ```
2. **Deploy** to Netlify
3. **Check** Netlify dashboard for form submissions

### Option 3: EmailJS (JavaScript-based)

1. **Sign up** at https://www.emailjs.com/
2. **Set up** email service
3. **Add** EmailJS script to your website
4. **Configure** JavaScript to send emails

### Option 4: PHP Backend (If you have web hosting)

Create a simple PHP script to handle form submissions:

```php
<?php
if ($_POST) {
    $to = "cedarandoaknewlenox@gmail.com";
    $subject = "Contact Form from Cedar & Oak Website";
    
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject_selected = $_POST['subject'];
    $message = $_POST['message'];
    
    $body = "New contact form submission:\n\n";
    $body .= "Name: $firstName $lastName\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Subject: $subject_selected\n";
    $body .= "Message: $message\n";
    
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Error sending message.";
    }
}
?>
```

## 🔧 Current Status

**Form Action**: `mailto:cedarandoaknewlenox@gmail.com`

**Note**: The `mailto:` method will open the user's default email client, which may not work for all users. For best results, use one of the options above.

## 📧 What Happens When Someone Submits

**With current setup**: Opens user's email client
**With Formspree/Netlify**: Sends email directly to cedarandoaknewlenox@gmail.com
**With PHP**: Processes on server and sends email

## 🎯 Recommended Next Steps

1. **Set up Formspree** (easiest option)
2. **Test the form** with a submission
3. **Check cedarandoaknewlenox@gmail.com** for emails
4. **Update form action** with proper Formspree URL

## 📝 Form Fields That Will Be Sent

- ✅ First Name
- ✅ Last Name  
- ✅ Email Address
- ✅ Phone Number (optional)
- ✅ Subject (dropdown selection)
- ✅ Message
- ✅ Newsletter subscription preference

All submissions will include these details in the email to cedarandoaknewlenox@gmail.com.