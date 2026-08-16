import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-10 bg-amber-50 rounded-3xl">
      {children}
    </div>
  )
}
