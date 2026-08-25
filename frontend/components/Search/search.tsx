'use client'

import { useState } from "react";
import { Search as SearchIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

export default function Search() {

  const [search, setSearch] = useState({
    search: '',
    countResult: 1
  })

  return (
    <div className="hidden lg:flex lg:flex-auto mx-10 max-w-3xl">
      <InputGroup>
        <InputGroupInput
          type="text"
          placeholder="Пошук..."
          onChange={e => setSearch({ ...search, search: e.target.value })}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">{search.countResult <= 0 ? '' : `${search.countResult} результатів`}</InputGroupAddon>
      </InputGroup>
    </div>
  )
}
