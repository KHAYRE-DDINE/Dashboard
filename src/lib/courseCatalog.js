import arabicImage from "../images/college.png";
import physicsImage from "../images/atom.png";
import mathImage from "../images/mathematics.png";
import chemistryImage from "../images/chimie.png";
import programmingImage from "../images/board.png";
import logicImage from "../images/brain.png";

export const currentCourses = [
  {
    id: "cur-ar-101",
    title: "Arabic Language Foundations",
    subject: "Arabic",
    description:
      "Master reading, writing, and grammar with guided practice and weekly speaking labs.",
    image: arabicImage,
    progress: 62,
    totalHours: 28,
    lessons: 16,
    nextAssignment: "Vocabulary Quiz - Monday",
  },
  {
    id: "cur-ph-120",
    title: "Physics: Motion and Forces",
    subject: "Physics",
    description:
      "Understand motion, Newton's laws, and energy through real-world experiments and simulations.",
    image: physicsImage,
    progress: 41,
    totalHours: 36,
    lessons: 20,
    nextAssignment: "Lab Report - Wednesday",
  },
  {
    id: "cur-ma-140",
    title: "Mathematics for Problem Solving",
    subject: "Math",
    description:
      "Build confidence in algebra, functions, and equations using step-by-step problem workshops.",
    image: mathImage,
    progress: 74,
    totalHours: 32,
    lessons: 18,
    nextAssignment: "Practice Set 5 - Friday",
  },
];

export const completedCourses = [
  {
    id: "cmp-ch-110",
    title: "Chemistry Basics",
    subject: "Chemistry",
    description:
      "Completed core chemistry concepts including atoms, bonding, and reaction balancing.",
    image: chemistryImage,
    completedOn: "2026-05-12",
    grade: "A-",
    certificateReady: true,
  },
  {
    id: "cmp-pr-101",
    title: "Programming Fundamentals",
    subject: "Computer Science",
    description:
      "Finished variables, conditionals, loops, and clean coding practices with mini projects.",
    image: programmingImage,
    completedOn: "2026-04-03",
    grade: "A",
    certificateReady: true,
  },
];

export const archivedCourses = [
  {
    id: "arc-lg-090",
    title: "Logic and Critical Thinking",
    subject: "General Skills",
    description:
      "Archived after completion of the previous semester learning path.",
    image: logicImage,
    archivedOn: "2026-03-19",
    reason: "Old semester plan",
  },
  {
    id: "arc-ar-080",
    title: "Arabic Reading Club",
    subject: "Arabic",
    description:
      "Archived elective with reading sessions focused on classical and modern short texts.",
    image: arabicImage,
    archivedOn: "2026-01-27",
    reason: "Replaced by updated track",
  },
];
