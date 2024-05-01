import { resolve } from 'path';
import React from 'react'
import Image from 'next/image';
import Movie from './movie';
import { Head, Main, NextScript } from 'next/document';
import { DarkThemeToggle, ThemeModeScript , Button } from 'flowbite-react';


type Props = {}
await delay(1000);

export default async function Home({}: Props) {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;
  const data = await fetch(url);
  const res = await data.json();
  return  (
  <div>
    <div className="grid gap-4 grid-cols-3">
    {res.results.map((movie:any)=>(
      <Movie 
        key={movie.id}
        id={movie.id}
        title={movie.title}
        poster_path={movie.poster_path}
        release_date={movie.release_date}
        />
      ))}
    </div>
  </div>);
}

function delay(timeout:number)
{
  return new Promise((resolve)=>{
  setTimeout(resolve,timeout);
  });
}