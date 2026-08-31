import Header from "@/components/Header/header";
import Post from "@/components/Post/post";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="mt-5 grid grid-cols-3 gap-5 items-center justify-items-center">
        <Post
          postId={1}
          image=""
          title="test post title"
          description="test post description"
          countDownloads={0}
          countPurchases={0}
        />
        <Post
          postId={2}
          image=""
          title="test post title"
          description="test post description"
          countDownloads={0}
          countPurchases={0}
        />
        <Post
          postId={3}
          image=""
          title="test post title"
          description="test post description"
          countDownloads={0}
          countPurchases={0}
        />
      </div>
    </>
  )
}
