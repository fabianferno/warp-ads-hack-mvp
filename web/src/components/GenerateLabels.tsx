import { useEffect, useState } from "react";
import axios from "axios";

const GenerateLabels = ({
  setLabels,
  metadata,
}: {
  setLabels: (labels: string[]) => void;
  metadata: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [generatedLabels, setGeneratedLabels] = useState<string[]>([]);
  // TODO: Make a call to phala Agent and return the labels for given metadata

  async function generateLabels() {
    setLoading(true);
    fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Generated labels", JSON.stringify(data));
        setGeneratedLabels(data.map((label: any) => label.label));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const handleGenerateLabels = async () => {
    await generateLabels(); // Assuming generateLabels is an async function
    setLabels(generatedLabels);
  };

  return (
    <div className="w-full max-w-xl p-4 bg-white mx-auto dark:bg-black rounded-lg shadow-md">
      <div className="mt-6 text-center">Labels</div>
      <div className="mt-2 text-violet-600 dark:text-violet-400 flex">
        {generatedLabels.join(", ")}
      </div>

      <div className="mt-3 flex items-center justify-center space-x-2">
        {loading ? (
          <div className="loader">Loading...</div> // Placeholder for your loader UI
        ) : (
          <button
            onClick={handleGenerateLabels}
            className="px-4 flex items-center justify-between gap-2 py-2 font-bold text-white bg-zinc-400 rounded-xl hover:bg-violet-500 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            Generate Labels using Phala AI{" "}
            <img
              height={20}
              width={20}
              className="h-5 w-5 rounded-full"
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/6841.png"
              alt="phala logo"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default GenerateLabels;
