import NewsletterPage from "@/pageContainers/Newsletter/Newsletter.page";
import { getServerAuthSession } from "@/server/auth";
import { GetServerSideProps } from "next";

export default NewsletterPage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
