/** Content adapted from the client-supplied website, retrieved 23 October 2026.
 * See docs/content-sources.md. Commercial prices and legal claims deliberately
 * await client verification; they are not inferred from imagery. */
export const sourceImage = (path: string) => `/source/images/${path}`;
/** Contact/profile publication is pending explicit approval for the public repository.
 * Configure these public-facing values after that approval; no secrets belong here. */
export const contact = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "Kigali, Rwanda",
  hours: "Monday–Friday, 8am–5pm CAT",
  instagram: "",
  linkedin: "",
};
export const team: string[][] = [];
export const services = [
  {
    slug: "architecture",
    title: "Architecture & design",
    verb: "Imagine.",
    image: "projects/designs/lakeside-villa-render.webp",
    label: "Architectural visualisation",
    intro:
      "Architecture that begins with the site, the climate and the people who will experience it.",
    text: "Our in-house architects develop villas and hospitality environments around Rwanda’s highland climate, seasonal rainfall, views and local building traditions. The architecture and construction teams work together from the first concept.",
    steps: [
      [
        "Site analysis",
        "Understand topography, orientation, access, views and the project brief.",
      ],
      [
        "Concept design",
        "Explore massing, spatial relationships and the character of the place.",
      ],
      [
        "Design development",
        "Resolve layouts, materials, elevations and interior flow.",
      ],
      [
        "Visualisation",
        "Bring the proposal into focus through renders and walkthroughs.",
      ],
      [
        "Construction documents",
        "Prepare coordinated working drawings for the next stage.",
      ],
    ],
  },
  {
    slug: "construction",
    title: "Construction",
    verb: "Make.",
    image: "projects/construction/showcase-construction.webp",
    label: "From the construction site",
    intro: "From a line on a drawing to a place you can stand in.",
    text: "Engineers, project managers and builders coordinate the delivery on site. Site preparation, structure, building systems and finishes are managed as connected parts of one project, with progress communicated to the client.",
    steps: [
      [
        "Prepare the site",
        "Survey, set out, excavate and establish the foundations and drainage.",
      ],
      [
        "Build the structure",
        "Coordinate the structural frame, roof and waterproofing.",
      ],
      [
        "Integrate the systems",
        "Bring together plumbing, electrical work and other building services.",
      ],
      [
        "Resolve the detail",
        "Install finishes, joinery and the materials that give a place its character.",
      ],
      [
        "Inspect and hand over",
        "Review the completed work, address snagging and prepare the handover.",
      ],
    ],
  },
  {
    slug: "land",
    title: "Land sourcing",
    verb: "Find.",
    image: "services/land-rwanda-hills.webp",
    label: "Rwanda / landscape",
    intro: "The right destination starts with understanding the land.",
    text: "We help clients explore sites across Rwanda and coordinate the assessment of access, terrain, infrastructure, intended use and the checks needed before acquisition. Each site is considered in relation to the experience it can support.",
    steps: [
      [
        "Define the brief",
        "Discuss your location, intended use and development priorities.",
      ],
      [
        "Explore sites",
        "Identify land that fits the project and its relationship to the landscape.",
      ],
      [
        "Assess the opportunity",
        "Review access, terrain, utilities and development constraints.",
      ],
      [
        "Coordinate due diligence",
        "Arrange the relevant title, zoning and professional checks before a decision.",
      ],
    ],
  },
  {
    slug: "villa-management",
    title: "Villa management",
    verb: "Welcome.",
    image: "projects/interiors/living-room.webp",
    label: "Villa interior",
    intro: "Built by Ever Design. Welcomed by Ever Retreat.",
    text: "Ever Retreat manages the guest experience after handover. The service brings together property presentation, listings, guest communication, cleaning, maintenance coordination and owner reporting.",
    steps: [
      [
        "Prepare the property",
        "Assess the villa, its presentation and what it needs before welcoming guests.",
      ],
      [
        "Launch the stay",
        "Coordinate photography, listings, pricing and booking calendars.",
      ],
      [
        "Welcome guests",
        "Manage communication, arrivals and the details of each stay.",
      ],
      [
        "Care for the place",
        "Coordinate cleaning, maintenance and regular owner reporting.",
      ],
    ],
  },
  {
    slug: "development-partnerships",
    title: "Development partnerships",
    verb: "Together.",
    image: "projects/team/site-planning.webp",
    label: "Planning in the field",
    intro:
      "Bring the land, the ambition or the idea. Let’s shape what comes next.",
    text: "We work with landowners and development partners to explore hospitality and tourism projects in Rwanda. The conversation starts with the site, the vision and the practical work required to move from opportunity to delivery.",
    steps: [
      [
        "Start a conversation",
        "Share the site, its context and your ambition for the development.",
      ],
      [
        "Review feasibility",
        "Explore the project’s scope, constraints and delivery needs together.",
      ],
      [
        "Shape the partnership",
        "Agree responsibilities and the professional work needed for a clear proposal.",
      ],
      [
        "Develop the place",
        "Connect the planning, architecture and construction teams around one direction.",
      ],
    ],
  },
];
export const projects = [
  {
    slug: "bp-ever-retreat-villa",
    title: "B&P Ever Retreat Villa",
    place: "Rubavu / Lake Kivu",
    area: "rubavu",
    status: "Completed showcase",
    availability: "Showcase villa · not for sale",
    image: "projects/bp-ever-retreat/villa-night.webp",
    label: "Project photography",
    intro: "A lakeside showcase of tropical living.",
    text: "On the Rubavu hillside near Lake Kivu, B&P Ever Retreat Villa brings together open living spaces, a private pool, greenery and natural light. It is a completed showcase of Ever Design’s design and construction work, with villa management by Ever Retreat.",
    details: [
      ["Location", "Rubavu, Lake Kivu"],
      ["Project type", "Showcase villa"],
      ["Build status", "Completed"],
      ["Availability", "Not for sale"],
    ],
    gallery: [
      "projects/bp-ever-retreat/villa-from-lake.webp",
      "projects/bp-ever-retreat/villa-banana-garden.webp",
      "projects/bp-ever-retreat/glass-pavilion-night.webp",
    ],
  },
  {
    slug: "cottage",
    title: "Cottage",
    place: "Rubavu / Lake Kivu",
    area: "rubavu",
    status: "Completed showcase",
    availability: "Showcase villa · not for sale",
    image: "projects/retreat-renders/cottage-hillside.webp",
    label: "Architectural visualisation",
    intro: "A quieter perspective on Lake Kivu.",
    text: "Cottage is a completed three-bedroom showcase villa above Rubavu, with panoramic lake views, floor-to-ceiling windows and a private plunge pool. Local stone and timber connect the spaces to the hillside. The cover image is an architectural visualisation.",
    details: [
      ["Location", "Rubavu, Lake Kivu"],
      ["Bedrooms", "3"],
      ["Build status", "Completed showcase"],
      ["Availability", "Not for sale"],
    ],
    gallery: ["rwanda/lake-kivu.webp", "rwanda/lake-kivu-water.webp"],
  },
  {
    slug: "virunga-villas",
    title: "Virunga Villas",
    place: "Musanze / Volcanoes region",
    area: "musanze",
    status: "Coming soon",
    availability: "In design · enquire for current availability",
    image: "projects/virunga/virunga-villa.webp",
    label: "Development visualisation",
    intro: "A small community beneath the mountains.",
    text: "A proposed boutique community in Musanze, Virunga Villas brings together two-, three- and four-bedroom villa designs. The concept explores private pools, shared landscape and a close relationship to the Volcanoes region. Current plans and availability can be discussed with the team.",
    details: [
      ["Location", "Musanze"],
      ["Stage", "In design / coming soon"],
      ["Proposed mix", "2, 3 & 4 bedrooms"],
      ["Next step", "Request the current project brief"],
    ],
    gallery: [
      "projects/designs/pool-villa-render.webp",
      "projects/retreat-renders/hillside-villa-mountain-view.webp",
      "projects/retreat-renders/resort-pool-lounge.webp",
    ],
  },
  {
    slug: "nyungwe-retreat",
    title: "Nyungwe Retreat",
    place: "Nyungwe",
    area: "nyungwe",
    status: "Off-plan",
    availability: "Proposed development · enquire for current details",
    image: "projects/villas/nyungwe-forest-villa.webp",
    label: "Project concept image",
    intro: "A retreat shaped by the forest.",
    text: "A proposed off-plan development, Nyungwe Retreat explores a villa experience connected to Rwanda’s forest landscape. Speak with the team for the current scope, site information and development stage.",
    details: [
      ["Location", "Nyungwe"],
      ["Stage", "Off-plan"],
      ["Project type", "Retreat / villas"],
      ["Next step", "Discuss the current proposal"],
    ],
    gallery: ["rwanda/nyungwe-road.webp"],
  },
  {
    slug: "muhazi-villas",
    title: "Muhazi Villas",
    place: "Lake Muhazi",
    area: "muhazi",
    status: "Off-plan",
    availability: "Proposed development · enquire for current details",
    image: "projects/villas/lakeside-chalet.webp",
    label: "Project concept image",
    intro: "Space to slow down by the water.",
    text: "Muhazi Villas is a proposed lakeside development at Lake Muhazi. The setting offers a different rhythm within reach of Kigali. Contact Ever Design for the current project brief and site information.",
    details: [
      ["Location", "Lake Muhazi"],
      ["Stage", "Off-plan"],
      ["Project type", "Villas"],
      ["Next step", "Request project information"],
    ],
    gallery: ["rwanda/muhazi-hills.webp"],
  },
  {
    slug: "akagera-retreat",
    title: "Akagera Retreat",
    place: "Akagera",
    area: "akagera",
    status: "Off-plan",
    availability: "Proposed development · enquire for current details",
    image: "projects/villas/hillside-villas.webp",
    label: "Project concept image",
    intro: "An experience of Rwanda’s open landscape.",
    text: "Akagera Retreat is a proposed development in the Akagera area. The concept connects hospitality to the character of the surrounding landscape. The team can provide current information on the proposal and its site.",
    details: [
      ["Location", "Akagera area"],
      ["Stage", "Off-plan"],
      ["Project type", "Retreat / villas"],
      ["Next step", "Discuss the proposal"],
    ],
    gallery: ["rwanda/akagera-wildlife.webp"],
  },
  {
    slug: "kigali-retreat",
    title: "Kigali Retreat",
    place: "Kigali",
    area: "kigali",
    status: "Off-plan",
    availability: "Proposed development · enquire for current details",
    image: "projects/villas/stone-villa.webp",
    label: "Project concept image",
    intro: "A retreat within the capital.",
    text: "Kigali Retreat is an off-plan villa development in Rwanda’s capital. Speak with Ever Design about the current vision, project scope and next steps.",
    details: [
      ["Location", "Kigali"],
      ["Stage", "Off-plan"],
      ["Project type", "Villas"],
      ["Next step", "Request project information"],
    ],
    gallery: ["rwanda/kigali-boulevard.webp"],
  },
];
export const areas = [
  {
    slug: "rubavu",
    name: "Rubavu",
    line: "Life along Lake Kivu.",
    image: "rwanda/gisenyi-lake-view.webp",
    text: "The lake, the western hills and the rhythm of the waterfront give Rubavu its character. It is home to Ever Design’s two completed showcase villas and to a hospitality experience shaped by the water.",
    focus: "Lakeside villas / holiday stays",
  },
  {
    slug: "musanze",
    name: "Musanze",
    line: "In the presence of mountains.",
    image: "rwanda/musanze-countryside.webp",
    text: "The Volcanoes region brings mountain scenery, hiking and gorilla trekking into the experience of a place. Architecture here responds to the highland setting, with spaces for shelter, warmth and views.",
    focus: "Mountain retreats / hospitality",
  },
  {
    slug: "nyungwe",
    name: "Nyungwe",
    line: "The forest sets the pace.",
    image: "rwanda/nyungwe-road.webp",
    text: "Forest landscapes invite a quieter form of hospitality. Projects in the Nyungwe area call for careful attention to terrain, rain, vegetation and the experience of being close to nature.",
    focus: "Forest retreats / eco-tourism",
  },
  {
    slug: "kigali",
    name: "Kigali",
    line: "A city with its own story.",
    image: "rwanda/kigali-boulevard.webp",
    text: "Rwanda’s capital brings together daily city life, business travel and an evolving architectural landscape. Ever Design’s office is in Kimihurura, where the team connects planning and design with delivery across the country.",
    focus: "City villas / business stays",
  },
  {
    slug: "muhazi",
    name: "Lake Muhazi",
    line: "A change of rhythm.",
    image: "rwanda/muhazi-hills.webp",
    text: "Lake Muhazi offers a lakeside landscape within reach of Kigali. Its water, green hills and slower pace create a setting for weekend stays, private retreats and thoughtfully placed villas.",
    focus: "Lakeside retreats / weekend stays",
  },
  {
    slug: "akagera",
    name: "Akagera",
    line: "Room for the wild.",
    image: "rwanda/akagera-wildlife.webp",
    text: "The Akagera area connects hospitality to Rwanda’s savannah landscape and safari experience. Any development begins with understanding its site, access and relationship to the surrounding environment.",
    focus: "Safari hospitality / eco-retreats",
  },
];
export const portfolio = [
  [
    "B&P Ever Retreat Villa",
    "projects/bp-ever-retreat/villa-banana-garden.webp",
    "Built work",
    "/developments/bp-ever-retreat-villa",
  ],
  [
    "Glass pavilion",
    "projects/bp-ever-retreat/glass-pavilion-night.webp",
    "Built work",
    "/developments/bp-ever-retreat-villa",
  ],
  [
    "Lakeside villa",
    "projects/designs/lakeside-villa-render.webp",
    "Design studies",
    "/services/architecture",
  ],
  [
    "Pool villa",
    "projects/designs/pool-villa-render.webp",
    "Design studies",
    "/services/architecture",
  ],
  [
    "From the site",
    "projects/construction/site-excavation.webp",
    "In progress",
    "/services/construction",
  ],
  [
    "Structure & detail",
    "projects/construction/scaffold-inspection.webp",
    "In progress",
    "/services/construction",
  ],
  [
    "Planning together",
    "projects/team/site-planning.webp",
    "In progress",
    "/about",
  ],
  [
    "Virunga Villas",
    "projects/virunga/virunga-villa.webp",
    "Design studies",
    "/developments/virunga-villas",
  ],
];
