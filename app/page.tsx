import { 
  Main,
  About, 
  Skills, 
  Contact, 
  HomeHero,
  RecentWorks, 
  SkillsTransition, 
} from '@components';

export default function Home() {
  return (
    <Main>
      <HomeHero />
      <About />
      <SkillsTransition />
      <Skills />
      <RecentWorks />
      <Contact />
    </Main>
  )
};
