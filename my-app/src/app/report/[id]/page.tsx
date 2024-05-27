import React from 'react'

type Props = {
    params : any;
}

export default function page({params}: Props) {
  return (
    <div>Report Id; {params.id}</div>
  )
}