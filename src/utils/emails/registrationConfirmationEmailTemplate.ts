// emails/registrationConfirmationEmailTemplate.ts

export const registrationConfirmationEmailTemplate = ({
  username,
  toEmail,
  registrationDate,
  verificationUrl,
  supportEmail,
  helpCenterUrl,
  companyAddress,
  phoneNumber,
}: {
  username: string
  toEmail: string
  registrationDate: string
  verificationUrl: string
  supportEmail: string
  helpCenterUrl: string
  companyAddress: string
  phoneNumber: string
}): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Beauty Bay BD – Registration Successful</title>
  <style>
    /* Reset and Base */
    * { box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      margin: 0; 
      padding: 0; 
      background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
      line-height: 1.6;
      color: #374151;
    }

    /* Container */
    .email-wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(236, 72, 153, 0.15), 0 10px 10px -5px rgba(236, 72, 153, 0.04);
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
      padding: 40px 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="sparkle" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.2)"/><circle cx="80" cy="80" r="1.5" fill="rgba(255,255,255,0.15)"/><circle cx="60" cy="30" r="0.8" fill="rgba(255,255,255,0.1)"/><circle cx="30" cy="70" r="1.2" fill="rgba(255,255,255,0.18)"/></pattern></defs><rect width="100" height="100" fill="url(%23sparkle)"/></svg>');
      opacity: 0.4;
    }

    .logo {
      font-size: 36px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -1px;
      margin-bottom: 8px;
      position: relative;
      z-index: 1;
      font-family: 'Georgia', serif;
    }

    .tagline {
      color: rgba(255, 255, 255, 0.95);
      font-size: 16px;
      font-weight: 500;
      position: relative;
      z-index: 1;
      font-style: italic;
    }

    /* Content */
    .content {
      padding: 48px 32px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 25px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px -1px rgba(244, 114, 182, 0.4);
    }

    .status-badge::before {
      content: '💖';
      margin-right: 8px;
      font-weight: bold;
    }

    .welcome-title {
      font-size: 32px;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .welcome-subtitle {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 40px;
      line-height: 1.6;
    }

    .highlight {
      color: #ec4899;
      font-weight: 600;
    }

    /* Account Details Card */
    .account-card {
      background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
      border: 2px solid #f9a8d4;
      border-radius: 16px;
      padding: 28px;
      margin: 32px 0;
      position: relative;
      overflow: hidden;
    }

    .account-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #ec4899 0%, #db2777 100%);
    }

    .account-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
    }

    .account-title::before {
      content: '✨';
      margin-right: 10px;
      font-size: 20px;
    }

    .account-details {
      width: 100%;
      border-collapse: collapse;
    }

    .account-details tr {
      border-bottom: 1px solid #f9a8d4;
    }

    .account-details tr:last-child {
      border-bottom: none;
    }

    .account-details th,
    .account-details td {
      text-align: left;
      padding: 14px 0;
      font-size: 15px;
    }

    .account-details th {
      font-weight: 500;
      color: #6b7280;
      width: 35%;
    }

    .account-details td {
      font-weight: 600;
      color: #1f2937;
    }

    /* CTA Section */
    .cta-section {
      text-align: center;
      margin: 40px 0;
      padding: 36px 28px;
      background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%);
      border-radius: 16px;
      border: 2px solid #e879f9;
    }

    .cta-text {
      font-size: 16px;
      color: #7c2d12;
      margin-bottom: 24px;
      font-weight: 500;
      line-height: 1.5;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
      color: #ffffff !important;
      padding: 18px 36px;
      text-decoration: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 8px 20px 0 rgba(236, 72, 153, 0.4);
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px 0 rgba(236, 72, 153, 0.5);
    }

    /* Customer-specific Sections */
    .customer-section {
      margin: 32px 0;
      padding: 28px;
      border-radius: 16px;
      border: 2px solid #f9a8d4;
    }

    .customer-title {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: #1f2937;
    }

    .customer-text {
      font-size: 15px;
      color: #374151;
      margin: 0 0 18px 0;
      line-height: 1.5;
    }

    .customer-features {
      margin: 0;
      padding: 0 0 0 24px;
    }

    .customer-features li {
      margin-bottom: 10px;
      font-size: 14px;
      color: #374151;
      line-height: 1.4;
    }

    /* Support Section */
    .support-section {
      background: #fdf2f8;
      border: 2px solid #f9a8d4;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      text-align: center;
    }

    .support-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 12px 0;
    }

    .support-text {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
      line-height: 1.5;
    }

    .support-link {
      color: #ec4899;
      text-decoration: none;
      font-weight: 600;
    }

    .support-link:hover {
      text-decoration: underline;
    }

    /* Footer */
    .footer {
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
      padding: 36px 32px;
      text-align: center;
      color: #9ca3af;
    }

    .footer-brand {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 12px;
      font-family: 'Georgia', serif;
    }

    .footer-address {
      font-size: 13px;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .footer-links {
      margin-bottom: 20px;
    }

    .footer-links a {
      color: #ec4899;
      text-decoration: none;
      margin: 0 16px;
      font-size: 13px;
      font-weight: 500;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }

    .footer-copyright {
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #374151;
      padding-top: 20px;
    }

    /* Mobile Responsive */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        margin: 20px 16px;
        border-radius: 16px;
      }
      
      .header,
      .content,
      .footer {
        padding: 28px 24px !important;
      }
      
      .welcome-title {
        font-size: 26px !important;
      }

      .account-details th,
      .account-details td {
        padding: 10px 0 !important;
        font-size: 14px !important;
      }

      .cta-button {
        padding: 16px 28px !important;
        font-size: 15px !important;
      }

      .customer-section,
      .account-card,
      .cta-section {
        padding: 20px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="logo">Beauty Bay BD</div>
      <div class="tagline">Where Beauty Meets Confidence</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="status-badge">Registration Successful</div>
      
      <h1 class="welcome-title">Welcome to Beauty Bay BD, <span class="highlight">${username}</span>!</h1>
      
      <p class="welcome-subtitle">
        Thank you for joining our beauty community! Your account has been created successfully. Please verify your email address below to complete your registration and start shopping our amazing collection of skincare, makeup, and bath & body products.
      </p>

      <!-- Account Details -->
      <div class="account-card">
        <h3 class="account-title">Your Beauty Profile</h3>
        <table class="account-details">
          <tr>
            <th>Username</th>
            <td>${username}</td>
          </tr>
          <tr>
            <th>Email Address</th>
            <td>${toEmail}</td>
          </tr>
          <tr>
            <th>Registration Date</th>
            <td>${registrationDate}</td>
          </tr>
        </table>
      </div>

      <!-- Welcome Section -->
      <div class="customer-section">
        <h3 class="customer-title">Welcome to Beauty Bay BD! 🌸</h3>
        <p class="customer-text">Get ready to discover our amazing collection of:</p>
        <ul class="customer-features">
          <li>Premium skincare products for all skin types</li>
          <li>High-quality makeup for every occasion</li>
          <li>Luxurious bath & body essentials</li>
          <li>Exclusive beauty tools and accessories</li>
          <li>Expert beauty tips and tutorials</li>
          <li>Special promotions and seasonal collections</li>
        </ul>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <p class="cta-text">You're almost ready to start your beauty journey! Please verify your email address to activate your account and begin exploring our products.</p>
        <a href="${verificationUrl}" class="cta-button">Verify Email Address</a>
      </div>

      <!-- Support -->
      <div class="support-section">
        <h4 class="support-title">Need Beauty Advice? 💄</h4>
        <p class="support-text">
          Our beauty experts are here to help! Contact us at 
          <a href="mailto:${supportEmail}" class="support-link">${supportEmail}</a> 
          or visit our <a href="${helpCenterUrl}" class="support-link">Beauty Help Center</a> for tips, tutorials, and support.
        </p>
      </div>

      <p style="margin-top: 32px; color: #6b7280; font-size: 14px;">
        With love and beauty,<br>
        <strong>The Beauty Bay BD Team 💕</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">Beauty Bay BD</div>
      <div class="footer-address">
        ${companyAddress}<br>
        Phone: ${phoneNumber}
      </div>
      
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Beauty Tips</a>
        <a href="#">Contact Us</a>
      </div>
      
      <div class="footer-copyright">
        © ${new Date().getFullYear()} Beauty Bay BD Inc. All rights reserved. ✨
      </div>
    </div>
  </div>
</body>
</html>
`
