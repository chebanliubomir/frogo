'use client'

import { useState } from "react";
import { Input } from "../ui/input";

export default function Search() {

  const [serach, setSearch] = useState<string>('')

  console.log(serach)

  return (
    <div className="hidden lg:flex lg:flex-auto mx-10 max-w-3xl">
      <Input
        type="text"
        placeholder="Пошук..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
