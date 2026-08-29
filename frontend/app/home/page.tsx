import Header from "@/components/Header/header";
import Post from "@/components/Post/post";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="mt-5 grid grid-cols-3 gap-5 items-center justify-items-center">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  )
}
