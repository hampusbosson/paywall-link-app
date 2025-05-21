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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Verifiera din e-post
        </h2>
        <p className="text-sm text-gray-600">
          Vi har skickat en 6-siffrig verifieringskod till din e-post. Ange den
          nedan för att verifiera ditt konto.
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
                className="w-12 h-14 text-center text-lg rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Verifiera e-post
          </button>
        </form>

        <div className="mt-4">
          <p className="text-sm text-gray-600">Fick du ingen kod?</p>
          <button
            onClick={handleResendOTP}
            className="mt-1 text-blue-600 hover:underline"
          >
            Skicka verifieringskod igen
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
