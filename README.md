# WarpAds

WarpAds is an open display ads protocol designed for Farcaster, aiming to become synonymous with the prominence of Facebook ads in the decentralized space. This innovative platform allows users to seamlessly convert existing Farcaster frames into ad-embedded frames (WarpAds Frames) and relay them to the original server without requiring any server-side changes.

![WarpAds Screenshot](Screenshot.png)

## How It Works

##### For Influencers
- **WarpAds URL Creation**: Influencers on Farcaster can create WarpAds URLs for popular frames they curate and start broadcasting on WarpCast.
- **Revenue Generation**: Higher click-through rates on these frames generate more revenue for influencers.

##### Ad Creation and Personalization
- **Open Platform**: Anyone can create ads on WarpAds.
- **AI Labeling**: Ads are labeled using Phala's AI coprocessor.
- **Personalization**: MBD's content moderation APIs deliver personalized ads to users viewing WarpAds frames.

##### Revenue and Royalties
- **Revenue Sharing**: Interaction data is tracked to compute ad click-through rates, rewarding influencers with a share of the protocol's revenue.
- **Royalties**: Original frame authors can claim royalties by setting additional WarpAds metadata on their frame server.

This streamlined approach ensures influencers and frame creators can monetize their content seamlessly while providing advertisers with a robust platform for targeted advertising.

## Technologies Used

- **Fleek Functions**: Relayer service, compute influencer rewards, compute frame author royalties.
- **Phala Network**: Ad labeling.
- **MBD**: Content moderation for personalized ads.
- **Deployment**: Deployed on Base Sepolia using HardHat.
- **Subgraphs**: Deployed on theGraph network.
- **Development Stack**: Node.js, Express, Next.js, Solidity, TypeScript.
