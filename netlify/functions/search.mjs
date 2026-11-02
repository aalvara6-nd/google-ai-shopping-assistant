// Real Google Shopping search via SerpApi. Set SERPAPI_KEY in Netlify environment variables.
// Docs: https://serpapi.com/google-shopping-api
export default async (request) => {
  if (request.method !== 'GET') return Response.json({error:'Method not allowed'}, {status:405});
  const key=process.env.SERPAPI_KEY;
  if(!key)return Response.json({error:'The live product search has not been configured. Add SERPAPI_KEY in Netlify environment variables.'},{status:503});
  const url=new URL(request.url);
  const query=(url.searchParams.get('q')||'').trim();
  if(query.length<2||query.length>240)return Response.json({error:'Enter a shopping query between 2 and 240 characters.'},{status:400});
  const qs=new URLSearchParams({engine:'google_shopping',q:query,gl:'us',hl:'en',api_key:key,num:'20'});
  try{
    const response=await fetch('https://serpapi.com/search.json?'+qs.toString(),{signal:AbortSignal.timeout(18000)});
    const data=await response.json();
    if(!response.ok||data.error)throw new Error(data.error||'Shopping provider error');
    const products=(data.shopping_results||[]).slice(0,20).map(item=>{
      const rawPrice=item.extracted_price;
      const price=typeof rawPrice==='number'&&Number.isFinite(rawPrice)?rawPrice:null;
      return {title:String(item.title||'Product'),price,priceDisplay:String(item.price|| (price===null?'See retailer':'$'+price.toFixed(2))),image:String(item.thumbnail||''),merchant:String(item.source||''),link:String(item.product_link||item.link||'')};
    });
    return Response.json({products},{headers:{'Cache-Control':'public, max-age=90'}});
  }catch(err){return Response.json({error:'The shopping provider could not complete the search: '+err.message},{status:502})}
};
export const config={path:'/.netlify/functions/search'};
