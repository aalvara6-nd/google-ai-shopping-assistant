GOOGLE AI SHOPPING ASSISTANT — LIVE SHOPPING SEARCH

This version shows real Google Shopping results using SerpApi, rather than DummyJSON mock products.

HOW TO RUN THE FULL APP
1. Get a SerpApi API key from https://serpapi.com/ (a plan/credits may be required).
2. Put this directory into a GitHub repository and connect it to Netlify.
3. In Netlify Project configuration -> Environment variables, add SERPAPI_KEY with the API key value. Do NOT put the key in index.html.
4. Deploy the site. The Netlify function at /.netlify/functions/search will call SerpApi server-side.
5. Open the deployed URL, type your own search, and click Search.

IMPORTANT
- Opening index.html directly on your computer still displays the UI, but will NOT do live shopping searches: it needs the serverless search endpoint.
- The link to Google Shopping works even if the Netlify function has not been set up.
- Results come from an external search provider and depend on its coverage and credits.
- Shopping prices and availability should be verified at the store.
- Checkout is a presentation simulation and does not contact merchants or process payments.
- This is a Google-inspired concept and is not made by or affiliated with Google.
