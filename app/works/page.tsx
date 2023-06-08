import { getPosts } from "@utils";
import { Main, Works } from "@components";
import { PageProps } from "../api/posts/route";

export const metadata = {
  title: 'Pavel K. - Works',
  description: 'Web developer portfolio site Pavel K.',
};

export default async function WorksPage() {
  const page = await getPosts({pageParam: 1}) as unknown as PageProps;

  return (
    <Main>
      <Works page={page}/>
    </Main>
  )
};
