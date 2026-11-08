import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const centered = align === 'center';

  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-tight text-accent-text">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-[2rem] font-semibold leading-[1.1] text-balance sm:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed text-muted sm:text-xl ${
            centered ? 'mx-auto max-w-2xl' : ''
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
