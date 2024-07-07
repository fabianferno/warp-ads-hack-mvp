### WarpAds 

WarpAds is an open display ads protocol for Farcaster, analogous to the prominence of Facebook ads. This innovative platform allows users to convert any existing Farcaster frames into a WarpAds Frame (an ad-embedded frame) and relay the frame requests to the original server without requiring any changes on the server. 

**How It Works:**
- **For Influencers:** Influencers on Farcaster can create a WarpAds URL for popular frames they curate and start casting on WarpCast. As these frames are used by many people, higher click-through rates generate more revenue for influencers. The rendered WarpAds URL displays the original frame along with an embedded advertisement.
- **Ad Creation and Personalization:** Anyone can create ads on the platform, which are labeled using Phala's AI coprocessor. These labels are utilized by MBD's content moderation APIs to offer personalized ads to users viewing a WarpAds frame.
- **Revenue and Royalties:** Interaction data is tracked to compute ad click-through rates, rewarding influencers from the protocol's revenue. Original frame authors can redeem their royalties by setting an additional WarpAds metadata on the frame server to verify and claim their share of the ad revenue.

This streamlined and efficient approach ensures that influencers and frame creators can monetize their content seamlessly while providing advertisers with a robust platform for targeted advertising.

### Technologies Used:
- **Fleek Functions:** Relayer service, compute influencer rewards, compute frame author royalties.
- **Phala Network:** Ad labeling.
- **MBD:** Content moderation for personalized ads.
- **Deployment:** Deployed on Base Sepolia.
- **Development Stack:** Built on NodeJS, Express, Next.js, Solidity, and TypeScript.
