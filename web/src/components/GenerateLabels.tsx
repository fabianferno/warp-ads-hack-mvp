import { useEffect, useState } from "react";

const GenerateLabels = ({
  setLabels,
  metadata,
}: {
  setLabels: (labels: string[]) => void;
  metadata: any;
}) => {
  const [generatedLabels, setGeneratedLabels] = useState<string[]>([]);
  // TODO: Make a call to phala Agent and return the labels for given metadata
  return (
    <div className="w-full max-w-xl p-4 bg-white mx-auto dark:bg-black rounded-lg shadow-md">
      <div className="mt-6 text-center">Labels</div>
      <div className="mt-2 text-violet-600 break-all dark:text-violet-400">
        {generatedLabels.join(", ")}
      </div>

      <div className="mt-3 flex items-center justify-center space-x-2">
        <button
          onClick={() => setLabels(generatedLabels)}
          className="px-4 py-2 font-bold text-white bg-zinc-400 rounded-lg hover:bg-violet-500 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          Generate Labels using AI
        </button>
      </div>
    </div>
  );
};

export default GenerateLabels;
