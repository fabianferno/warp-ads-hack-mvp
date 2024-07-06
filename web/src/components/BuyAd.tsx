import { useEffect, useState } from "react";
import GenerateLabels from "./GenerateLabels";
const BuyAd = ({ fid }: { fid: number }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [logoSVG, setLogoSVG] = useState<string | null>(null);

  useEffect(() => {}, []);

  return (
    <div className="w-full max-w-xl p-4 bg-white mx-auto dark:bg-black rounded-lg shadow-md">
      <div className="flex items-center space-x-2 flex-col gap-4 justify-center text-center">
        <div className="w-full">
          <label htmlFor="">Title</label>
          <input
            type="text"
            defaultValue="Build on NEAR"
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
          />
        </div>
        <div className="w-full">
          <label htmlFor="">
            Description
            <span className="text-sm text-gray-400"> (optional)</span>
          </label>
          <input
            type="text"
            defaultValue="NEAR offers grants for projects that build on NEAR"
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
          />
        </div>
        <div className="w-full">
          <label htmlFor="">Logo URL</label>
          <input
            type="text"
            defaultValue="https://example.com/logo.svg"
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
          />
        </div>

        <GenerateLabels
          setLabels={setLabels}
          metadata={{ title, description }}
        />

        <button className="px-4 py-2 font-bold text-white bg-violet-400 rounded-lg hover:bg-violet-500 dark:bg-violet-400 dark:hover:bg-violet-500">
          Buy an Ad
        </button>
      </div>
    </div>
  );
};

export default BuyAd;
