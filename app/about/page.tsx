import { About, SkillsTransition, Skills, Main } from '@components';

export const metadata = {
  title: 'Pavel K. - About',
  description: 'Web developer portfolio site Pavel K.',
};

export default function AboutPage() {
  return (
    <Main className="pt-20" animate>
      <About page />
      <SkillsTransition />
      <Skills />
    </Main>
  )
};
