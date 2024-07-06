"use client";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Badge } from "@/components/ui/badge";
import WarpAdsGenerate from "@/components/WarpAdsFormGenerate";
import { SignInButton } from "@farcaster/auth-kit";
import { useProfile } from "@farcaster/auth-kit";
import BuyAd from "@/components/BuyAd";
import ClaimAuthor from "@/components/ClaimAuthor";
import ClaimInfluencer from "@/components/ClaimInfluencer";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("generate");
  const account = useAccount();
  const {
    isAuthenticated,
    profile: { username, fid },
  } = useProfile();

  useEffect(() => {}, []);

  return (
    <main className="container flex min-h-screen flex-col items-center justify-center p-10">
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>
      <div className="relative flex place-items-center mb-2">
        <Image
          className="relative"
          src="/logo/logo.png"
          alt="Logo"
          width={180}
          height={180}
          priority
        />
        <div className="mr-10">
          <div className="text-4xl font-bold">
            warp<span className="text-violet-400">ads</span>
          </div>
          <div className="text-lg ">farcaster ads protocol</div>
        </div>
      </div>

      <section className="lg:max-w-5xl lg:w-full ">
        <div className="ring-1 ring-zinc-700 rounded-xl p-8 w-full">
          {!account?.address ? (
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-md mb-5">
                Connect your wallet to get started
              </h3>
              <ConnectButton />
            </div>
          ) : (
            <div className="flex justify-center items-start flex-col">
              <div className="flex w-full justify-between items-center">
                <ConnectButton />
                <span className={`bg-zinc-300 `}>
                  <SignInButton />
                </span>
              </div>

              {account?.address && isAuthenticated && fid && (
                <div className="mt-10 flex justify-center items-between flex-col w-full">
                  <div className="flex justify-center items-center gap-7">
                    <div
                      className={`cursor-pointer underline hover:text-violet-400 hover:cursor-pointer ${
                        currentTab === "generate"
                          ? "text-violet-400"
                          : "text-zinc-700"
                      }`}
                      onClick={() => setCurrentTab("generate")}
                    >
                      Generate WarpAds URL
                    </div>
                    <div
                      className={`cursor-pointer underline hover:text-violet-400 hover:cursor-pointer ${
                        currentTab === "buy"
                          ? "text-violet-400"
                          : "text-zinc-700"
                      }`}
                      onClick={() => setCurrentTab("buy")}
                    >
                      Buy an Ad
                    </div>
                    <div
                      className={`cursor-pointer underline hover:text-violet-400 hover:cursor-pointer ${
                        currentTab === "claim-author"
                          ? "text-violet-400"
                          : "text-zinc-700"
                      }`}
                      onClick={() => setCurrentTab("claim-author")}
                    >
                      Claim author royalties
                    </div>
                    <div
                      className={`cursor-pointer underline hover:text-violet-400 hover:cursor-pointer ${
                        currentTab === "claim-influencer"
                          ? "text-violet-400"
                          : "text-zinc-700"
                      }`}
                      onClick={() => setCurrentTab("claim-influencer")}
                    >
                      Claim influencer royalties
                    </div>
                  </div>

                  {currentTab === "generate" && <WarpAdsGenerate fid={fid} />}
                  {currentTab === "buy" && <BuyAd fid={fid} />}
                  {currentTab === "claim-author" && <ClaimAuthor fid={fid} />}
                  {currentTab === "claim-influencer" && (
                    <ClaimInfluencer fid={fid} />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
