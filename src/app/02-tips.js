  /* ============ Fun facts & technique tips ============ */
  const FACTS = [
    {
      de: "Die WAKO wurde am 26. Februar 1977 in Berlin offiziell gegründet – von Georg Brückner.",
      en: "WAKO was officially founded in Berlin on 26 February 1977 by Georg Brückner.",
      s: "wako.sport",
    },
    {
      de: "WAKO stand ursprünglich für „World All-Style Karate Organization“. Kickboxen hieß anfangs noch Semi- und Full-Contact-Karate.",
      en: "WAKO originally stood for “World All-Style Karate Organization”. Early on, the sport was still called semi- and full-contact karate.",
      s: "wako.sport",
    },
    {
      de: "Georg Brückner gilt als „Vater des europäischen Kickboxens“. Ab 1974 veranstaltete er die ersten Kickbox-Shows in Europa.",
      en: "Georg Brückner is known as the “father of European kickboxing”. From 1974 he promoted the first kickboxing shows in Europe.",
      s: "Wikipedia",
    },
    {
      de: "Brückner erfand und patentierte Schutzausrüstung, damit Kämpfer verschiedener Stile ohne schwere Verletzungen gegeneinander antreten konnten.",
      en: "Brückner invented and patented protective gear so fighters from different styles could compete without serious injuries.",
      s: "Wikipedia",
    },
    {
      de: "Als erster „Kickbox-Kampf“ gilt für die WAKO das Duell Joe Lewis gegen Greg Baines 1970 in den USA – erstmals mit Boxhandschuhen.",
      en: "WAKO regards Joe Lewis vs. Greg Baines (USA, 1970) as the first “kickboxing fight” – the first time boxing gloves were worn.",
      s: "wako.sport",
    },
    {
      de: "1974 fand in Los Angeles die erste „Weltmeisterschaft im Full Contact“ statt. Erste Weltmeister: Bill Wallace, Jeff Smith und Joe Lewis.",
      en: "The first “World Championship in Full Contact” took place in Los Angeles in 1974. First champions: Bill Wallace, Jeff Smith and Joe Lewis.",
      s: "wako.sport",
    },
    {
      de: "Die ersten WAKO-Europameisterschaften fanden 1977 in Wien statt – alle Kämpfe nach Full-Contact-Regeln.",
      en: "The first WAKO European Championships were held in Vienna in 1977 – every bout under Full Contact rules.",
      s: "Wikipedia",
    },
    {
      de: "Bei der ersten WAKO-Weltmeisterschaft 1978 traten 110 Athleten aus 18 Ländern an.",
      en: "The first WAKO World Championships in 1978 had 110 competitors from 18 countries.",
      s: "WAKO India",
    },
    {
      de: "Am 20. Juli 2021 erkannte das IOC die WAKO auf seiner 138. Session in Tokio vollständig an.",
      en: "On 20 July 2021, the 138th IOC Session in Tokyo granted WAKO full recognition.",
      s: "wako.sport",
    },
    {
      de: "Die vorläufige IOC-Anerkennung für Kickboxen kam bereits am 30. November 2018.",
      en: "Kickboxing received provisional IOC recognition on 30 November 2018.",
      s: "WAKO India",
    },
    {
      de: "Die WAKO hat 7 Wettkampfdisziplinen: 3 im Ring (Full Contact, Low Kick, K1) und 4 auf der Tatami (Point Fighting, Light Contact, Kick Light, Musical Forms).",
      en: "WAKO has 7 competitive disciplines: 3 in the ring (Full Contact, Low Kick, K1) and 4 on the tatami (Point Fighting, Light Contact, Kick Light, Musical Forms).",
      s: "wako.sport",
    },
    {
      de: "Ein Kampf im Ring dauert drei Runden à zwei Minuten, mit einer Minute Pause dazwischen.",
      en: "A ring bout is three two-minute rounds with a one-minute break between them.",
      s: "wako.sport",
    },
    {
      de: "Im Full Contact müssen pro Runde mindestens 6 Kicks geschlagen werden – sonst drohen Punktabzüge.",
      en: "In Full Contact you must throw at least 6 kicks per round, or the referee may deduct points.",
      s: "Wikipedia",
    },
    {
      de: "Fußfeger sind im Full Contact erlaubt – aber nur Fuß gegen Fuß.",
      en: "Foot sweeps are legal in Full Contact – but only foot against foot.",
      s: "USA Kickboxing",
    },
    {
      de: "Full-Contact-Kämpfer tragen lange Hosen, Low-Kick- und K1-Kämpfer kurze Shorts.",
      en: "Full Contact fighters compete in long pants; Low Kick and K1 fighters wear shorts.",
      s: "Ontario Kickboxing Rules",
    },
    {
      de: "Light Contact liegt zwischen Point Fighting und Full Contact: gleiche Techniken, aber jeder Treffer muss kontrolliert sein.",
      en: "Light Contact sits between Point Fighting and Full Contact: the same techniques, but every hit must be controlled.",
      s: "WAKO Technical Book",
    },
    {
      de: "Laut WAKO trainieren weltweit über 4 Millionen Menschen Kickboxen – in mehr als 40.000 Vereinen.",
      en: "According to WAKO, over 4 million people practise kickboxing in more than 40,000 clubs worldwide.",
      s: "wako.sport",
    },
    {
      de: "135 Nationen auf fünf Kontinenten sind Mitglied der WAKO.",
      en: "135 nations across five continents are WAKO members.",
      s: "wako.sport",
    },
    {
      de: "Seit der Regelreform heißt die Disziplin „K1 Rules“ offiziell „K1 Style“.",
      en: "Since the rules reform, the discipline “K1 Rules” is officially called “K1 Style”.",
      s: "wako.sport",
    },
    {
      de: "Der Hauptsitz der WAKO liegt heute in Monza, Italien.",
      en: "WAKO's headquarters are in Monza, Italy.",
      s: "Wikipedia",
    },
    {
      de: "Das Wort „Kickboxing“ wurde in den 1960er-Jahren in Japan geprägt – vom Box-Promoter Osamu Noguchi.",
      en: "The word “kickboxing” was coined in Japan in the 1960s – by boxing promoter Osamu Noguchi.",
      s: "Wikipedia: Kickboxing",
    },
    {
      de: "K-1 wurde 1993 in Japan von Kazuyoshi Ishii gegründet. Das „K“ steht für Kampfkünste wie Karate, Kickboxen und Kung-Fu, die „1“ für den einen Sieger.",
      en: "K-1 was founded in Japan in 1993 by Kazuyoshi Ishii. The “K” stands for styles like karate, kickboxing and kung fu, the “1” for the one champion.",
      s: "Wikipedia: K-1",
    },
    {
      de: "Muay Thai heißt „Kunst der acht Gliedmaßen“: zwei Fäuste, zwei Ellbogen, zwei Knie, zwei Schienbeine.",
      en: "Muay Thai is called “the art of eight limbs”: two fists, two elbows, two knees, two shins.",
      s: "Wikipedia: Muay Thai",
    },
    {
      de: "Bill Wallace bekam den Spitznamen „Superfoot“ – er kickte fast nur mit dem linken Bein, weil sein rechtes Knie verletzt war.",
      en: "Bill Wallace was nicknamed “Superfoot” – he kicked almost only with his left leg because his right knee was injured.",
      s: "Wikipedia: Bill Wallace",
    },
    {
      de: "Die Queensberry-Regeln von 1867 machten Handschuhe im Boxen zur Pflicht und führten Runden à 3 Minuten mit 1 Minute Pause ein.",
      en: "The Queensberry Rules of 1867 made gloves mandatory in boxing and introduced 3-minute rounds with a 1-minute break.",
      s: "Wikipedia: Marquess of Queensberry Rules",
    },
    {
      de: "Handschuhe werden in Unzen gewogen: Ein 10-oz-Handschuh wiegt rund 283 Gramm.",
      en: "Gloves are weighed in ounces: a 10 oz glove weighs about 283 grams.",
      s: "1 oz = 28,35 g",
    },
    {
      de: "Savate ist französisches „Fußboxen“ – gekämpft wird dort mit Schuhen.",
      en: "Savate is French “foot boxing” – it is fought wearing shoes.",
      s: "Wikipedia: Savate",
    },
    {
      de: "Sanda (Sanshou) ist chinesisches Kickboxen: Schläge, Tritte – und Würfe sind erlaubt.",
      en: "Sanda (Sanshou) is Chinese kickboxing: punches, kicks – and throws are allowed.",
      s: "Wikipedia: Sanda",
    },
    {
      de: "Im burmesischen Lethwei sind sogar Kopfstöße erlaubt – traditionell kämpft man mit Bandagen, aber ohne Handschuhe.",
      en: "In Burmese Lethwei even headbutts are allowed – traditionally fought with wraps but no gloves.",
      s: "Wikipedia: Lethwei",
    },
    {
      de: "„Dojo“ bedeutet „Ort des Weges“ – der Raum, in dem man den Weg einer Kampfkunst übt.",
      en: "“Dojo” means “place of the way” – the room where you practise the way of a martial art.",
      s: "Wikipedia: Dojo",
    },
    {
      de: "Der häufigste Bruch beim Schlagen ist der „Boxerbruch“ am fünften Mittelhandknochen. Bandagen und Treffen mit den ersten beiden Knöcheln schützen davor.",
      en: "The most common fracture from punching is the “boxer's fracture” of the fifth metacarpal. Hand wraps and hitting with the first two knuckles protect against it.",
      s: "DocCheck Flexikon: Boxerfraktur",
    },
    {
      de: "Muskelkater entsteht durch winzige Risse in den Muskelfasern – nicht durch Milchsäure, wie man lange dachte.",
      en: "Muscle soreness comes from tiny tears in the muscle fibres – not from lactic acid, as was long believed.",
      s: "Sportmedizin",
    },
    {
      de: "Knochen passen sich der Belastung an (Wolffsches Gesetz) – deshalb wird das Schienbein durch langsames, regelmäßiges Training belastbarer.",
      en: "Bones adapt to the load placed on them (Wolff's law) – which is why the shin gets tougher with slow, regular training.",
      s: "Wikipedia: Wolffsches Gesetz",
    },
    {
      de: "Schon rund 2 % Flüssigkeitsverlust (gemessen am Körpergewicht) können die Leistung messbar senken.",
      en: "Losing as little as about 2 % of body weight in fluid can measurably reduce performance.",
      s: "ACSM Position Stand",
    },
    {
      de: "Im Tiefschlaf schüttet der Körper besonders viel Wachstumshormon aus – Schlaf ist Teil deines Trainings.",
      en: "In deep sleep the body releases most of its growth hormone – sleep is part of your training.",
      s: "Schlafmedizin",
    },
    {
      de: "Die Reaktionszeit auf einen Sehreiz liegt meist bei rund 0,2 Sekunden – deshalb sind Finten so wirksam.",
      en: "Reaction time to something you see is usually around 0.2 seconds – that's why feints work so well.",
      s: "Physiologie",
    },
    {
      de: "Im Profiboxen ist der Jab laut Schlagstatistiken der am häufigsten geschlagene Schlag.",
      en: "In pro boxing, punch statistics show the jab is the most frequently thrown punch.",
      s: "CompuBox",
    },
    {
      de: "Im Ring gibt es eine rote und eine blaue Ecke für die Kämpfer – die zwei übrigen heißen „neutrale Ecken“.",
      en: "A ring has a red and a blue corner for the fighters – the other two are called “neutral corners”.",
      s: "Wettkampfregeln",
    },
    {
      de: "Im Point Fighting wird nach jedem Treffer unterbrochen und gewertet – im Light Contact läuft der Kampf weiter.",
      en: "In Point Fighting the bout stops after every hit to score it – in Light Contact the fight keeps going.",
      s: "WAKO-Regeln",
    },
    {
      de: "„Float like a butterfly, sting like a bee“ – der berühmte Spruch von Muhammad Ali stammt aus dem Jahr 1964.",
      en: "“Float like a butterfly, sting like a bee” – Muhammad Ali's famous line dates from 1964.",
      s: "Wikipedia: Muhammad Ali",
    },
    {
      de: "Seilspringen trainiert Rhythmus, Fußarbeit und Ausdauer zugleich – darum gehört es seit Generationen zum Box-Training.",
      en: "Skipping rope trains rhythm, footwork and stamina at once – that's why it has been part of boxing training for generations.",
      s: "Trainingslehre",
    },
    {
      de: "Die Kraft eines Schlags kommt aus der ganzen Kette: Fuß, Bein, Hüfte, Rumpf, Schulter, Arm – nicht aus dem Arm allein.",
      en: "The power of a punch comes from the whole chain: foot, leg, hip, trunk, shoulder, arm – not from the arm alone.",
      s: "Biomechanik",
    },
    {
      de: "Bei den World Games 2022 in Birmingham (USA) war Kickboxen erstmals offizielle Sportart – gekämpft wurde nach K1-Regeln. 2017 war es dort noch Einladungssportart.",
      en: "At the 2022 World Games in Birmingham (USA) kickboxing was an official sport for the first time – fought under K1 rules. In 2017 it had been an invitational sport.",
      s: "Wikipedia: Kickboxing at the 2022 World Games",
    },
    {
      de: "2023 war Kickboxen zum ersten Mal Teil der European Games: 16 Wettbewerbe in Point Fighting, Light Contact und Full Contact, ausgetragen in Myślenice (Polen).",
      en: "In 2023 kickboxing was part of the European Games for the first time: 16 events in point fighting, light contact and full contact, held in Myślenice (Poland).",
      s: "Wikipedia: Kickboxing at the 2023 European Games",
    },
    {
      de: "Ernesto Hoost hieß „Mr. Perfect“ – wegen seiner fast maschinenhaft präzisen Kombinationen. Er gewann den K-1 World Grand Prix 1997, 1999, 2000 und 2002.",
      en: "Ernesto Hoost was called “Mr. Perfect” for his almost machine-like precise combinations. He won the K-1 World Grand Prix in 1997, 1999, 2000 and 2002.",
      s: "Wikipedia: Ernesto Hoost",
    },
    {
      de: "Semmy Schilt ist 2,12 m groß und gewann den K-1 World Grand Prix viermal – 2005, 2006, 2007 und 2009.",
      en: "Semmy Schilt is 2.12 m tall and won the K-1 World Grand Prix four times – 2005, 2006, 2007 and 2009.",
      s: "Wikipedia: Semmy Schilt",
    },
    {
      de: "Peter Aerts, „The Dutch Lumberjack“, gewann den K-1 World Grand Prix 1994, 1995 und 1998 – und gilt vielen als „Mr. K-1“.",
      en: "Peter Aerts, “The Dutch Lumberjack”, won the K-1 World Grand Prix in 1994, 1995 and 1998 – many call him “Mr. K-1”.",
      s: "Wikipedia: Peter Aerts",
    },
    {
      de: "Das Rajadamnern-Stadion in Bangkok wurde ab 1941 gebaut, der Krieg stoppte den Bau. Der erste Kampf fand am 23. Dezember 1945 statt.",
      en: "Construction of Bangkok's Rajadamnern Stadium began in 1941 and was halted by the war. The first fight took place on 23 December 1945.",
      s: "WMC: Rajadamnern Stadium History",
    },
    {
      de: "Vor der ersten Runde zeigen Muay-Thai-Kämpfer den Wai Khru Ram Muay – ein Ritual, das Lehrer und Training ehrt. Gewertet wird er nicht.",
      en: "Before the first round, Muay Thai fighters perform the Wai Khru Ram Muay – a ritual honouring their teachers and training. It isn't scored.",
      s: "Muay Thai Records: Wai Kru Ram Muay",
    },
    {
      de: "Wie schnell dein Puls in der ersten Minute Pause fällt, zeigt deine Ausdauer: Je schneller er sinkt, desto besser erholst du dich zwischen den Runden.",
      en: "How fast your pulse drops in the first minute of rest shows your endurance: the faster it falls, the better you recover between rounds.",
      s: "Sportmedizin",
    },
  ];
  const TIPS = [
    {
      de: "Low Kick: Mit dem Schienbein treffen, nicht mit dem Fuß – und die Hüfte ganz durchdrehen.",
      en: "Low kick: hit with the shin, not the foot – and turn the hip all the way through.",
    },
    {
      de: "Nach jeder Kombi bewegen: raus aus der Linie oder zurück in Deckung – nie stehen bleiben.",
      en: "Move after every combo: off the line or back into guard – never stand still.",
    },
    {
      de: "Haken: Ellbogen auf Schulterhöhe, die Faust dreht mit – die Kraft kommt aus der Drehung des vorderen Fußes.",
      en: "Hook: elbow at shoulder height, the fist turns with it – power comes from pivoting on the front foot.",
    },
    {
      de: "Atmen nicht vergessen: Bei jedem Schlag und Kick kurz und scharf ausatmen.",
      en: "Don't forget to breathe: a short, sharp exhale with every punch and kick.",
    },
    {
      de: "Sidekick: Ferse führt, Fußkante zeigt zum Ziel – und das Knie erst hoch anziehen, dann strecken.",
      en: "Side kick: heel leads, the edge of the foot points at the target – chamber the knee high first, then extend.",
    },
    {
      de: "Kinn runter, Augen hoch: So trifft dich weniger, und du siehst trotzdem alles.",
      en: "Chin down, eyes up: you get hit less and still see everything.",
    },
    {
      de: "Abstand ist Verteidigung: Bleib knapp außerhalb der Reichweite und komm nur zum Treffen rein.",
      en: "Distance is defence: stay just outside range and only step in to hit.",
    },
    {
      de: "Uppercut: Erst leicht in die Knie, dann aus Beinen und Hüfte nach oben – nicht ausholen.",
      en: "Uppercut: dip the knees slightly, then drive up from legs and hips – don't wind up.",
    },
    {
      de: "Jab: Die Schulter schützt das Kinn, und die Hand kommt auf derselben Linie zurück, auf der sie rausging.",
      en: "Jab: your shoulder covers your chin, and the hand returns on the same line it went out.",
    },
    {
      de: "Cross: Die Kraft kommt aus Hüfte und hinterem Fuß – die Ferse dreht mit nach außen.",
      en: "Cross: power comes from the hip and rear foot – turn the heel out with it.",
    },
    {
      de: "Haken: Ellbogen auf Fausthöhe, Rotation aus dem Rumpf. Nicht ausholen, sonst sieht man ihn kommen.",
      en: "Hook: elbow level with the fist, rotate from the trunk. Don't wind up, or they'll see it coming.",
    },
    {
      de: "Roundhouse: Standfuß eindrehen, bis die Ferse zum Gegner zeigt – sonst fehlt die Hüfte.",
      en: "Roundhouse: pivot the standing foot until the heel points at your opponent – otherwise the hip is missing.",
    },
    {
      de: "Sidekick: Erst das Knie hoch zur Brust ziehen, dann die Ferse auf gerader Linie rausstoßen.",
      en: "Side kick: chamber the knee to your chest first, then drive the heel out in a straight line.",
    },
    {
      de: "Frontkick: Knie anheben, Hüfte nach vorn schieben, mit dem Ballen treffen und schnell zurückziehen.",
      en: "Front kick: lift the knee, push the hip forward, hit with the ball of the foot and retract fast.",
    },
    {
      de: "Nach jedem Kick sofort die Hände zurück ans Kinn – die meisten Treffer kassiert man beim Absetzen.",
      en: "After every kick, hands straight back to the chin – most hits land while you're putting the foot down.",
    },
    {
      de: "Bei jedem Schlag kurz ausatmen. Das stabilisiert den Rumpf und verhindert, dass dir in Runde 3 die Luft ausgeht.",
      en: "Exhale sharply with every strike. It braces your core and keeps you from gassing out in round 3.",
    },
    {
      de: "Beinarbeit: Niemals die Füße kreuzen. Der Fuß in Bewegungsrichtung geht immer zuerst.",
      en: "Footwork: never cross your feet. The foot nearest the direction of travel always moves first.",
    },
    {
      de: "Gedrehter Backkick: Erst dreht der Kopf, der Blick geht über die Schulter – dann löst du den Kick.",
      en: "Spinning back kick: turn your head first and look over your shoulder – then release the kick.",
    },
    {
      de: "Fußfeger klappen über Timing, nicht über Kraft: fegen, wenn der Gegner das Gewicht auf den vorderen Fuß verlagert.",
      en: "Sweeps are about timing, not power: sweep as your opponent shifts weight onto the front foot.",
    },
    {
      de: "Kontrolle ist Technik: treffen und sofort zurückziehen, statt durchzuschlagen.",
      en: "Control is technique: touch and retract instantly instead of punching through.",
      d: ["lc", "kl"],
    },
    {
      de: "Plane deine 6 Kicks früh in der Runde ein. Wer am Ende nachzählt, verliert den Rhythmus.",
      en: "Get your 6 kicks in early in the round. Counting at the end breaks your rhythm.",
      d: ["fc"],
    },
    {
      de: "Low Kick: mit dem Schienbein treffen, nicht mit dem Fuß, und mit einer Hand vorher abdecken.",
      en: "Low kick: land with the shin, not the foot, and set it up behind a hand.",
      d: ["kl", "k1"],
    },
    {
      de: "Knie: Hüfte nach vorn schieben, Oberkörper aufrecht, beide Hände bleiben am Kopf.",
      en: "Knee: drive the hip forward, stay upright, both hands stay at your head.",
      d: ["k1"],
    },
  ];

