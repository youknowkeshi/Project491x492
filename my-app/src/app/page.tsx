import { resolve } from 'path';
import React from 'react'
import Image from 'next/image';

type Props = {}
await delay(1000);

export default async function Home({}: Props) {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;
  const data = await fetch(url);
  const res = await data.json();
  return  <div>Home
    <ul>
      {res.results.map((movie:any)=><li key={movie.id}>{movie.title}{" "}
      <Image 
      alt=" "
      width={100}
      height={100}
      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
      />
      </li>)}
    </ul>
  </div>;
}

function delay(timeout:number)
{
  return new Promise((resolve)=>{
  setTimeout(resolve,timeout);
  });
}