export const main = async (params) => {
  const { method, path, headers, query, body } = params;
  const options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YzNlOGIxYS0yZTI2LTRkNzUtOGQ0Yi1iMWRmNTUyOGJiYWEiLCJlbWFpbCI6ImZhYmlhbmZlcm5vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxMGQ1OWM0ZTUxZDJmNDUyYWZiOCIsInNjb3BlZEtleVNlY3JldCI6IjQ2MzM2OTA1ZTNmYzQ0ZDI4N2M4YTIwYmFhYWU0NjBmZjZjMjIzOTI5OWI5MjA1MWEzMGY4ZWQ4YWQ4Njg0NWUiLCJpYXQiOjE3MTEwMTc2OTZ9._IUzsF1TY5FktV8Z0yN7Xc0UjcM9Mjh1r1DnqdHW3pU",
    },
  };

  const response = await fetch(
    `https://api.pinata.cloud/farcaster/frames/interactions?frame_id=${query.frameId}&start_date=2024-07-06%2014%3A26%3A00&end_date=2028-07-06%2014%3A26%3A00`,
    options
  );
  const data = await response.json();
  console.log(data);
  return data;
};
