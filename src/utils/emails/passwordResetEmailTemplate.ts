export const passwordResetEmailTemplate = ({
  username,
  email,
  resetUrl,
  supportEmail,
  helpCenterUrl,
  companyAddress,
  phoneNumber,
}: {
  username: string
  email: string
  resetUrl: string
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
  <title>Password Reset Request – Beauty Bay BD</title>
  <style>
    /* Base Styles */
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #fff5f8;
      color: #4a044e;
      line-height: 1.6;
    }

    .email-wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(234, 62, 112, 0.15);
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #ec4899, #db2777);
      padding: 40px 32px;
      text-align: center;
      color: #fff;
    }

    .logo {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -1px;
      margin-bottom: 8px;
    }

    .tagline {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.9;
    }

    /* Content */
    .content {
      padding: 40px 32px;
    }

    .badge {
      display: inline-block;
      background: #f9a8d4;
      color: #831843;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .title {
      font-size: 26px;
      font-weight: 700;
      margin: 0 0 12px;
      color: #1f2937;
    }

    .subtitle {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 28px;
    }

    /* CTA */
    .cta {
      text-align: center;
      margin: 30px 0;
    }

    .cta-button {
      background: linear-gradient(135deg, #ec4899, #db2777);
      color: #fff !important;
      padding: 14px 28px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
    }

    .cta-button:hover {
      background: linear-gradient(135deg, #db2777, #be185d);
      transform: translateY(-2px);
    }

    /* Info Box */
    .info-box {
      background: #fff1f2;
      border: 1px solid #fbcfe8;
      border-radius: 12px;
      padding: 20px;
      margin: 32px 0;
    }

    .info-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #9d174d;
    }

    .info-table {
      width: 100%;
      font-size: 14px;
    }

    .info-table th {
      text-align: left;
      color: #9d174d;
      font-weight: 500;
      width: 35%;
      padding: 6px 0;
    }

    .info-table td {
      font-weight: 600;
      color: #be185d;
      padding: 6px 0;
    }

    /* Warning */
    .warning {
      background: #fff0f5;
      border: 1px solid #fbcfe8;
      border-radius: 8px;
      padding: 16px;
      font-size: 14px;
      color: #831843;
      text-align: center;
      margin: 24px 0;
    }

    /* Support */
    .support {
      text-align: center;
      font-size: 14px;
      margin-top: 28px;
      color: #6b7280;
    }

    .support a {
      color: #ec4899;
      font-weight: 600;
      text-decoration: none;
    }

    .support a:hover {
      text-decoration: underline;
    }

    /* Footer */
    .footer {
      background: #1f2937;
      color: #9ca3af;
      text-align: center;
      padding: 24px;
      font-size: 13px;
    }

    .footer .brand {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 8px;
    }

    .footer-links {
      margin: 12px 0;
    }

    .footer-links a {
      color: #f472b6;
      text-decoration: none;
      margin: 0 8px;
      font-size: 13px;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="logo">Beauty Bay BD</div>
      <div class="tagline">Your Beauty, Our Passion</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="badge">Password Reset</div>
      <h1 class="title">Hello, ${username}</h1>
      <p class="subtitle">
        We received a request to reset your password for your Beauty Bay BD account.  
        If you made this request, click below to set a new password.
      </p>

      <!-- CTA -->
      <div class="cta">
        <a href="${resetUrl}" class="cta-button">Reset My Password</a>
      </div>

      <!-- Info -->
      <div class="info-box">
        <div class="info-title">Security Details</div>
        <table class="info-table">
          <tr>
            <th>Email</th>
            <td>${email}</td>
          </tr>
          <tr>
            <th>Request Time</th>
            <td>${new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short"
            })}</td>
          </tr>
          <tr>
            <th>Link Expiry</th>
            <td>1 hour from request</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>Pending Reset</td>
          </tr>
        </table>
      </div>

      <!-- Warning -->
      <div class="warning">
        If you did not request this password reset, you can safely ignore this email.  
        Your password will remain unchanged.
      </div>

      <!-- Support -->
      <div class="support">
        Need help? Contact us at  
        <a href="mailto:${supportEmail}">${supportEmail}</a>  
        or visit our <a href="${helpCenterUrl}">Help Center</a>.
      </div>

      <p style="margin-top: 24px; font-size: 14px; color:#6b7280;">
        With love 💖,<br><strong>Beauty Bay BD Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="brand">Beauty Bay BD</div>
      <div>${companyAddress} | Phone: ${phoneNumber}</div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a> • 
        <a href="#">Terms of Service</a> • 
        <a href="#">Contact Us</a>
      </div>
      <div>© ${new Date().getFullYear()} Beauty Bay BD. All rights reserved.</div>
    </div>
  </div>
</body>
</html>
`
