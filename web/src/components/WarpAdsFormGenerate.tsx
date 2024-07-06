import { useEffect, useState } from "react";

const WarpAdsForm = ({ fid }: { fid: number }) => {
  const [url, setUrl] = useState("https://mint.farcaster.xyz/");
  const [warpAdsUrl, setWarpAdsUrl] = useState<string | null>(null);

  useEffect(() => {
    const encodedUrl = btoa(JSON.stringify({ url, fid }));
    setWarpAdsUrl(`https://warpads.xyz/${encodedUrl}`);
  }, [url]);

  return (
    <div className="w-full max-w-xl p-4 bg-white mx-auto dark:bg-black rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          defaultValue="https://mint.farcaster.xyz/"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
        />
        <button className="px-4 py-2 font-bold text-white bg-violet-400 rounded-lg hover:bg-violet-500 dark:bg-violet-400 dark:hover:bg-violet-500">
          Generate
        </button>
      </div>
      {warpAdsUrl && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold dark:text-gray-200">
            Hey @gabrielaxy.eth
          </p>
          <p className="mt-2 dark:text-gray-200">
            This is your WarpAds URL for the frame
          </p>
          <p className="mt-2 text-violet-600 break-all dark:text-violet-400">
            {warpAdsUrl}
          </p>
        </div>
      )}
    </div>
  );
};

export default WarpAdsForm;
