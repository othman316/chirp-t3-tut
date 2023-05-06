import { type NextPage } from "next";
import Head from "next/head";
import LoadingPage from "~/components/LoadingPage";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: "othman316",
  });

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>no data</div>;
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div>{data.username}</div>
      </main>
    </>
  );
};

export default ProfilePage;
