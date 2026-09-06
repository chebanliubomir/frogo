import Header from "@/components/Header/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function page() {
  return (
    <>
      <Header />

      <div className="w-2xl">
        <form>
          <Input type="text" placeholder="email" />
          <Input type="text" placeholder="password" />
          <Button>Вхід</Button>
        </form>
      </div>

    </>
  )
}
