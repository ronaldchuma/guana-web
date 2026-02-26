import type { Locale } from "@/lib/i18n/config";

export interface RouteData {
  slug: string;
  origin: { en: string; es: string };
  destination: { en: string; es: string };
  distance: string;
  duration: string;
  price: string;
  image?: string;
  description: { en: string; es: string };
  highlights: { en: string[]; es: string[] };
  faq: {
    en: { q: string; a: string }[];
    es: { q: string; a: string }[];
  };
  related: string[];
}

export const routes: RouteData[] = [
  // ── 1. San Jose → Jaco ───────────────────────────────────────────────
  {
    slug: "san-jose-jaco",
    origin: { en: "San José", es: "San José" },
    destination: { en: "Jacó", es: "Jacó" },
    distance: "97 km",
    duration: "1h 30m",
    price: "$8",
    image: "/images/routes/san-jose-jaco.jpg",
    description: {
      en: "The San José to Jacó route is the fastest way to get from Costa Rica's capital to the Central Pacific coast, covering 97 km in roughly 90 minutes. The drive descends through the scenic Cerro de la Muerte foothills and follows the Autopista del Sol (Route 27) before dropping into the warm coastal lowlands. Jacó is one of Costa Rica's most accessible beach towns, known for its consistent surf breaks, lively nightlife, and proximity to Carara National Park — a transitional forest home to scarlet macaws.\n\nWhether you're a weekend surfer, a digital nomad heading to the coast, or a traveler connecting to southern Nicoya beaches via the Tárcoles ferry, this corridor is one of the most-traveled in the country. Sharing a ride keeps costs low and takes the stress out of navigating the mountain passes.",
      es: "La ruta de San José a Jacó es la forma más rápida de llegar desde la capital de Costa Rica hasta la costa del Pacífico Central, cubriendo 97 km en aproximadamente 90 minutos. El recorrido desciende por las estribaciones del Cerro de la Muerte y sigue la Autopista del Sol (Ruta 27) antes de bajar a las cálidas tierras bajas costeras. Jacó es uno de los pueblos de playa más accesibles de Costa Rica, conocido por sus olas consistentes para el surf, su animada vida nocturna y su cercanía al Parque Nacional Carara, un bosque de transición hogar de lapas rojas.\n\nYa sea que seas un surfista de fin de semana, un nómada digital rumbo a la costa, o un viajero conectando hacia las playas del sur de Nicoya por el ferry de Tárcoles, este corredor es uno de los más transitados del país. Compartir viaje mantiene los costos bajos y elimina el estrés de manejar por los pasos de montaña.",
    },
    highlights: {
      en: [
        "Closest beach town to the capital — under 2 hours",
        "Consistent year-round surf breaks for all levels",
        "Gateway to Carara National Park and scarlet macaw habitat",
        "Vibrant nightlife and restaurant scene",
      ],
      es: [
        "El pueblo de playa más cercano a la capital — menos de 2 horas",
        "Olas consistentes todo el año para todos los niveles",
        "Puerta de entrada al Parque Nacional Carara y hábitat de lapas rojas",
        "Animada vida nocturna y escena gastronómica",
      ],
    },
    faq: {
      en: [
        {
          q: "How long is the drive from San José to Jacó?",
          a: "The drive takes approximately 1 hour and 30 minutes via the Autopista del Sol (Route 27). Traffic on Friday afternoons and Sunday evenings can add 30–60 minutes.",
        },
        {
          q: "Can I bring a surfboard on a shared ride?",
          a: "Yes. When you book through Guana, you can indicate that you're traveling with a surfboard so we can match you with a vehicle that has roof racks or enough interior space.",
        },
        {
          q: "What is the best time to travel this route?",
          a: "Weekday mornings offer the smoothest drive. If you're traveling on weekends, departing before 7 AM or after 2 PM helps you avoid the heaviest traffic near the Atenas interchange.",
        },
      ],
      es: [
        {
          q: "¿Cuánto dura el viaje de San José a Jacó?",
          a: "El viaje dura aproximadamente 1 hora y 30 minutos por la Autopista del Sol (Ruta 27). El tráfico los viernes por la tarde y domingos por la noche puede agregar de 30 a 60 minutos.",
        },
        {
          q: "¿Puedo llevar una tabla de surf en un viaje compartido?",
          a: "Sí. Al reservar a través de Guana, puedes indicar que viajas con tabla de surf para que te emparejemos con un vehículo que tenga rack de techo o suficiente espacio interior.",
        },
        {
          q: "¿Cuál es la mejor hora para viajar en esta ruta?",
          a: "Las mañanas entre semana ofrecen el viaje más fluido. Si viajas en fin de semana, salir antes de las 7 AM o después de las 2 PM te ayuda a evitar el tráfico más pesado cerca del intercambio de Atenas.",
        },
      ],
    },
    related: ["san-jose-dominical", "san-jose-santa-teresa"],
  },

  // ── 2. San Jose → Tamarindo ──────────────────────────────────────────
  {
    slug: "san-jose-tamarindo",
    origin: { en: "San José", es: "San José" },
    destination: { en: "Tamarindo", es: "Tamarindo" },
    distance: "266 km",
    duration: "4h",
    price: "$18",
    image: "/images/routes/san-jose-tamarindo.jpg",
    description: {
      en: "The San José to Tamarindo route connects Costa Rica's capital to one of Guanacaste's most popular beach destinations, spanning 266 km and roughly four hours of driving. The journey follows the Inter-American Highway (Route 1) north through the Central Valley, past the Arenal turnoff, and into the dry tropical lowlands of Guanacaste before heading west to the coast. Tamarindo is a world-renowned surf town with a golden-sand beach, warm water year-round, and a cosmopolitan mix of restaurants, surf schools, and eco-tours.\n\nTamarindo also serves as a hub for exploring nearby beaches like Playa Grande (a leatherback turtle nesting site), Playa Avellanas, and Playa Negra. The town's international airport in Liberia (LIR) is only an hour away, but many travelers still start their trip in San José. Sharing the ride makes the long drive social, affordable, and far more comfortable than a public bus.",
      es: "La ruta de San José a Tamarindo conecta la capital de Costa Rica con uno de los destinos de playa más populares de Guanacaste, abarcando 266 km y aproximadamente cuatro horas de viaje. El recorrido sigue la Carretera Interamericana (Ruta 1) hacia el norte a través del Valle Central, pasando el desvío a Arenal, y entrando a las tierras bajas tropicales secas de Guanacaste antes de dirigirse al oeste hacia la costa. Tamarindo es un pueblo de surf de renombre mundial con una playa de arena dorada, agua cálida todo el año, y una mezcla cosmopolita de restaurantes, escuelas de surf y eco-tours.\n\nTamarindo también funciona como centro para explorar playas cercanas como Playa Grande (sitio de anidación de tortugas baulas), Playa Avellanas y Playa Negra. El aeropuerto internacional de Liberia (LIR) está a solo una hora, pero muchos viajeros aún inician su viaje en San José. Compartir el viaje hace que el largo trayecto sea social, económico y mucho más cómodo que un autobús público.",
    },
    highlights: {
      en: [
        "World-class surf breaks and warm water year-round",
        "Cosmopolitan dining and vibrant beach-town culture",
        "Gateway to Playa Grande, Avellanas, and Negra",
        "Stunning Guanacaste sunsets over the Pacific",
      ],
      es: [
        "Olas de clase mundial y agua cálida todo el año",
        "Gastronomía cosmopolita y vibrante cultura playera",
        "Puerta de entrada a Playa Grande, Avellanas y Negra",
        "Impresionantes atardeceres guanacastecos sobre el Pacífico",
      ],
    },
    faq: {
      en: [
        {
          q: "How long does it take to get from San José to Tamarindo?",
          a: "The drive is approximately 4 hours via the Inter-American Highway. Road conditions are generally good, but construction near Cañas can occasionally add delays.",
        },
        {
          q: "Is it better to fly to Liberia instead?",
          a: "If you're already in San José, a shared ride is often more convenient and affordable than booking a domestic flight. Plus, you get to enjoy the scenic drive through Guanacaste's countryside.",
        },
        {
          q: "What should I pack for Tamarindo?",
          a: "Tamarindo is hot and dry most of the year. Pack light clothing, sunscreen, and reef-safe sunblock. If you're surfing, you can rent boards locally, but bringing your own is easy with Guana's surfboard-friendly vehicles.",
        },
      ],
      es: [
        {
          q: "¿Cuánto tiempo toma llegar de San José a Tamarindo?",
          a: "El viaje dura aproximadamente 4 horas por la Carretera Interamericana. Las condiciones de la carretera son generalmente buenas, pero las obras cerca de Cañas pueden ocasionar retrasos.",
        },
        {
          q: "¿Es mejor volar a Liberia?",
          a: "Si ya estás en San José, un viaje compartido suele ser más conveniente y económico que reservar un vuelo doméstico. Además, disfrutas del recorrido escénico por el campo guanacasteco.",
        },
        {
          q: "¿Qué debo empacar para Tamarindo?",
          a: "Tamarindo es caliente y seco la mayor parte del año. Empaca ropa ligera, protector solar y bloqueador amigable con los arrecifes. Si vas a surfear, puedes alquilar tablas localmente, pero traer la tuya es fácil con los vehículos de Guana adaptados para tablas.",
        },
      ],
    },
    related: ["liberia-tamarindo", "san-jose-nosara"],
  },

  // ── 3. San Jose → Santa Teresa ────────────────────────────────────────
  {
    slug: "san-jose-santa-teresa",
    origin: { en: "San José", es: "San José" },
    destination: { en: "Santa Teresa", es: "Santa Teresa" },
    distance: "160 km",
    duration: "3h 30m",
    price: "$15",
    image: "/images/routes/san-jose-santa-teresa.jpg",
    description: {
      en: "The San José to Santa Teresa route takes you from Costa Rica's capital to the tip of the Nicoya Peninsula, a journey of roughly 160 km that typically takes 3.5 hours when using the Puntarenas–Paquera ferry crossing. The alternative all-road route via the Friendship Bridge is longer at around 5 hours but avoids the ferry schedule. Santa Teresa has evolved from a sleepy fishing village into one of Central America's most sought-after surf and yoga destinations, attracting a global community of wave riders, wellness seekers, and remote workers.\n\nThe coastline around Santa Teresa, Mal País, and Playa Hermosa offers powerful, consistent waves, dramatic rocky headlands, and some of the most photogenic sunsets in the country. The town's unpaved main road is lined with boutique hotels, organic cafés, and surf shops. Getting there by shared ride means you can relax through the ferry crossing and arrive ready to hit the water instead of exhausted from driving unfamiliar roads.",
      es: "La ruta de San José a Santa Teresa te lleva desde la capital de Costa Rica hasta la punta de la Península de Nicoya, un recorrido de aproximadamente 160 km que normalmente toma 3 horas y media usando el ferry Puntarenas–Paquera. La alternativa por carretera vía el Puente de la Amistad es más larga, alrededor de 5 horas, pero evita los horarios del ferry. Santa Teresa ha evolucionado de un tranquilo pueblo pesquero a uno de los destinos de surf y yoga más codiciados de Centroamérica, atrayendo una comunidad global de surfistas, buscadores de bienestar y trabajadores remotos.\n\nLa costa alrededor de Santa Teresa, Mal País y Playa Hermosa ofrece olas potentes y consistentes, dramáticos promontorios rocosos y algunos de los atardeceres más fotogénicos del país. La calle principal sin pavimentar está bordeada de hoteles boutique, cafés orgánicos y tiendas de surf. Llegar en viaje compartido significa que puedes relajarte durante el cruce en ferry y llegar listo para meterte al agua en vez de agotado por manejar caminos desconocidos.",
    },
    highlights: {
      en: [
        "World-class surf at Playa Santa Teresa and Mal País",
        "Thriving yoga and wellness community",
        "Scenic ferry crossing through the Gulf of Nicoya",
        "Bohemian beach-town vibe with organic dining",
      ],
      es: [
        "Surf de clase mundial en Playa Santa Teresa y Mal País",
        "Próspera comunidad de yoga y bienestar",
        "Cruce escénico en ferry por el Golfo de Nicoya",
        "Ambiente bohemio playero con gastronomía orgánica",
      ],
    },
    faq: {
      en: [
        {
          q: "Do I need to take a ferry to reach Santa Teresa?",
          a: "The fastest route uses the Puntarenas–Paquera ferry, which takes about 1.5 hours crossing the Gulf of Nicoya. An all-road alternative via the Friendship Bridge adds roughly 1.5 extra hours of driving but avoids the ferry.",
        },
        {
          q: "How long is the total travel time?",
          a: "Via the ferry, expect about 3.5 hours total including the crossing. The all-road route takes approximately 5 hours. With Guana, the ferry option is coordinated so you arrive at the dock with time to spare.",
        },
        {
          q: "Is the road to Santa Teresa paved?",
          a: "The main highway to Paquera is paved. From Cobano to Santa Teresa, the road alternates between paved and gravel sections. It's passable in a regular car year-round, but a vehicle with higher clearance is more comfortable during the rainy season.",
        },
      ],
      es: [
        {
          q: "¿Necesito tomar un ferry para llegar a Santa Teresa?",
          a: "La ruta más rápida usa el ferry Puntarenas–Paquera, que tarda alrededor de 1.5 horas cruzando el Golfo de Nicoya. La alternativa por carretera vía el Puente de la Amistad agrega aproximadamente 1.5 horas extra de manejo pero evita el ferry.",
        },
        {
          q: "¿Cuánto dura el viaje en total?",
          a: "Vía el ferry, calcula unas 3 horas y media en total incluyendo el cruce. La ruta por carretera toma aproximadamente 5 horas. Con Guana, la opción del ferry se coordina para que llegues al muelle con tiempo de sobra.",
        },
        {
          q: "¿Está pavimentado el camino a Santa Teresa?",
          a: "La carretera principal hasta Paquera está pavimentada. De Cobano a Santa Teresa, el camino alterna entre tramos pavimentados y de lastre. Es transitable en carro normal todo el año, pero un vehículo con mayor altura es más cómodo en época lluviosa.",
        },
      ],
    },
    related: ["san-jose-jaco", "san-jose-nosara"],
  },

  // ── 4. San Jose → Nosara ─────────────────────────────────────────────
  {
    slug: "san-jose-nosara",
    origin: { en: "San José", es: "San José" },
    destination: { en: "Nosara", es: "Nosara" },
    distance: "266 km",
    duration: "4h 30m",
    price: "$20",
    image: "/images/routes/san-jose-nosara.jpg",
    description: {
      en: "The San José to Nosara route covers 266 km and approximately 4.5 hours of driving, taking you from the Central Valley down into the Nicoya Peninsula's laid-back coastal community. The journey follows the Inter-American Highway north before branching west through Nicoya town and along increasingly rural roads to the coast. Nosara is an internationally recognized Blue Zone — one of the places on Earth where people live measurably longer — and the area's emphasis on wellness, sustainability, and outdoor living is immediately apparent.\n\nPlaya Guiones, Nosara's main surf beach, offers one of the most beginner-friendly yet endlessly fun waves in Costa Rica, breaking over a sandy bottom for hundreds of meters. The Nosara area is also home to the Ostional National Wildlife Refuge, where hundreds of thousands of olive ridley turtles nest in synchronized mass arrivals known as arribadas. A shared ride to Nosara lets you skip the stress of navigating rural intersections and arrive relaxed.",
      es: "La ruta de San José a Nosara cubre 266 km y aproximadamente 4 horas y media de manejo, llevándote desde el Valle Central hasta la relajada comunidad costera de la Península de Nicoya. El recorrido sigue la Carretera Interamericana hacia el norte antes de desviarse al oeste por la ciudad de Nicoya y a lo largo de caminos cada vez más rurales hasta la costa. Nosara es una Zona Azul reconocida internacionalmente — uno de los lugares en la Tierra donde las personas viven mediblemente más tiempo — y el énfasis del área en bienestar, sostenibilidad y vida al aire libre es inmediatamente evidente.\n\nPlaya Guiones, la playa principal de surf de Nosara, ofrece una de las olas más amigables para principiantes y a la vez más divertidas de Costa Rica, rompiendo sobre fondo de arena por cientos de metros. La zona de Nosara también alberga el Refugio Nacional de Vida Silvestre Ostional, donde cientos de miles de tortugas lora anidan en llegadas masivas sincronizadas conocidas como arribadas. Un viaje compartido a Nosara te permite evitar el estrés de navegar intersecciones rurales y llegar relajado.",
    },
    highlights: {
      en: [
        "Blue Zone community focused on wellness and longevity",
        "Beginner-friendly surf at Playa Guiones",
        "Olive ridley turtle arribadas at Ostional refuge",
        "Thriving yoga, wellness, and remote-work scene",
      ],
      es: [
        "Comunidad Zona Azul enfocada en bienestar y longevidad",
        "Surf para principiantes en Playa Guiones",
        "Arribadas de tortugas lora en el refugio Ostional",
        "Próspera escena de yoga, bienestar y trabajo remoto",
      ],
    },
    faq: {
      en: [
        {
          q: "How long does it take to drive from San José to Nosara?",
          a: "The drive is roughly 4.5 hours. The first half on the Inter-American Highway is fast; the second half on peninsula roads is slower but scenic. During the rainy season (May–November), some river crossings may add time.",
        },
        {
          q: "Is the road to Nosara in good condition?",
          a: "The main highways are paved and well-maintained. The final stretch from Nicoya to Nosara includes some gravel sections that are manageable in a standard vehicle during the dry season. A high-clearance vehicle is recommended in the rainy season.",
        },
        {
          q: "When is the best time to visit Nosara?",
          a: "Nosara is great year-round. The dry season (December–April) offers sunny skies and smaller surf. The rainy season brings bigger waves, lush green landscapes, and the incredible turtle arribadas at Ostional between July and December.",
        },
      ],
      es: [
        {
          q: "¿Cuánto toma manejar de San José a Nosara?",
          a: "El viaje dura aproximadamente 4 horas y media. La primera mitad por la Carretera Interamericana es rápida; la segunda mitad por caminos de la península es más lenta pero escénica. En época lluviosa (mayo–noviembre), algunos cruces de ríos pueden agregar tiempo.",
        },
        {
          q: "¿Está en buenas condiciones el camino a Nosara?",
          a: "Las carreteras principales están pavimentadas y bien mantenidas. El tramo final de Nicoya a Nosara incluye secciones de lastre que son manejables en vehículo estándar durante la estación seca. Se recomienda un vehículo alto en época lluviosa.",
        },
        {
          q: "¿Cuándo es la mejor época para visitar Nosara?",
          a: "Nosara es excelente todo el año. La estación seca (diciembre–abril) ofrece cielos soleados y oleaje más pequeño. La época lluviosa trae olas más grandes, paisajes verdes exuberantes y las increíbles arribadas de tortugas en Ostional entre julio y diciembre.",
        },
      ],
    },
    related: ["liberia-nosara", "san-jose-tamarindo", "san-jose-santa-teresa"],
  },

  // ── 5. San Jose → Dominical ──────────────────────────────────────────
  {
    slug: "san-jose-dominical",
    origin: { en: "San José", es: "San José" },
    destination: { en: "Dominical", es: "Dominical" },
    distance: "183 km",
    duration: "3h 30m",
    price: "$14",
    image: "/images/routes/san-jose-dominical.jpg",
    description: {
      en: "The San José to Dominical route is a 183 km journey through some of Costa Rica's most dramatic scenery, climbing over the Cerro de la Muerte pass at 3,451 meters before descending through cloud forest and eventually reaching the South Pacific coast. The drive takes about 3.5 hours and rewards passengers with sweeping mountain vistas, quetzal habitat in the Los Quetzales National Park area, and a transition from cool highland air to tropical beach warmth.\n\nDominical is a small, surf-centric village beloved for its powerful beach break and proximity to two outstanding national parks: Marino Ballena, where humpback whales breach between July and October, and Manuel Antonio, about 45 minutes north. The area around Uvita and Ojochal just south of Dominical offers a growing food scene and some of Costa Rica's best snorkeling. Sharing a ride through the mountain pass is not just economical — it's safer and more enjoyable than white-knuckling the hairpin turns alone.",
      es: "La ruta de San José a Dominical es un viaje de 183 km a través de algunos de los paisajes más dramáticos de Costa Rica, ascendiendo por el paso del Cerro de la Muerte a 3,451 metros antes de descender por bosque nuboso hasta llegar a la costa del Pacífico Sur. El viaje dura unas 3 horas y media y recompensa a los pasajeros con vistas panorámicas de montaña, hábitat de quetzales en la zona del Parque Nacional Los Quetzales, y una transición del aire fresco de las tierras altas al calor tropical de la playa.\n\nDominical es un pequeño pueblo centrado en el surf, apreciado por su poderosa ola de playa y su cercanía a dos parques nacionales sobresalientes: Marino Ballena, donde las ballenas jorobadas saltan entre julio y octubre, y Manuel Antonio, a unos 45 minutos al norte. La zona alrededor de Uvita y Ojochal, justo al sur de Dominical, ofrece una creciente escena gastronómica y algunos de los mejores lugares para hacer snorkel en Costa Rica. Compartir viaje por el paso de montaña no solo es económico, es más seguro y agradable que enfrentar las curvas cerradas solo.",
    },
    highlights: {
      en: [
        "Scenic mountain pass through cloud forest at 3,451 m",
        "Powerful surf break and laid-back beach village",
        "Whale watching at Marino Ballena National Park",
        "Gateway to Uvita, Ojochal, and Manuel Antonio",
      ],
      es: [
        "Paso de montaña escénico por bosque nuboso a 3,451 m",
        "Poderosa ola de surf y pueblo de playa relajado",
        "Avistamiento de ballenas en el Parque Nacional Marino Ballena",
        "Puerta de entrada a Uvita, Ojochal y Manuel Antonio",
      ],
    },
    faq: {
      en: [
        {
          q: "Is the road over Cerro de la Muerte dangerous?",
          a: "The road (Route 2) is paved and well-maintained, but it climbs to over 3,400 meters with steep grades and tight curves. Fog is common in the early morning and late afternoon. Traveling with an experienced driver through Guana removes the worry.",
        },
        {
          q: "What is the surf like in Dominical?",
          a: "Dominical's beach break is powerful and best suited for intermediate to advanced surfers. Beginners can find mellower waves nearby at Playa Dominicalito or Playa Hermosa de Uvita.",
        },
        {
          q: "Can I see whales near Dominical?",
          a: "Yes. Humpback whales visit Marino Ballena National Park from July to October (Southern Hemisphere population) and December to March (Northern Hemisphere population), making Dominical one of the best whale-watching spots in Costa Rica.",
        },
      ],
      es: [
        {
          q: "¿Es peligrosa la carretera por el Cerro de la Muerte?",
          a: "La carretera (Ruta 2) está pavimentada y bien mantenida, pero asciende a más de 3,400 metros con pendientes pronunciadas y curvas cerradas. La neblina es común temprano en la mañana y al final de la tarde. Viajar con un conductor experimentado a través de Guana elimina la preocupación.",
        },
        {
          q: "¿Cómo es el surf en Dominical?",
          a: "La ola de playa de Dominical es potente y más adecuada para surfistas intermedios a avanzados. Los principiantes pueden encontrar olas más suaves cerca en Playa Dominicalito o Playa Hermosa de Uvita.",
        },
        {
          q: "¿Se pueden ver ballenas cerca de Dominical?",
          a: "Sí. Las ballenas jorobadas visitan el Parque Nacional Marino Ballena de julio a octubre (población del hemisferio sur) y de diciembre a marzo (población del hemisferio norte), haciendo de Dominical uno de los mejores puntos de avistamiento de ballenas en Costa Rica.",
        },
      ],
    },
    related: ["san-jose-jaco", "san-jose-puerto-viejo"],
  },

  // ── 6. San Jose → Puerto Viejo ────────────────────────────────────────
  {
    slug: "san-jose-puerto-viejo",
    origin: { en: "San José", es: "San José" },
    destination: { en: "Puerto Viejo de Talamanca", es: "Puerto Viejo de Talamanca" },
    distance: "225 km",
    duration: "4h 30m",
    price: "$16",
    image: "/images/routes/san-jose-puerto-viejo.jpg",
    description: {
      en: "The San José to Puerto Viejo de Talamanca route stretches 225 km across Costa Rica from the highlands to the southern Caribbean coast, a journey of approximately 4.5 hours. The road passes through Braulio Carrillo National Park — a stunning corridor of primary rainforest — before descending to the Caribbean lowlands via Limón. Puerto Viejo is unlike anywhere else in Costa Rica: its Afro-Caribbean culture, reggae rhythms, coconut-infused cuisine, and turquoise reef-protected waters create an atmosphere that feels more like the islands than the mainland.\n\nThe village sits between two remarkable natural areas: Cahuita National Park to the north, with its coral reef and white-sand beaches, and the Gandoca-Manzanillo Wildlife Refuge to the south, home to manatees, dolphins, and pristine jungle coastline. The famous Salsa Brava wave draws experienced surfers from around the world. A shared ride through Braulio Carrillo is especially appealing since the park's tunnels and mountain roads can be stressful for unfamiliar drivers.",
      es: "La ruta de San José a Puerto Viejo de Talamanca se extiende 225 km a través de Costa Rica desde las tierras altas hasta la costa Caribe Sur, un viaje de aproximadamente 4 horas y media. La carretera atraviesa el Parque Nacional Braulio Carrillo — un impresionante corredor de selva primaria — antes de descender a las tierras bajas del Caribe vía Limón. Puerto Viejo es diferente a cualquier otro lugar en Costa Rica: su cultura afrocaribeña, ritmos de reggae, cocina infusionada con coco y aguas turquesas protegidas por arrecife crean una atmósfera que se siente más como las islas que como el continente.\n\nEl pueblo se encuentra entre dos áreas naturales extraordinarias: el Parque Nacional Cahuita al norte, con su arrecife de coral y playas de arena blanca, y el Refugio de Vida Silvestre Gandoca-Manzanillo al sur, hogar de manatíes, delfines y costa de selva prístina. La famosa ola Salsa Brava atrae a surfistas experimentados de todo el mundo. Un viaje compartido a través de Braulio Carrillo es especialmente atractivo ya que los túneles y carreteras de montaña del parque pueden ser estresantes para conductores no familiarizados.",
    },
    highlights: {
      en: [
        "Afro-Caribbean culture, cuisine, and reggae vibes",
        "Coral reefs and white-sand beaches at Cahuita National Park",
        "Drive through Braulio Carrillo primary rainforest",
        "Famous Salsa Brava surf break for advanced riders",
      ],
      es: [
        "Cultura afrocaribeña, gastronomía y vibra reggae",
        "Arrecifes de coral y playas de arena blanca en el Parque Nacional Cahuita",
        "Recorrido a través de la selva primaria de Braulio Carrillo",
        "Famosa ola Salsa Brava para surfistas avanzados",
      ],
    },
    faq: {
      en: [
        {
          q: "How long is the drive from San José to Puerto Viejo?",
          a: "The drive takes approximately 4.5 hours. The stretch through Braulio Carrillo National Park is scenic but winding. After Limón, the road follows the flat Caribbean coast south to Puerto Viejo.",
        },
        {
          q: "Is the Caribbean side of Costa Rica rainy?",
          a: "The Caribbean coast has a different weather pattern than the Pacific. September and October are the driest months, while the Pacific side experiences its heaviest rains. The Caribbean can see rain year-round, but showers are often short and followed by sunshine.",
        },
        {
          q: "Can I snorkel or dive near Puerto Viejo?",
          a: "Absolutely. Cahuita National Park has one of Costa Rica's most accessible coral reefs. Manzanillo also offers excellent snorkeling. Dive shops in town organize trips to deeper reef sites along the coast.",
        },
      ],
      es: [
        {
          q: "¿Cuánto dura el viaje de San José a Puerto Viejo?",
          a: "El viaje dura aproximadamente 4 horas y media. El tramo por el Parque Nacional Braulio Carrillo es escénico pero sinuoso. Después de Limón, la carretera sigue la costa Caribe plana hacia el sur hasta Puerto Viejo.",
        },
        {
          q: "¿Llueve mucho en el Caribe de Costa Rica?",
          a: "La costa Caribe tiene un patrón climático diferente al Pacífico. Septiembre y octubre son los meses más secos, mientras que el lado Pacífico experimenta sus lluvias más fuertes. El Caribe puede tener lluvia todo el año, pero los aguaceros suelen ser cortos y seguidos de sol.",
        },
        {
          q: "¿Puedo hacer snorkel o buceo cerca de Puerto Viejo?",
          a: "Por supuesto. El Parque Nacional Cahuita tiene uno de los arrecifes de coral más accesibles de Costa Rica. Manzanillo también ofrece excelente snorkel. Las tiendas de buceo en el pueblo organizan viajes a sitios de arrecife más profundos a lo largo de la costa.",
        },
      ],
    },
    related: ["san-jose-dominical", "san-jose-jaco"],
  },

  // ── 7. Liberia → Tamarindo ────────────────────────────────────────────
  {
    slug: "liberia-tamarindo",
    origin: { en: "Liberia", es: "Liberia" },
    destination: { en: "Tamarindo", es: "Tamarindo" },
    distance: "67 km",
    duration: "1h",
    price: "$6",
    image: "/images/routes/liberia-tamarindo.jpg",
    description: {
      en: "The Liberia to Tamarindo route is a quick 67 km, one-hour drive connecting the Daniel Oduber Quirós International Airport (LIR) to the heart of Guanacaste's surf coast. This is one of the most common airport transfers in Costa Rica, used by thousands of international visitors each month who fly into Liberia and head straight to Tamarindo's golden beaches. The road passes through the ranching towns of Filadelfia and Belén before arriving at the coast.\n\nBecause this route is short and high-demand, Guana riders frequently find matches throughout the day, making it one of the easiest shared rides to book. It's a smart alternative to expensive airport shuttle vans or rental cars you won't need once you're settled in Tamarindo's walkable town center.",
      es: "La ruta de Liberia a Tamarindo es un rápido recorrido de 67 km y una hora de duración que conecta el Aeropuerto Internacional Daniel Oduber Quirós (LIR) con el corazón de la costa de surf de Guanacaste. Esta es una de las transferencias aeroportuarias más comunes en Costa Rica, utilizada por miles de visitantes internacionales cada mes que vuelan a Liberia y se dirigen directamente a las playas doradas de Tamarindo. El camino pasa por los pueblos ganaderos de Filadelfia y Belén antes de llegar a la costa.\n\nComo esta ruta es corta y de alta demanda, los usuarios de Guana frecuentemente encuentran coincidencias a lo largo del día, haciéndola uno de los viajes compartidos más fáciles de reservar. Es una alternativa inteligente a las costosas vans de shuttle del aeropuerto o a los carros de alquiler que no necesitarás una vez que estés instalado en el centro peatonal de Tamarindo.",
    },
    highlights: {
      en: [
        "Quick one-hour airport transfer from LIR",
        "High-frequency route with easy ride matching",
        "Affordable alternative to airport shuttles",
        "Direct access to Guanacaste's best surf beaches",
      ],
      es: [
        "Transferencia rápida de una hora desde el aeropuerto LIR",
        "Ruta de alta frecuencia con fácil emparejamiento de viajes",
        "Alternativa económica a los shuttles del aeropuerto",
        "Acceso directo a las mejores playas de surf de Guanacaste",
      ],
    },
    faq: {
      en: [
        {
          q: "How do I find a shared ride from Liberia airport?",
          a: "Open the Guana app and search for rides from LIR to Tamarindo. Because this route is so popular, rides are available throughout the day, especially timed around common flight arrivals.",
        },
        {
          q: "Is Liberia airport close to Tamarindo?",
          a: "Yes, it's only about 67 km or one hour by car. Liberia (LIR) is the closest international airport to Tamarindo and most Guanacaste beach towns.",
        },
      ],
      es: [
        {
          q: "¿Cómo encuentro un viaje compartido desde el aeropuerto de Liberia?",
          a: "Abre la app de Guana y busca viajes de LIR a Tamarindo. Como esta ruta es tan popular, hay viajes disponibles durante todo el día, especialmente coordinados con los horarios comunes de llegada de vuelos.",
        },
        {
          q: "¿Está cerca el aeropuerto de Liberia de Tamarindo?",
          a: "Sí, está a solo unos 67 km o una hora en carro. Liberia (LIR) es el aeropuerto internacional más cercano a Tamarindo y a la mayoría de los pueblos de playa de Guanacaste.",
        },
      ],
    },
    related: ["san-jose-tamarindo", "liberia-nosara"],
  },

  // ── 8. Liberia → Nosara ───────────────────────────────────────────────
  {
    slug: "liberia-nosara",
    origin: { en: "Liberia", es: "Liberia" },
    destination: { en: "Nosara", es: "Nosara" },
    distance: "131 km",
    duration: "2h 30m",
    price: "$10",
    image: "/images/routes/liberia-nosara.jpg",
    description: {
      en: "The Liberia to Nosara route covers 131 km and about 2.5 hours of driving, connecting the Daniel Oduber Quirós International Airport (LIR) to the Nicoya Peninsula's wellness capital. The road heads south through Nicoya town before winding west through cattle country and dry tropical forest to the coast. This is the preferred airport route for travelers heading to Nosara, Guiones, and the surrounding beach communities, and it avoids the much longer drive from San José entirely.\n\nNosara's reputation as a Blue Zone, combined with its world-class yoga studios, consistent surf, and tight-knit international community, makes it one of Costa Rica's fastest-growing destinations. Sharing a ride from the airport is the most hassle-free way to arrive, especially since the final roads can be confusing for first-time visitors without local knowledge.",
      es: "La ruta de Liberia a Nosara cubre 131 km y unas 2 horas y media de manejo, conectando el Aeropuerto Internacional Daniel Oduber Quirós (LIR) con la capital del bienestar de la Península de Nicoya. La carretera se dirige al sur por la ciudad de Nicoya antes de serpentear hacia el oeste a través de tierras ganaderas y bosque tropical seco hasta la costa. Esta es la ruta preferida desde el aeropuerto para viajeros que se dirigen a Nosara, Guiones y las comunidades de playa circundantes, y evita completamente el viaje mucho más largo desde San José.\n\nLa reputación de Nosara como Zona Azul, combinada con sus estudios de yoga de clase mundial, surf consistente y unida comunidad internacional, la convierten en uno de los destinos de más rápido crecimiento en Costa Rica. Compartir viaje desde el aeropuerto es la forma más sencilla de llegar, especialmente porque los caminos finales pueden ser confusos para visitantes primerizos sin conocimiento local.",
    },
    highlights: {
      en: [
        "Fastest route from an international airport to Nosara",
        "Drive through authentic Guanacaste ranch country",
        "Arrive ready for yoga, surf, and wellness",
        "Avoid the 4.5-hour drive from San José",
      ],
      es: [
        "Ruta más rápida desde un aeropuerto internacional a Nosara",
        "Recorrido por auténtica tierra ganadera guanacasteca",
        "Llega listo para yoga, surf y bienestar",
        "Evita las 4.5 horas de viaje desde San José",
      ],
    },
    faq: {
      en: [
        {
          q: "How long does it take to get from Liberia airport to Nosara?",
          a: "The drive is approximately 2.5 hours. The route passes through Nicoya and then heads west on peninsula roads to the coast. It's significantly shorter than the 4.5-hour drive from San José.",
        },
        {
          q: "Are the roads from Liberia to Nosara paved?",
          a: "Most of the route is paved, including the highway to Nicoya. The final section from Nicoya to Nosara has some gravel stretches that are well-maintained in the dry season. During the rainy season, a higher-clearance vehicle is recommended.",
        },
        {
          q: "Can I book a ride that matches my flight arrival time?",
          a: "Yes. When booking through Guana, you can enter your flight number and arrival time. The app will show available rides that match your schedule or help you coordinate with other arriving travelers.",
        },
      ],
      es: [
        {
          q: "¿Cuánto toma llegar del aeropuerto de Liberia a Nosara?",
          a: "El viaje dura aproximadamente 2 horas y media. La ruta pasa por Nicoya y luego se dirige al oeste por caminos de la península hasta la costa. Es significativamente más corta que las 4.5 horas de viaje desde San José.",
        },
        {
          q: "¿Están pavimentadas las carreteras de Liberia a Nosara?",
          a: "La mayor parte de la ruta está pavimentada, incluyendo la carretera a Nicoya. La sección final de Nicoya a Nosara tiene algunos tramos de lastre que están bien mantenidos en la estación seca. En época lluviosa, se recomienda un vehículo de mayor altura.",
        },
        {
          q: "¿Puedo reservar un viaje que coincida con la hora de llegada de mi vuelo?",
          a: "Sí. Al reservar a través de Guana, puedes ingresar tu número de vuelo y hora de llegada. La app te mostrará viajes disponibles que coincidan con tu horario o te ayudará a coordinarte con otros viajeros que lleguen.",
        },
      ],
    },
    related: ["liberia-tamarindo", "san-jose-nosara"],
  },
];

// ── Helper functions ────────────────────────────────────────────────────

export function getRouteBySlug(slug: string): RouteData | undefined {
  return routes.find((r) => r.slug === slug);
}

export function getAllRouteSlugs(): string[] {
  return routes.map((r) => r.slug);
}

export function getRouteLocalized(route: RouteData, locale: Locale) {
  return {
    ...route,
    originName: route.origin[locale],
    destinationName: route.destination[locale],
    description: route.description[locale],
    highlights: route.highlights[locale],
    faq: route.faq[locale],
  };
}
