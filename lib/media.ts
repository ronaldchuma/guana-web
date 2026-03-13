const BUCKET =
  "https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media";

export const MEDIA = {
  hero: `${BUCKET}/AdobeStock_603508208.jpeg`,
  lifestyle: `${BUCKET}/AdobeStock_431659430.jpeg`,
  driversPhoto: `${BUCKET}/0b121d9e-2fa5-48e1-ba77-c058361be0ac.jpeg`,
  appMockup: `${BUCKET}/app-home-noshadow%201.png`,
  phoneMockup: `${BUCKET}/phone-mockup.png`,
  ctaImage: `${BUCKET}/cta-imga.png`,
  moments: [
    `${BUCKET}/0b121d9e-2fa5-48e1-ba77-c058361be0ac.jpeg`,
    `${BUCKET}/2157c7eb-588e-4e1c-8459-f6c8e918acd8.jpeg`,
    `${BUCKET}/378b4b65-de7e-454f-b5f4-a8a6b0f47eed.jpeg`,
    `${BUCKET}/4768ac83-9673-4ac7-bc51-7df4b33ffe37.jpeg`,
    `${BUCKET}/8b712b45-21f0-4b1c-a0dd-3eb740910fb8.jpeg`,
    `${BUCKET}/9730c4a6-18f1-48a8-8848-96bd0c634aaf.jpeg`,
    `${BUCKET}/e15fbf5a-678f-4b16-a096-332193e85e49.jpeg`,
  ],
} as const;
