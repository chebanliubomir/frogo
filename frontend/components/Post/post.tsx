"use client"

import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"

export default function Post() {
  return (
    <article className="max-w-2/12 p-1.5">
      <div className="intro">
        <AspectRatio ratio={1 / 1}>
        <Image src="" alt="Logo" className="w-full h-full rounded-md object-cover bg-amber-950" />
      </AspectRatio>
      </div>
      <div className="title">
        <h3>Title</h3>
      </div>
      <div className="description">
        <p></p>
      </div>
      <div className="info">
        <div className="downloads"><span>1</span></div>
        <div className="purchases"><span>45</span></div>
      </div>
    </article>
  )
}
