import { getServerSideProps } from 'next/dist/build/templates/pages'
import React from 'react'

type Props = {}

export default async function About({}: Props) {
  const result = await fetch("https://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=songs");
  const data = await result.json();
  return (
    <div>
      About
      <ul>
        {data.youtubes.map((e)=>(
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
  )
}

