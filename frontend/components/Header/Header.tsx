import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function Header() {

  const auth = false

  return (
    <header className="flex items-center justify-between w-full h-21 rounded-t-3xl">
      <div className="flex-none px-12">Logo</div>
      <div className="flex-auto max-w-5xl px-12">
        <Input type="text" placeholder="пошук"/>
      </div>
      <div className="flex-none px-14">
        {auth ? <Button variant='outline'>Профіль</Button> : <Button variant='outline'>Авторизація</Button>}
      </div>
    </header>
  )
}
