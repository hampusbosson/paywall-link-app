import React, { useRef, useState } from "react";
import { resendOTP, verifyEmail, login } from "../../../lib/auth";
import ConfirmationModal from "../../../features/auth/components/confirmation-modal";
import { paths } from "../../../config/paths";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { email, password } = location.state;

  const handleChange = (index: number, value: string) => {
    if (!/\d/.test(value) && value !== "") return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    console.log("Submitting code:", fullCode);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text");
    if (!/^\d{6}$/.test(pasteData)) return; // Ensure the pasted value is exactly 6 digits

    const newOtp = pasteData.split("").slice(0, 6); // Split the value into an array of single characters
    setCode(newOtp);

    // Automatically focus the next empty input field after filling the values
    newOtp.forEach((_, idx) => {
      if (inputs.current[idx]) {
        inputs.current[idx]?.focus();
      }
    });
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP(email);
      console.log("otp resent");
      setModalMessage("A new verification code has been sent to your email.");
      setModalVisible(true);
    } catch (error) {
      console.error("Error resending OTP", error);
      setModalMessage(
        "There was an issue resending the verification email. Please try again later.",
      );
      setModalVisible(true);
    }
  };

  const handleVerify = async () => {
    console.log(email);
    console.log(password);
    try {
      // Verify email with OTP
      const verified = await verifyEmail(email, code.join(""));

      if (verified) {
        console.log("Email verified!");

        // Login after successful verification
        const token = await login(email, password);
        console.log("Logged in successfully, token:", token);

        navigate(paths.app.home.getHref());
      } else {
        console.log("Email not verified!");
        setErrorMessage(
          "The verification code you entered is incorrect. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error verifying email or logging in:", error);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  const handleModalClose = () => setModalVisible(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
      <div className="bg-[#161b22] border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-white">Verify your email</h2>
        <p className="text-sm text-gray-400">
          We’ve sent a 6-digit verification code to your email. Enter it below
          to verify your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-lg rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs -mt-2 w-72 text-center">
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleVerify}
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Verify Email
          </button>
        </form>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Didn’t receive the code?</p>
          <button
            onClick={handleResendOTP}
            className="mt-1 text-blue-400 hover:underline"
          >
            Resend Verification Code
          </button>
        </div>
      </div>
      {modalVisible && (
        <ConfirmationModal message={modalMessage} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default VerifyEmailPage;
