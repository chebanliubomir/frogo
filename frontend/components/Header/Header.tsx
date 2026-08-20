import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function Header() {

  const auth = false

  return (
    <header className="flex w-full h-15 rounded-tr-3xl rounded-tl-3xl bg-amber-950">
      <div className="flex-none">Logo</div>
      <div className="flex-auto">
        <Input type="text" placeholder="пошук"/>
      </div>
      {auth ? <Button>Профіль</Button> : <Button>Авторизація</Button>}
    </header>
  )
}
