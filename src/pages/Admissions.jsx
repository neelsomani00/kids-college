import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Accordion from '../components/Accordion';
import ImageSlot from '../components/ImageSlot';
import { SITE } from '../data/config';

const STEPS = [
  ['Enquire or visit', 'Call us, send an enquiry or walk into either campus to meet the admission team.'],
  ['Register', 'Fill in the registration form for the class you are applying to.'],
  ['Interaction', 'A short, friendly interaction with the child and parents. No pressure, no heavy testing for young ones.'],
  ['Documents', 'Submit the documents listed below for verification.'],
  ['Confirm', 'Pay the admission fee and secure your child’s seat.'],
];

const DOCS = [
  'Child’s recent passport-size photograph',
  'Parent / guardian photograph',
  'Birth certificate (copy)',
  'Previous school report card and Transfer Certificate (for Class 1 onwards)',
  'Aadhaar card of child and parent (copy)',
];

const FAQS = [
  { q: 'Which classes are available?', a: `${SITE.fullName} offers ${SITE.classes} under the ${SITE.board} curriculum.` },
  { q: 'Which campus should my child join?', a: 'Our Junior Wing is on Airport Road and the Senior Wing is on Dhar Road. Contact the office and we will guide you to the right campus for your child’s class.' },
  { q: 'Is school transport available?', a: 'Yes. Bus facility is available. Routes and charges can be confirmed with the school office.' },
  { q: 'Does the school have a mess and a swimming pool?', a: 'Yes. The campus has a mess facility and swimming pool, along with a sports arena and medical room.' },
  { q: 'When does the academic session begin?', a: 'The session runs from April to March. Admissions are open for the ' + SITE.admissionSession + ' session.' },
  { q: 'How do I find the fee details?', a: 'See the Fee Structure page for class-wise fees, or contact the office for the latest figures.' },
];

export default function Admissions() {
  return (
    <>
      <Seo
        title="Admissions"
        description={`How to apply to ${SITE.fullName} for ${SITE.admissionSession}: admission steps, documents required and answers to common questions from parents.`}
        path="/admissions"
      />

      <section className="border-b border-brand/10 bg-white">
        <div className="container-x grid items-center gap-8 py-12 sm:py-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">Session {SITE.admissionSession}</p>
            <h1 className="text-4xl font-bold sm:text-5xl">Admissions</h1>
            <p className="mt-4 max-w-md text-ink/75">
              Applying should be simple. Here is what to expect, what to bring and who to call if you are stuck.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Enquire now</Link>
              <Link to="/fees" className="btn-ghost">Fee structure</Link>
            </div>
          </div>
          <ImageSlot file="admissions.jpg" label="Admission desk / happy parents and child" ratio="aspect-[4/3]" />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="text-3xl font-bold">How to apply</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-5">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="border-t-2 border-brand pt-3">
                <span className="font-display text-3xl font-bold text-accent">{i + 1}</span>
                <h3 className="mt-1 text-lg font-bold">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="documents" className="section bg-white">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Documents needed</h2>
            <ul className="mt-6 space-y-3">
              {DOCS.map((d) => (
                <li key={d} className="flex gap-3 text-sm">
                  <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf text-xs font-bold text-white">✓</span>
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink/60">The exact list may vary by class. Please confirm with the admission office.</p>
          </div>
          <ImageSlot file="campus-visit.jpg" label="Campus tour / classroom" ratio="aspect-[4/3]" />
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container-x max-w-3xl">
          <h2 className="text-3xl font-bold">Frequently asked questions</h2>
          <div className="mt-8"><Accordion items={FAQS} /></div>
        </div>
      </section>
    </>
  );
}
