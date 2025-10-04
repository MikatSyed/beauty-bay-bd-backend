// emails/verificationEmailTemplate.ts

export const verificationEmailTemplate = ({
  username,
  toEmail,
  role,
  registrationDate,
  loginUrl,
  supportEmail,
  helpCenterUrl,
  companyAddress,
  phoneNumber,
}: {
  username: string;
  toEmail: string;
  role: string;
  registrationDate: string;
  loginUrl: string;
  supportEmail: string;
  helpCenterUrl: string;
  companyAddress: string;
  phoneNumber: string;
}): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Confirmed – Fruto</title>
  <style>
    /* Reset and Base */
    * { box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      margin: 0; 
      padding: 0; 
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      line-height: 1.6;
      color: #334155;
    }

    /* Container */
    .email-wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #f58434 0%, #e67429 100%);
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
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
    }

    .logo {
      font-size: 32px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -1px;
      margin-bottom: 8px;
      position: relative;
      z-index: 1;
    }

    .tagline {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      font-weight: 500;
      position: relative;
      z-index: 1;
    }

    /* Content */
    .content {
      padding: 48px 32px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 24px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
    }

    .status-badge::before {
      content: '✓';
      margin-right: 6px;
      font-weight: bold;
    }

    .welcome-title {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .welcome-subtitle {
      font-size: 16px;
      color: #64748b;
      margin-bottom: 40px;
      line-height: 1.5;
    }

    .highlight {
      color: #f58434;
      font-weight: 600;
    }

    /* Account Details Card */
    .account-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 24px;
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
      background: linear-gradient(90deg, #f58434 0%, #e67429 100%);
    }

    .account-title {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
    }

    .account-title::before {
      content: '👤';
      margin-right: 8px;
    }

    .account-details {
      width: 100%;
      border-collapse: collapse;
    }

    .account-details tr {
      border-bottom: 1px solid #e2e8f0;
    }

    .account-details tr:last-child {
      border-bottom: none;
    }

    .account-details th,
    .account-details td {
      text-align: left;
      padding: 12px 0;
      font-size: 14px;
    }

    .account-details th {
      font-weight: 500;
      color: #64748b;
      width: 30%;
    }

    .account-details td {
      font-weight: 600;
      color: #0f172a;
    }

    /* CTA Section */
    .cta-section {
      text-align: center;
      margin: 40px 0;
      padding: 32px 24px;
      background: linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%);
      border-radius: 12px;
      border: 1px solid #fed7aa;
    }

    .cta-text {
      font-size: 16px;
      color: #92400e;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #f58434 0%, #e67429 100%);
      color: #ffffff;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 14px 0 rgba(245, 132, 52, 0.4);
      border: none;
      cursor: pointer;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px 0 rgba(245, 132, 52, 0.5);
    }

    /* Support Section */
    .support-section {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin: 32px 0;
      text-align: center;
    }

    .support-title {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 8px 0;
    }

    .support-text {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }

    .support-link {
      color: #f58434;
      text-decoration: none;
      font-weight: 600;
    }

    .support-link:hover {
      text-decoration: underline;
    }

    /* Footer */
    .footer {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      padding: 32px;
      text-align: center;
      color: #94a3b8;
    }

    .footer-brand {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .footer-address {
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .footer-links {
      margin-bottom: 16px;
    }

    .footer-links a {
      color: #f58434;
      text-decoration: none;
      margin: 0 12px;
      font-size: 13px;
      font-weight: 500;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }

    .footer-copyright {
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #334155;
      padding-top: 16px;
    }

    /* Mobile Responsive */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        margin: 20px 16px;
        border-radius: 12px;
      }
      
      .header,
      .content,
      .footer {
        padding: 24px 20px !important;
      }
      
      .welcome-title {
        font-size: 24px !important;
      }

      .account-details th,
      .account-details td {
        padding: 8px 0 !important;
        font-size: 13px !important;
      }

      .cta-button {
        padding: 14px 24px !important;
        font-size: 15px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="logo">FRUTO</div>
      <div class="tagline">Agricultural Marketplace</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="status-badge">Account Confirmed</div>
      
      <h1 class="welcome-title">Welcome to Fruto, <span class="highlight">${username}</span>!</h1>
      
      <p class="welcome-subtitle">
        Your account has been successfully verified and is now active. 
        You're ready to explore our comprehensive agricultural marketplace platform.
      </p>

      <!-- Account Details -->
      <div class="account-card">
        <h3 class="account-title">Account Information</h3>
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
            <th>Account Type</th>
            <td><span class="highlight">${role}</span></td>
          </tr>
          <tr>
            <th>Registration Date</th>
            <td>${registrationDate}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td style="color: #059669; font-weight: 700;">Active</td>
          </tr>
        </table>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <p class="cta-text">Your account is ready to use. Start connecting with agricultural professionals today.</p>
        <a href="${loginUrl}" class="cta-button">Access Your Account</a>
      </div>

      <!-- Support -->
      <div class="support-section">
        <h4 class="support-title">Need Assistance?</h4>
        <p class="support-text">
          Our support team is here to help. Contact us at 
          <a href="mailto:${supportEmail}" class="support-link">${supportEmail}</a> 
          or visit our <a href="${helpCenterUrl}" class="support-link">Help Center</a>.
        </p>
      </div>

      <p style="margin-top: 32px; color: #64748b; font-size: 14px;">
        Best regards,<br>
        <strong>The <span class="highlight">Fruto</span> Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">Fruto</div>
      <div class="footer-address">
        ${companyAddress}<br>
        Phone: ${phoneNumber}
      </div>
      
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </div>
      
      <div class="footer-copyright">
        © ${new Date().getFullYear()} Fruto Inc. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
`
