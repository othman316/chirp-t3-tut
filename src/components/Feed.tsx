import { api } from "~/utils/api";
import LoadingPage from "~/components/LoadingPage";
import PostView from "~/components/PostView";

const Feed = () => {
  const { data, isLoading: postLoading } = api.posts.getAll.useQuery();
  if (postLoading) return <LoadingPage />;
  if (!data) return <div>somehting went wrong 😥</div>;
  return (
    <div className="flex flex-col">
      {data?.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

export default Feed;
