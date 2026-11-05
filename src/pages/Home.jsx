import Hero from '../components/Hero.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import ProjectsSection from '../components/ProjectsSection.jsx';
import ProcessSection from '../components/ProcessSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Home() {
  useDocumentTitle('');

  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
