import { getServerSideProps } from 'next/dist/build/templates/pages'
import React from 'react'

type Props = {}

export default async function About({}: Props) {
  const result = await fetch("https://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=songs");
  const data = await result.json();
  return (
    <div>
      About1
      <ul>
        {data.youtubes.map((e: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; })=>(
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
  )
}

