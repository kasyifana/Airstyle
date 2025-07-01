import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Section from '@/components/landing/section';

const faqs = [
  {
    question: 'How does the AI identify my hair type?',
    answer: "Our AI uses advanced computer vision algorithms to analyze a photo of your hair. It assesses texture, curl pattern, thickness, and other characteristics to accurately determine your hair type.",
  },
  {
    question: 'Is my data and photo kept private?',
    answer: "Absolutely. We prioritize your privacy. Photos are processed securely and are not stored. All personal data is encrypted and handled with the utmost care. We never share your information with third parties without your consent.",
  },
  {
    question: 'How are the product recommendations generated?',
    answer: "Our AI cross-references your hair type and concerns with a vast database of hair care products. It considers ingredients, user reviews, and expert opinions to suggest products that are most likely to work for you, even warning against potentially harmful ingredients.",
  },
  {
    question: 'Can I use Airstyle for any hair color or length?',
    answer: "Yes! Airstyle is designed for all hair types, colors, and lengths. Our virtual try-on works by overlaying styles on your current look, and our recommendations are based on your hair's texture and your face shape, not its color or length.",
  },
  {
    question: 'Are the salon recommendations trustworthy?',
    answer: "We partner with and verify salons to ensure they meet our quality standards. Recommendations are based on their listed specializations, user ratings, and proximity to your location, ensuring you find a true expert for your hair needs.",
  },
];

export default function Faq() {
  return (
    <Section id="faq">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Have questions? We have answers. If you can&apos;t find what you&apos;re looking for, feel free to contact us.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
