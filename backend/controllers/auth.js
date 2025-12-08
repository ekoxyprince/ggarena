import signin from "../services/auth/signin.js";
import signup from "../services/auth/signup.js";
import forgetPassword from "../services/auth/forget-password.js";
import resetPassword from "../services/auth/reset-password.js";
import catchAsync from "../utils/catchAsync.js";

export const signinUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, role } = await signin(email, password);
  res.status(200).json({
    success: true,
    message: "Signin successful",
    accessToken: token,
    role,
  });
});

export const signupUser = catchAsync(async (req, res) => {
  await signup(req.body);
  res.status(200).json({ success: true, message: "Signup successful" });
});

export const forgetUserPass = catchAsync(async (req, res) => {
  await forgetPassword(req.body.email);
  res.status(200).json({ success: true, message: "Password reset link sent" });
});

export const resetUserPass = catchAsync(async (req, res) => {
  await resetPassword(req.params.resetToken, req.body.password);
  res.status(200).json({ success: true, message: "Password reset successful" });
});
