export interface ExperienceItem {
  year: string;
  role: string;
  org: string;
  type: "Freelance" | "Agency" | "Studio";
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    year: "Ongoing",
    role: "Freelance Video Editor (Remote)",
    org: "Independent",
    type: "Freelance",
    description:
      "Working with clients across Qatar, Saudi Arabia, and the UAE — social, advertising, and branding content, adapted to each market with fast turnaround.",
  },
  {
    year: "1 Year",
    role: "Senior Video Editor",
    org: "Sudu Digital Solutions",
    type: "Agency",
    description:
      "Edited and produced video content for marketing and social campaigns, applying advanced transitions, color grading, and motion elements in close collaboration with the marketing team.",
  },
  {
    year: "6 Months",
    role: "Video Editor",
    org: "Skyrocket",
    type: "Agency",
    description:
      "Created short- and long-form video content across platforms, improving engagement through cleaner cuts and tighter pacing.",
  },
];
