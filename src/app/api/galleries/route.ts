import { getAllGalleries, getGallery } from '@/app/data/galleries';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest){
  try{
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get('pageName');
    if (pageName){
      return new Response(JSON.stringify(getGallery(pageName)), {status: 200});
    } 
    else{
      return new Response(JSON.stringify(getAllGalleries()), {status: 200});
    }
  }
  catch(error){
    return new Response(JSON.stringify({ error: `Errore: ${error}` }))
  }
}
