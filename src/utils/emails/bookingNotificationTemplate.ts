// emails/bookingNotificationTemplate.ts

export const bookingNotificationTemplate = ({
  farmerName,
  buyerName,
  buyerEmail,
  buyerPhone,
  cropName,
  cropVariety,
  quantity,
  unit,
  pricePerUnit,
  totalAmount,
  bookingDate,
  bookingTime,
  bookingId,
  deliveryDate,
  deliveryAddress,
  status,
  notes,
  dashboardUrl,
  supportEmail,
  helpCenterUrl,
  companyAddress,
  phoneNumber,
}: {
  farmerName: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  cropName: string
  cropVariety: string
  quantity: number
  unit: string
  pricePerUnit: number
  totalAmount: number
  bookingDate: string
  bookingTime: string
  bookingId: string
  deliveryDate: string
  deliveryAddress: string
  status: string
  notes: string
  dashboardUrl: string
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
  <title>New Booking Received – Fruto</title>
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
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
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
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 24px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.3);
    }

    .status-badge::before {
      content: '📦';
      margin-right: 6px;
    }

    .notification-title {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .notification-subtitle {
      font-size: 16px;
      color: #64748b;
      margin-bottom: 40px;
      line-height: 1.5;
    }

    .highlight {
      color: #059669;
      font-weight: 600;
    }

    /* Booking Details Card */
    .booking-card {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      position: relative;
      overflow: hidden;
    }

    .booking-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #059669 0%, #047857 100%);
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
    }

    .card-title::before {
      content: '📋';
      margin-right: 8px;
    }

    .details-table {
      width: 100%;
      border-collapse: collapse;
    }

    .details-table tr {
      border-bottom: 1px solid #bbf7d0;
    }

    .details-table tr:last-child {
      border-bottom: none;
    }

    .details-table th,
    .details-table td {
      text-align: left;
      padding: 12px 0;
      font-size: 14px;
    }

    .details-table th {
      font-weight: 500;
      color: #64748b;
      width: 35%;
    }

    .details-table td {
      font-weight: 600;
      color: #0f172a;
    }

    /* Buyer Info Card */
    .buyer-card {
      background: linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%);
      border: 1px solid #fed7aa;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      position: relative;
      overflow: hidden;
    }

    .buyer-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
    }

    .buyer-title {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
    }

    .buyer-title::before {
      content: '👤';
      margin-right: 8px;
    }

    /* Action Section */
    .action-section {
      text-align: center;
      margin: 40px 0;
      padding: 32px 24px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-radius: 12px;
      border: 1px solid #bae6fd;
    }

    .action-text {
      font-size: 16px;
      color: #0c4a6e;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .action-button {
      display: inline-block;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #ffffff;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 14px 0 rgba(5, 150, 105, 0.4);
      border: none;
      cursor: pointer;
    }

    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px 0 rgba(5, 150, 105, 0.5);
    }

    /* Notes Section */
    .notes-section {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin: 32px 0;
    }

    .notes-title {
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 8px 0;
    }

    .notes-text {
      font-size: 14px;
      color: #64748b;
      margin: 0;
      font-style: italic;
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
      color: #059669;
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
      color: #059669;
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
      
      .notification-title {
        font-size: 24px !important;
      }

      .details-table th,
      .details-table td {
        padding: 8px 0 !important;
        font-size: 13px !important;
      }

      .action-button {
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
      <div class="status-badge">New Booking</div>
      
      <h1 class="notification-title">New Order Received!</h1>
      
      <p class="notification-subtitle">
        Hello <span class="highlight">${farmerName}</span>, you have received a new booking for your crops. Please review the details below and take appropriate action.
      </p>

      <!-- Booking Details -->
      <div class="booking-card">
        <h3 class="card-title">Booking Details</h3>
        <table class="details-table">
          <tr>
            <th>Booking ID</th>
            <td>#${bookingId.slice(-8)}</td>
          </tr>
          <tr>
            <th>Crop</th>
            <td>${cropName} (${cropVariety})</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>${quantity} ${unit}</td>
          </tr>
          <tr>
            <th>Price per ${unit}</th>
            <td>$${pricePerUnit.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Total Amount</th>
            <td style="color: #059669; font-weight: 700;">$${totalAmount?.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Booking Date</th>
            <td>${bookingDate} at ${bookingTime}</td>
          </tr>
          <tr>
            <th>Delivery Date</th>
            <td>${deliveryDate}</td>
          </tr>
          <tr>
            <th>Delivery Address</th>
            <td>${deliveryAddress}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td style="color: #f59e0b; font-weight: 600;">${status}</td>
          </tr>
        </table>
      </div>

      <!-- Buyer Information -->
      <div class="buyer-card">
        <h3 class="buyer-title">Buyer Information</h3>
        <table class="details-table">
          <tr>
            <th>Name</th>
            <td>${buyerName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${buyerEmail}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>${buyerPhone}</td>
          </tr>
        </table>
      </div>

      <!-- Notes Section -->
      <div class="notes-section">
        <h4 class="notes-title">Additional Notes:</h4>
        <p class="notes-text">${notes}</p>
      </div>

      <!-- Action Section -->
      <div class="action-section">
        <p class="action-text">Manage this booking and communicate with the buyer through your dashboard.</p>
        <a href="${dashboardUrl}" class="action-button">View in Dashboard</a>
      </div>

      <!-- Support -->
      <div class="support-section">
        <h4 class="support-title">Need Help?</h4>
        <p class="support-text">
          If you have questions about this booking, contact us at 
          <a href="mailto:${supportEmail}" class="support-link">${supportEmail}</a> 
          or visit our <a href="${helpCenterUrl}" class="support-link">Help Center</a>.
        </p>
      </div>

      <p style="margin-top: 32px; color: #64748b; font-size: 14px;">
        Thank you for being part of the Fruto community!<br><br>
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
        <a href="#">Seller Guidelines</a>
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
