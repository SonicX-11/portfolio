export interface Testimonial {
  name: string;
  company: string;
  review: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Laila Mansour",
    company: "Velour Studio",
    review:
      "Ebrahim understood the tone of our campaign before we finished explaining it. The final cut felt inevitable.",
    avatar: "/images/testimonials/laila.svg",
  },
  {
    name: "Tarek Haddad",
    company: "Meridian Developments",
    review:
      "Fast turnaround, meticulous color work, and a real eye for pacing. Our sales team uses the walkthrough in every pitch now.",
    avatar: "/images/testimonials/tarek.svg",
  },
  {
    name: "Nora Aziz",
    company: "Off Record Podcast",
    review:
      "He turned three hours of raw conversation into something people actually finish watching.",
    avatar: "/images/testimonials/nora.svg",
  },
];
