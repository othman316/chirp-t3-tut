import { api } from "~/utils/api";
import LoadingPage from "~/components/LoadingPage";
import PostView from "~/components/PostView";

interface ProfileFeedProps {
  userId: string;
}
const ProfileFeed = ({ userId }: ProfileFeedProps) => {
  const { data: posts, isLoading } = api.posts.getPostByUserId.useQuery({
    userId,
  });
  if (isLoading) return <LoadingPage />;
  if (!posts || posts.length === 0) return <div>User has not posted</div>;
  return (
    <div className="flex flex-col">
      {posts.map(({ post, author }) => {
        return <PostView key={post.id} post={post} author={author} />;
      })}
    </div>
  );
};

export default ProfileFeed;
