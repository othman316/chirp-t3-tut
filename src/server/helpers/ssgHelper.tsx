import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../api/root";
import { prisma } from "../db";
import SuperJSON from "superjson";
const generateSSGHelper = () => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, currentUserId: null },
    transformer: SuperJSON,
  });
  return ssg;
};
export default generateSSGHelper;
