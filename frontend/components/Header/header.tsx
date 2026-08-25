import { Button } from "../ui/button";
import Search from "../Search/search";
import Logo from "../Logo/logo";
import { LogIn, ShoppingCart, User } from 'lucide-react';
import Link from "next/link";

export default function Header() {

  const auth = true

  return (
    <header className="mx-10 max-w-full h-18 flex items-center justify-between">
      <Logo />
      <Search />

      {
        auth ? (
          <nav className="flex-none">
            <ul className="flex">
              <li className="mr-1 flex-1">
                <Button>
                  <Link href="/profile">Профіль</Link>
                  <User size={48} strokeWidth={3} />
                </Button>
              </li>
              <li className="flex-1">
                <Button variant="outline">
                  <Link href="/basket">Кошик</Link>
                  <ShoppingCart size={48} strokeWidth={3} />
                </Button>
              </li>
            </ul>
          </nav>
        ) : (
          <div className="flex-none">
            <Button>
              <Link href="/auth">Вхід/Реестрація</Link>
              <LogIn size={48} strokeWidth={3} />
            </Button>
          </div>
        )
      }

    </header>
  )
}
