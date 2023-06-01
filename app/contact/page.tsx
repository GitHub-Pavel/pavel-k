import { Contact, Main } from '@components';

export const metadata = {
  title: 'Pavel K. - Contact',
  description: 'Web developer portfolio site Pavel K.',
};

export default function ContactPage() {
  return (
    <Main className="flex justify-center items-end" animate>
      <Contact page />
    </Main>
  )
};
