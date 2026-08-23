import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Bodoni_Moda, Raleway } from "next/font/google";


const bodoniModa = Bodoni_Moda({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const raleway = Raleway({
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

export default function Logo() {
  return (
    <div className="flex">
      <AspectRatio ratio={1 / 1}>
        <Image src="" alt="Logo" className="w-full h-full rounded-md object-cover bg-amber-950" />
      </AspectRatio>
      <div className="ml-2">
        <h1 className={`${bodoniModa.className} text-base`}>Frogo</h1>
        <p className={`${raleway.className} text-xs`}>все для логопедії</p>
      </div>
    </div>
  )
}
