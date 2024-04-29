import React from 'react'

type Props = {
  params:any;
}

export default function MovieDetail({params}: Props) {
  return (
    <div>MovieDetail:{params.id}</div>
  )
}