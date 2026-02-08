export class Song {
  id: string | null = null;
  title: string | null = null;
  description: string | null = null;
  author: string | null = null;
  url: string | null = null;

  constructor(data: {
    id?: string;
    title?: string;
    description?: string;
    author?: string;
    url?: string;
  }) {
    this.id = data.id ?? null;
    this.title = data.title ?? null;
    this.description = data.description ?? null;
    this.author = data.author ?? null;
    this.url = data.url ?? null;
  }
}
