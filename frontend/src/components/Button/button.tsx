'use client'

import { useState } from "react"

interface IButton {
  children: string
}

export default function Button({ children }: IButton) {
  return (
    <button>{children}</button>
  )
}
