export type Treatment = {
  slug: string;
  title: string;
  short: string;
  signs: string[];
  drivers: string[];
  outcomes: string[];
};

export const TREATMENTS: Treatment[] = [
  {
    slug: "speech-delay",
    title: "Speech Delay",
    short:
      "Speech delay can co-occur with swallowing disorders (Dysphagia) and motor speech disorders (Apraxia). We work on the drivers behind functional communication, not just words.",
    signs: [
      "Few or no spoken words by age 2",
      "Limited vocabulary growth between 2 and 4",
      "Echoes phrases without using them functionally",
      "Difficulty expressing needs without melting down",
    ],
    drivers: [
      "Joint attention and shared engagement",
      "Oral-motor and feeding capacity",
      "Auditory processing and intent to communicate",
      "Daily home language environment",
    ],
    outcomes: [
      "First functional words and phrases",
      "Better requesting and refusing",
      "Stronger comprehension before speech",
      "Reduced frustration meltdowns",
    ],
  },
  {
    slug: "hyperactivity",
    title: "Hyperactivity",
    short:
      "Unchecked hyperactivity is often a silent barrier — shaping school, sleep and behaviour long before parents realise it.",
    signs: [
      "Constantly on the move, can't sit through a meal or story",
      "Impulsive — runs, climbs, grabs without pause",
      "Sleep that is short, broken or restless",
      "Quick frustration and big emotional swings",
    ],
    drivers: [
      "Sensory regulation (proprioception, vestibular)",
      "Sleep architecture and routine",
      "Diet, screens and stimulation load",
      "Predictable structure across the day",
    ],
    outcomes: [
      "Longer sit-tolerance and attention",
      "Calmer transitions between activities",
      "Better sleep onset and depth",
      "Fewer meltdowns at home and school",
    ],
  },
  {
    slug: "learning-disability",
    title: "Learning Disability",
    short:
      "Learning disabilities — including those alongside autism — present significant challenges in academics and everyday life. Targeted, structured support changes the trajectory.",
    signs: [
      "Reading, writing or maths far behind peers",
      "Inconsistent performance — knows it one day, not the next",
      "Avoidance of school work, anxiety around homework",
      "Slow processing or difficulty following multi-step instructions",
    ],
    drivers: [
      "Working memory and processing speed",
      "Pre-academic foundations (phonological, number sense)",
      "Attention and self-regulation",
      "Confidence and motivation around learning",
    ],
    outcomes: [
      "Stronger pre-academic foundations",
      "Better classroom adaptation",
      "Reduced school anxiety",
      "Sustained learning gains at home",
    ],
  },
  {
    slug: "daily-living-difficulty",
    title: "Difficulty in Daily Living Activities",
    short:
      "A common challenge for neurodiverse children — affecting their ability to perform routine tasks and maintain independence.",
    signs: [
      "Heavy parent dependence for dressing, eating, hygiene",
      "Resistance to brushing, bathing or toileting",
      "Picky eating that limits variety severely",
      "Difficulty with sleep and morning routines",
    ],
    drivers: [
      "Motor planning and sequencing",
      "Sensory tolerance for clothing, food, water",
      "Predictable routines and visual structure",
      "Graded independence over months, not days",
    ],
    outcomes: [
      "Independent dressing and toileting",
      "Wider food acceptance",
      "Calmer bath, brush and bedtime",
      "Confidence to try new tasks",
    ],
  },
  {
    slug: "social-behavioural-difficulty",
    title: "Social & Behavioural Difficulty",
    short:
      "Common challenges that impact interactions, friendships and emotional regulation across home, school and community.",
    signs: [
      "Few or no peer friendships",
      "Aggression, biting or hitting under stress",
      "Frequent meltdowns over small triggers",
      "Difficulty taking turns or sharing",
    ],
    drivers: [
      "Emotional regulation capacity",
      "Joint attention and reciprocity",
      "Predictable consequences and boundaries",
      "Social-skill scaffolding by parents",
    ],
    outcomes: [
      "Reduced aggression and meltdowns",
      "Better turn-taking and sharing",
      "Beginnings of peer friendships",
      "Calmer family life",
    ],
  },
  {
    slug: "cognitive-delay",
    title: "Cognitive Delay",
    short:
      "Cognitive delays affect how a child processes information and performs daily tasks — and respond well to structured, parent-led inputs.",
    signs: [
      "Slower to learn cause-and-effect",
      "Limited pretend play",
      "Difficulty solving simple problems for age",
      "Poor recall of recent activities",
    ],
    drivers: [
      "Curiosity, exploration and play quality",
      "Language and concept exposure",
      "Repetition with variation",
      "Sleep, nutrition and physical activity",
    ],
    outcomes: [
      "Richer play and exploration",
      "Faster concept learning",
      "Better problem-solving in routines",
      "Stronger memory for daily events",
    ],
  },
  {
    slug: "epilepsy",
    title: "Epilepsy",
    short:
      "Epilepsy, often seen alongside autism, can disrupt daily life. Coordinated medical and developmental care reduces stress and accelerates progress.",
    signs: [
      "Diagnosed seizures (any type)",
      "Sudden staring spells, loss of awareness",
      "Unexplained falls or jerky movements",
      "Regression after a seizure cluster",
    ],
    drivers: [
      "Coordinated medical management with paediatric neurology",
      "Sleep, hydration and trigger awareness",
      "Safety-first home environment",
      "Development tracks that respect medical timing",
    ],
    outcomes: [
      "Family confidence around seizure response",
      "Steady developmental progress between events",
      "Better sleep and routines",
      "Reduced parent anxiety",
    ],
  },
  {
    slug: "cerebral-palsy",
    title: "Cerebral Palsy",
    short:
      "Cerebral palsy can affect movement, coordination and daily tasks — impacting independence and quality of life. We integrate development with therapy.",
    signs: [
      "Delayed motor milestones (sitting, standing, walking)",
      "Stiff or floppy tone, asymmetric movement",
      "Difficulty with feeding, swallowing or speech",
      "Fine-motor difficulty affecting play and self-care",
    ],
    drivers: [
      "Coordinated PT, OT and speech with home practice",
      "Positioning, mobility and equipment use",
      "Communication channels beyond speech",
      "Family wellbeing and sustainable routines",
    ],
    outcomes: [
      "Functional gains in mobility or communication",
      "Improved self-care and participation",
      "Reduced caregiver burnout",
      "Inclusion at home, school and community",
    ],
  },
];

export const getTreatment = (slug: string) =>
  TREATMENTS.find((t) => t.slug === slug);
