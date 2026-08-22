import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header() {

  const auth = true

  return (
    <header className="mx-10 max-w-full h-18 flex items-center justify-between">

      <div className="logo flex-none">
        <h1>Logo</h1>
      </div>

      <div className="hidden lg:flex lg:flex-auto mx-10 max-w-3xl">
        <Input type="text" placeholder="Пошук" />
      </div>

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
