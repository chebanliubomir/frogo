import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="fixed lg:inset-10 inset-0 bg-amber-50 lg:rounded-3xl">
      {children}
    </div>
  )
}
