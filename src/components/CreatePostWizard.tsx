import Image from "next/image";
import LoadingPage from "~/components/LoadingPage";
import { useState } from "react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "~/components/LoadingSpinner";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser();
  const [postContent, setPostContent] = useState<string>("");
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setPostContent("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (error) => {
      const errorMsg = error.data?.zodError?.fieldErrors.content;
      if (errorMsg && errorMsg[0]) {
        toast.error(errorMsg[0]);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("🫠 Failed to post! Please try again later.");
      }
    },
  });

  if (!user || !user.username) return <LoadingPage />;
  return (
    <div className="flex w-full gap-3 ">
      <Image
        src={`${user.profileImageUrl}`}
        alt={`@${user.username}'s profile picture`}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        type="text"
        placeholder="type some emojis!"
        className="grow bg-transparent outline-none"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (postContent !== "") {
              mutate({ content: postContent });
            }
          }
        }}
      />
      {postContent !== "" && !isPosting && (
        <button
          className="text-3xl"
          onClick={() => mutate({ content: postContent })}
        >
          📫
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

export default CreatePostWizard;
