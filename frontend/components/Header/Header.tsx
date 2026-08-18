import { Button } from "../ui/button"

export default function Header() {

  const auth = false

  return (
    <header className="w-full h-15 rounded-tr-3xl rounded-tl-3xl bg-amber-950">
      <div className="logo"></div>
      {auth ? <Button>Профіль</Button> : <Button>Авторизація</Button>}
    </header>
  )
}
