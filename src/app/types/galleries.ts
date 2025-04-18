
export class Painting {
  id: string | null = null;
  title: string | null = null;
  author: string | null = null;
  url: string | null = null;
  dimensions: { width: number, height: number} | null = null;

  constructor(data: {id?: string, title?: string, author?: string, url?: string, dimensions?: { width: number, height: number}}){
    this.id = data.id ?? null;
    this.title = data.title ?? null;
    this.author = data.author ?? null;
    this.url = data.url ?? null;
    this.dimensions = data.dimensions ?? null;
  }
}




export class Gallery{
  id: string | null = null;
  folderName: string | null = null;
  folderPath: string | null = null;
  pageName: string | null = null;
  title: string | null = null;
  description: string | null = null;
  paintings: Painting[] = [];

  constructor(data: {id?: string, folderName?: string, paintings?: Painting[], pageName?: string, title?: string, description?: string, folderPath?: string}){
    this.id = data.id ?? null;
    this.paintings = data.paintings ?? [];
    this.folderName = data.folderName ?? null;
    this.pageName = data.pageName ?? null;
    this.title = data.title ?? null;
    this.description = data.description ?? null;
    this.folderPath = data.folderPath ?? null;
   }
}
