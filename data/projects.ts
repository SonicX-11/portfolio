export interface Project {
  id: string;
  title: string;
  category:
    | "Commercial"
    | "Documentary"
    | "Real Estate"
    | "Social Media"
    | "Podcast"
    | "Luxury Brand"
    | "Sports";
  description: string;
  thumbnail: string;
  /** Opens directly in a new tab — used for Google Drive (or any external) source links. */
  driveLink?: string;
}

/**
 * Titles below are taken directly from each Google Drive item's own name
 * (the folder/file name as it appears in Drive), per your request. Categories
 * and descriptions are placeholders — edit them to describe what's actually
 * in each folder/file once you've had a look.
 */
export const projects: Project[] = [
  {
    id: "p1",
    title: "Yasmin Yousry",
    category: "Commercial",
    description: "Add a description for what's in this folder.",
    thumbnail: "/images/projects/velour.svg",
    driveLink: "https://drive.google.com/drive/folders/19tGAvhQ2aB-lvIIJ86GeYndJc0WMmfWf?usp=drive_link",
  },
  {
    id: "p2",
    title: "Emirates",
    category: "Commercial",
    description: "Add a description for what's in this folder.",
    thumbnail: "/images/projects/concrete-light.svg",
    driveLink: "https://drive.google.com/drive/folders/1R-OdYZn6vRNlxCsyfRQJPzGSWEEdzNgK?usp=drive_link",
  },
  {
    id: "p3",
    title: "Hatoom",
    category: "Commercial",
    description: "Add a description for what's in this folder.",
    thumbnail: "/images/projects/meridian.svg",
    driveLink: "https://drive.google.com/drive/folders/1XBqXV25ll9hdf55BA9Kk-xQHifXlAWRF?usp=drive_link",
  },
  {
    id: "p4",
    title: "Dr Maan",
    category: "Commercial",
    description: "Add a description for what's in this folder.",
    thumbnail: "/images/projects/nightshift.svg",
    driveLink: "https://drive.google.com/drive/folders/1BVKkw4eq0dT3aNCcgNTMn6fgr4V1QTKK?usp=drive_link",
  },
  {
    id: "p5",
    title: "EL BADR",
    category: "Commercial",
    description: "Add a description for this clip.",
    thumbnail: "/images/projects/off-record.svg",
    driveLink: "https://drive.google.com/drive/folders/1EpNEaUvNYS1yZuwf7rkI_8kN_CRsiuzb?usp=drive_link",
  },
  {
    id: "p6",
    title: "x870e.mp4",
    category: "Commercial",
    description: "Add a description for this clip.",
    thumbnail: "/images/projects/halcyon.svg",
    driveLink: "https://drive.google.com/file/d/1Oy4Erhe7Mm7mqK6cizq7l_Ix0T8mUw6J/view?usp=drive_link",
  },
];
