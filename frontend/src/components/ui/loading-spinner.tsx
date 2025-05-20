import React, { useState, useEffect, useMemo } from "react";
import icons from "../../assets/icons/icons";

interface LoadingSpinnerProps {
  type: "creation" | "analyze";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ type }) => {
  const [loadingText, setLoadingText] = useState("Preparing your analysis...");
  const [fade, setFade] = useState(true); // Controls fade-in effect

  // Memoized array to prevent re-creating it on every render
  const loadingMessagesCreation = useMemo(
    () => ["Preparing your lecture...", "Gathering resources..."],
    [],
  );

  const loadingAnalyzeMessages = useMemo(
    () => [
        "Scanning your landing page...",
        "Analyzing visual hierarchy...",
        "Reading your headline and CTAs...",
        "Evaluating trust signals...",
        "Measuring clarity and conversion flow...",
        "Applying UX heuristics...",
        "Identifying improvements...",
        "Benchmarking layout structure...",
        "Generating feedback report...",
        "Finalizing your SpotCheck analysis...",
    ],
    [],
  );

  const messages =
    type === "creation" ? loadingMessagesCreation : loadingAnalyzeMessages;

  // Initialize the first message
  useEffect(() => {
    setLoadingText(messages[0]);
  }, [messages]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setFade(false); // Start fade-out effect

      setTimeout(() => {
        index = (index + 1) % messages.length;
        setLoadingText(messages[index]);
        setFade(true); // Start fade-in effect
      }, 200); // Delay before switching text
    }, 3000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center">
      {icons.loadingIcon}
      <p
        className={`text-lg font-semibold text-gray-300 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
      >
        {loadingText}
      </p>
    </div>
  );
};

export default LoadingSpinner;