import Header from "@/components/Header/header";
import Post from "@/components/Post/post";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-3 gap-5">
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
