import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Bodoni_Moda, Raleway } from "next/font/google";
import Search from "../Search/search";

const bodoniModa = Bodoni_Moda({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const raleway = Raleway({
  subsets: ['latin'],
  style: ['normal', 'italic'],
})


export default function Header() {
  const auth = false

  return (
    <header className="mx-10 max-w-full h-18 flex items-center justify-between">

      <div className="flex">
        <AspectRatio ratio={1 / 1}>
          <Image src="" alt="Logo" className="w-full h-full rounded-md object-cover bg-amber-950" />
        </AspectRatio>
        <div className="ml-1.5">
          <h1 className={`${bodoniModa.className} text-base`}>Frogo</h1>
          <p className={`${raleway.className} text-xs`}>все для логопедії</p>
        </div>
      </div>

      <Search/>

      {
        auth ? (
          <nav className="flex-none">
            <ul className="flex">
              <li className="flex-1"><Button className={bodoniModa.className}>Профіль</Button></li>
              <li className="flex-1"><Button>Кошик</Button></li>
            </ul>
          </nav>
        ) : (
          <div className="flex-none">
            <Button>Вхід/Реестрація</Button>
          </div>
        )
      }

    </header>
  )
}
