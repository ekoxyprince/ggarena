import sendMail from "./index.js";
import path from "node:path";
export default function MailOptions(
  name = "admin",
  email = "support@ggarena.gg",
  subject,
  message
) {
  let mailOption = {
    from: '"GG Arena Esports" <support@ggarena.gg>',
    to: `${email}`,
    subject: `${subject}`,
    text: "New message",
    html: `<html>
<body style="margin:0; padding:0; background:#f4f4f4; font-family:Helvetica, Arial, sans-serif; color:#333;">

    <!-- Header -->
    <div style="text-align:center; padding:25px 10px; background:#111; color:#E1B530;">
        <h1 style="margin:0; font-size:26px;">GG Arena Esports</h1>
        <p style="margin:5px 0 0; font-size:15px; color:#fff;">Order Confirmation</p>
    </div>

    <!-- Main Wrapper -->
    <div style="max-width:600px; margin:auto; padding:20px;">

        <div style="
            background:#ffffff;
            padding:25px;
            border-radius:10px;
            border:1px solid #e2e2e2;
            box-shadow:0 2px 6px rgba(0,0,0,0.05);
        ">

            <h2 style="margin-top:0; font-size:20px; text-align:center;">Thank you for your order!</h2>

            <p style="margin-bottom:20px; text-align:center;">
                We have successfully received your order. Below are the details:
            </p>

            <!-- Order Details Card -->
            <div style="
                background:#fafafa;
                border:1px solid #dedede;
                padding:15px 20px;
                border-radius:8px;
                margin-bottom:20px;
            ">

                <p style="margin:8px 0;"><strong>Order ID:</strong> ${message.orderId}</p>
                <p style="margin:8px 0;"><strong>Product:</strong> ${message.productName}</p>
                <p style="margin:8px 0;"><strong>Quantity:</strong> ${message.quantity}</p>
                <p style="margin:8px 0;"><strong>Amount:</strong> $${message.amount}</p>

            </div>

            <p style="line-height:1.6;">
                If you have any questions or concerns about your purchase, feel free to reply to this email.
            </p>

            <p style="margin-top:25px; line-height:1.6;">
                Best Regards,<br>
                <strong>Management</strong><br>
                GG Arena Esports
            </p>

            <div style="text-align:center; margin-top:30px;">
                <a href="https://ggarena.gg"
                   style="display:inline-block; padding:12px 25px; background:#E1B530; color:#000;
                          text-decoration:none; font-weight:bold; border-radius:6px;">
                    Visit Your Dashboard
                </a>
            </div>

        </div>

        <!-- Support Footer -->
        <div style="text-align:center; font-size:14px; padding:12px; margin-top:20px; background:#e5e7e9; border-radius:6px;">
            Need help? Our support team is available:<br>
            Mon–Fri: 8am–5pm | Sat: 10am–4pm
        </div>

        <!-- Copyright -->
        <div style="text-align:center; font-size:13px; color:#666; padding:10px 0;">
            © 2025 GG Arena Esports. All rights reserved.
        </div>

    </div>

</body>
</html>
`,
  };
  sendMail(mailOption, (response) => {
    console.log(response);
  });
}
