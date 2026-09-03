import { IconType } from "react-icons";
import { FaFilm, FaWaveSquare, FaPalette, FaMagic, FaCube } from "react-icons/fa";
import { MdOutlineAnimation } from "react-icons/md";

export interface Service {
  title: string;
  description: string;
  icon: IconType;
}

export const services: Service[] = [
  {
    title: "Video Editing",
    description: "Narrative-first cuts for commercials, docs, and long-form content.",
    icon: FaFilm,
  },
  {
    title: "Motion Graphics",
    description: "Kinetic type, brand idents, and animated UI for digital campaigns.",
    icon: MdOutlineAnimation,
  },
  {
    title: "Color Grading",
    description: "Mood-driven grades built in DaVinci Resolve, delivered in HDR or SDR.",
    icon: FaPalette,
  },
  {
    title: "Sound Design",
    description: "Foley, mix, and score selection tuned to picture.",
    icon: FaWaveSquare,
  },
  {
    title: "VFX",
    description: "Compositing, tracking, and clean-up for live-action plates.",
    icon: FaMagic,
  },
  {
    title: "3D Animation",
    description: "Product and title sequences modeled and rendered in Blender.",
    icon: FaCube,
  },
];
