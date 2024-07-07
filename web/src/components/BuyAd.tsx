import { useEffect, useState } from "react";
import GenerateLabels from "./GenerateLabels";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { baseSepolia } from "viem/chains";
import { WARP_ADS_ABI, WARP_ADS_ADDRESS } from "@/lib/constants";
import { useAccount } from "wagmi";

const BuyAd = ({ fid }: { fid: number }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [logoSVG, setLogoSVG] = useState<string | null>(null);
  const { address } = useAccount();

  const [txHash, setTxHash] = useState<string>("");

  useEffect(() => {}, []);

  return (
    <div className="w-full max-w-xl p-4 bg-white mx-auto dark:bg-black rounded-lg shadow-md">
      <div className="flex items-center space-x-2 flex-col gap-4 justify-center text-center w-full">
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

        <button
          onClick={async () => {
            const walletClient = createWalletClient({
              chain: baseSepolia,
              transport: custom(window.ethereum!),
              account: address,
            });
            const publicClient = createPublicClient({
              chain: baseSepolia,
              transport: http(
                `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
              ),
            });
            const { request } = await publicClient.simulateContract({
              address: WARP_ADS_ADDRESS as `0x${string}`,
              abi: WARP_ADS_ABI,
              functionName: "createAd",
              args: [JSON.stringify({ title, description }), labels],
              value: BigInt(100000000),
              account: address as `0x${string}`,
            });
            const tx = await walletClient.writeContract(request);
            console.log(tx);
            setTxHash(tx);
          }}
          className="px-4 py-2 font-bold text-white bg-violet-400 rounded-lg hover:bg-violet-500 dark:bg-violet-400 dark:hover:bg-violet-500"
        >
          Buy an Ad
        </button>
        {txHash.length > 0 && (
          <div className="my-4 text-center">
            <p className="font-semibold">Tx Sent ✅</p>
            <p className="text-sm">{txHash}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyAd;
