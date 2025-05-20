import React from "react";
import LoadingSpinner from "../../../components/ui/loading-spinner";

interface FeedbackContainerProps {
  feedbackText: string;
  loading: boolean;
}

const FeedbackContainer: React.FC<FeedbackContainerProps> = ({
  feedbackText,
  loading,
}) => {
  const lines = feedbackText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const strengths = lines
    .filter((line) => line.startsWith("✅") || line.startsWith("• ✅"))
    .map((line) => line.replace(/^•\s?/, ""));

  const problems = lines
    .filter((line) => line.startsWith("❌") || line.startsWith("• ❌"))
    .map((line) => line.replace(/^•\s?/, ""));

  const recommendations = lines
    .filter(
      (line) =>
        line.startsWith("•") || line.startsWith("-") || line.startsWith("–"),
    )
    .filter(
      (line) =>
        !line.includes("✅") &&
        !line.includes("❌") &&
        !line.toLowerCase().startsWith("actionable"),
    )
    .map((line) => line.replace(/^[-•–]\s?/, "").trim());

  return (
    <div className="mb-20 items-center justify-center flex -mt-12 max-w-7xl mx-auto text-center">
      {loading ? (
        <LoadingSpinner type="analyze" />
      ) : (
        <div className="border border-white/10 rounded-2xl pt-6 pb-10 px-6 sm:px-10 md:px-16 text-white font-sans mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-white">
            Your Analysis Report
          </h2>
          <div className="flex flex-row gap-6 w-full justify-evenly">
          {strengths.length > 0 && (
            <div className="space-y-4 flex-1 bg-[#161b22] rounded-lg px-4 pb-6 border border-gray-700 border-solid">
              <h3 className="text-md font-semibold mb-4">Strengths ✅</h3>
              {strengths.map((line, index) => (
                <div
                  key={`strength-${index}`}
                  className="bg-[#0f131a] text-left p-3 rounded-lg text-green-400 text-sm"
                >
                  {line}
                </div>
              ))}
            </div>
          )}
          {problems.length > 0 && (
            <div className="space-y-4 flex-1 bg-[#161b22] rounded-lg px-4 pb-6 border border-gray-700 border-solid">
              <h3 className="text-md font-semibold mb-4">Problems ❌</h3>
              {problems.map((line, index) => (
                <div
                  key={`problem-${index}`}
                  className="bg-[#1a0f0f] text-left p-3 rounded-lg border border-red-600 text-red-400 text-sm"
                >
                  {line}
                </div>
              ))}
            </div>
          )}
          {recommendations.length > 0 && (
            <div className="space-y-4 flex-1 bg-[#161b22] rounded-lg px-4 pb-6 border border-gray-700 border-solid">
              <h3 className="text-md font-semibold mb-4">
                Actionable Recommendations
              </h3>
              <ul className="space-y-4 text-sm text-gray-300 p-0">
                {recommendations.map((rec, index) => (
                  <div
                    key={`rec-${index}`}
                    className="text-left p-3 rounded-lg text-sm bg-[#0f131a]"
                  >
                    {"➡ " + rec}
                  </div>
                ))}
              </ul>
            </div>
          )}
          </div>
          <button
            onClick={() => console.log("signup pressed")}
            className="px-6 py-4 bg-primary rounded-xl font-semibold hover:bg-blue-600 transition text-white"
          >
            View improved landing page
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackContainer;
