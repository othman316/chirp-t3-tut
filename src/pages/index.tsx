import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import Feed from "~/components/Feed";
import CreatePostWizard from "~/components/CreatePostWizard";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // start fetching ASAP
  api.posts.getAll.useQuery();

  // return empty div if user isn't loaded yet
  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {/* {!!isSignedIn && (
              <div className="flex justify-center">
              <SignOutButton />
              </div>
            )} */}
        {isSignedIn && <CreatePostWizard />}
      </div>
      <Feed />
    </PageLayout>
  );
};

export default Home;
