import { Button } from "../ui/button";
import Search from "../Search/search";
import Logo from "../Logo/logo";


export default function Header() {
  const auth = true

  return (
    <header className="mx-10 max-w-full h-18 flex items-center justify-between">
      <Logo/>
      <Search/>

      {
        auth ? (
          <nav className="flex-none">
            <ul className="flex">
              <li className="flex-1"><Button>Профіль</Button></li>
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
