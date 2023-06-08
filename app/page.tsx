import { 
  Main,
  About, 
  Skills, 
  Contact, 
  HomeHero,
  RecentWorks, 
  SkillsTransition, 
} from '@components';
import { getPosts } from '@utils';


export default async function Home() {
  const posts = await getPosts({count: 3});

  return (
    <Main>
      <HomeHero />
      <About />
      <SkillsTransition />
      <Skills />
      <RecentWorks posts={posts || []} />
      <Contact />
    </Main>
  )
};
