"use client"

import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"
import { ArrowDown, Handbag } from "lucide-react"

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
        <AspectRatio ratio={10 / 8}>
          <Image src={image} alt="Logo" className="w-full h-full rounded-md object-cover bg-amber-950" />
        </AspectRatio>
      </div>
      <div className="font-bold">
        {title}
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="flex justify-around">
        <div className="flex">
          <ArrowDown size={18} />
          <span>{countDownloads}</span>
        </div>
        <div className="flex">
          <Handbag size={18} />
          <span>{countPurchases}</span>
        </div>
      </div>
    </article>
  )
}
