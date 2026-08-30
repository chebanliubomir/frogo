"use client"

import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"

interface IPost {
  postId: number
  image: string
  title: string
  description: string
  countDownloads: number
  countPurchases: number
}

export default function Post({ postId, image, title, description, countDownloads, countPurchases }: IPost) {
  return (
    <article key={postId} className="w-4/12 p-1.5">
      <div className="intro">
        <AspectRatio ratio={4 / 4}>
          <Image src={image} alt="Logo" className="w-full h-full rounded-md object-cover bg-amber-950" />
        </AspectRatio>
      </div>
      <div className="title">
        {title}
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="info">
        <div className="downloads"><span>{countDownloads}</span></div>
        <div className="purchases"><span>{countPurchases}</span></div>
      </div>
    </article>
  )
}
