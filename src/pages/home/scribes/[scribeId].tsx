import { manageSubscription } from "@/lib/utils/SubscriptionManagementUtils";
import ScribePage, {
  ScribePageProps,
} from "@/pageContainers/Scribes/ScribePage";
import { scribePageArgs } from "@/pageContainers/Scribes/Scribes.types";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { type GetServerSideProps } from "next";

export default ScribePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  const user = session?.user;
  if (!user) {
    return { notFound: true };
  }

  const subManager = await manageSubscription(session?.user.id);

  const subscription = await prisma.subscription.findUnique({
    where: {
      userId: user.id,
      active: true,
    },
  });

  if (!subscription) return { notFound: true };

  const query = context.query as { scribeId: string };

  const scribe = await prisma.scribe.findUnique({
    where: {
      id: parseInt(query.scribeId),
      /* subscriptionId: subscription.id, */
    },
    ...scribePageArgs,
  });

  if (!scribe) {
    return {
      notFound: true,
    };
  }

  /* const nextEpisode = await prisma.scribe.findFirst({ */
  /*     where: { */
  /*         createdAt: { lt: new Date() }, */
  /*     }, */
  /*     orderBy: { episodeNumber: "asc" }, */
  /*     select: { id: true }, */
  /* }) */
  /**/
  /* const prevEpisode = await prisma.episode.findFirst({ */
  /*     where: { */
  /*         podcastId: episode.podcastId, */
  /*         status: "published", */
  /*         episodeNumber: { lt: episode.episodeNumber }, */
  /*         releaseDate: { lt: new Date() }, */
  /*     }, */
  /*     orderBy: { episodeNumber: "desc" }, */
  /*     select: { id: true }, */
  /* }) */

  return (
    subManager ?? {
      props: {
        scribe,
        nextScribe: null,
        prevScribe: null,
      } as ScribePageProps,
    }
  );
};
