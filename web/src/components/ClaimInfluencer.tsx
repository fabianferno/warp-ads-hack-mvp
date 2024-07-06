import { useEffect, useState } from "react";

const ClaimAuthor = ({ fid }: { fid: number }) => {
  const [claimableAmount, setClaimableAmount] = useState<any>(0.01);

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
          <button className="px-4 py-2 font-bold text-white bg-violet-400 rounded-lg hover:bg-violet-500 dark:bg-violet-400 dark:hover:bg-violet-500">
            Claim
          </button>
        </div>
      )}
    </div>
  );
};

export default ClaimAuthor;
