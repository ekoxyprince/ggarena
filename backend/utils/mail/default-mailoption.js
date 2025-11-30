import sendMail from "./index.js";
import path from "node:path";
export default function MailOptions(
  name = "admin",
  email = "nagornolga@cybertipcore.com",
  subject,
  message
) {
  let mailOption = {
    from: '"GGArena" <support@web3-securityvault.com>',
    to: `${email}`,
    subject: `${subject}`,
    text: "New message",
    html: `<html>
<body style="margin:0; padding:0; background-color:#efefef; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; color:#000;">

    <!-- Header / Logo -->
    <div style="text-align:center; padding:25px 10px;">
        <h1 style="margin:0; color:#E1B530; font-size:28px; font-weight:700;">GGArena</h1>
    </div>

    <!-- Email Container -->
    <div style="max-width:600px; margin:auto; padding:0 15px;">

        <!-- Content Card -->
        <div style="
            background:#ffffff;
            padding:30px;
            border-radius:12px;
            border:1px solid #dcdcdc;
            box-shadow:0 2px 6px rgba(0,0,0,0.05);
        ">

            <h2 style="font-size:22px; text-align:center; margin-top:0; margin-bottom:20px;">
                ${subject}
            </h2>

            <p style="margin-top:0;">From GGArena,</p>

            <p>Hello, <strong>${name}</strong></p>

            <div style="margin:15px 0; line-height:1.6;">
                ${message}
            </div>

            <p style="margin-top:25px; line-height:1.6;">
                Best Regards,<br>
                <strong>Management</strong><br>
                GGArena
            </p>

            <div style="text-align:center; margin-top:30px;">
                <a href="https://ggarena.gg"
                   style="display:inline-block; padding:12px 25px; background:#E1B530; color:#000; 
                          text-decoration:none; font-weight:bold; border-radius:6px;">
                    Visit Website
                </a>
            </div>

        </div>

        <!-- Support Footer -->
        <div style="text-align:center; font-size:14px; padding:12px; margin-top:20px; background:#e5e7e9; border-radius:6px;">
            Have a problem? Contact us.<br>
            <span style="display:block; margin-top:5px;">
                Mondays–Fridays: 8am–5pm<br>
                Saturdays: 10am–4pm
            </span>
        </div>

        <!-- Copyright Footer -->
        <div style="text-align:center; font-size:13px; color:#555; padding:10px 0;">
            © 2024 GGArena. All rights reserved.
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
