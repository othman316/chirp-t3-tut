import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";

// why is this being used like this?
dayjs.extend(relativeTime);

type postWithAuthor = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: postWithAuthor) => {
  const { post, author } = props;
  return (
    <div className=" flex gap-3 border-b border-slate-400 p-4" key={post.id}>
      <Link href={`/@${author.username}`}>
        <Image
          src={author.profileImageUrl}
          alt={`@${author.username}'s profile picture`}
          className="h-14 w-14 rounded-full"
          width={56}
          height={56}
        />
      </Link>
      <div className="flex flex-col">
        <div className="gap2 text-slate flex gap-1 ">
          <Link href={`/@${author.username}`}>{`@${author.username}`}</Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-bold">· </span>
            <span className="font-thin">{`${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};

export default PostView;
