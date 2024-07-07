import { WARP_ADS_ABI, WARP_ADS_ADDRESS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount } from "wagmi";

const ClaimInfluencer = ({ fid }: { fid: number }) => {
  const [claimableAmount, setClaimableAmount] = useState<any>(0.01);
  const { address } = useAccount();

  const [txHash, setTxHash] = useState<string>("");

  return (
    <div className="w-full max-w-xl p-4 bg-white mx-auto dark:bg-black rounded-lg shadow-md">
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold dark:text-gray-200">
          Hey @gabrielaxy.eth
        </p>
        <p className="mt-2 dark:text-gray-200">
          This is your available royalties
        </p>
        <p className="mt-2 text-violet-600 break-all dark:text-violet-400">
          {claimableAmount}
        </p>
      </div>{" "}
      {claimableAmount && (
        <div className="mt-3 flex items-center justify-center space-x-2">
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
                functionName: "claimInfluencerRoyalties",
                args: [fid],
                account: address as `0x${string}`,
              });
              const tx = await walletClient.writeContract(request);
              console.log(tx);
              setTxHash(tx);
            }}
            className="px-4 py-2 font-bold text-white bg-violet-400 rounded-lg hover:bg-violet-500 dark:bg-violet-400 dark:hover:bg-violet-500"
          >
            Claim
          </button>
        </div>
      )}
      {txHash.length > 0 && (
        <div className="my-4 text-center">
          <p className="font-semibold">Tx Sent ✅</p>
          <p className="text-sm">{txHash}</p>
        </div>
      )}
    </div>
  );
};

export default ClaimInfluencer;
