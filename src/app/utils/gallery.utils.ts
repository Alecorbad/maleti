import { Painting } from '@/app/types/galleries';

export function generatePaintings(
  foo: (painting: Painting, key: number) => React.ReactNode,
  paintings: Painting[], 
  range?: {from: number, to?: number}
){
  if(!range){
    range={from: 0, to: 1000};
  }
  if(!range.to) range.to = 1000;
  return paintings.slice(range.from, range.to).map(
    (paint, key) => {
      return  foo(paint, key);
    })
}
