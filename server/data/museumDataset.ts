import type {
  GalleryExhibitItem,
  HeritageStory,
  OccasionRecommendation,
  RegionProfile,
  Turban,
} from '../../src/types/museum.js';

export const TURBANS_DATA: Turban[] = [
  {
    id: 'jodhpuri-safa',
    accessionNumber: 'ACC. IND-RJ-001',
    name: 'Jodhpuri Safa',
    localName: 'जोधपुरी साफा',
    classification: 'Safa',
    region: 'Rajasthan',
    subRegion: 'Marwar (Jodhpur)',
    summary:
      'A diagonally pleated Marwari turban known for its fanned crest (turra) and trailing shoulder cloth (shimla).',
    description:
      'Originating in the arid Marwar region around Jodhpur, the Safa is broader and slightly shorter in length than the traditional Pagri, relying on diagonal folds that cradle the temples and leave a graceful panel cascading down the back or shoulder.',
    historicalOrigin:
      'Documented in Marwar court portraiture from the 18th and 19th centuries, the Safa evolved as practical desert protection against scorching winds and sandstorms while simultaneously signalling clan affiliation, season, and ceremonial rank.',
    culturalMeaning:
      'In Marwar tradition, tying a Safa on a guest or groom is an act of honour and kinship (Safa Bandhna). Darker or muted colours historically marked solemnity or mourning, whereas saffron, crimson, and multi-hued Leheriya signify auspicious celebration and valour.',
    verificationNote:
      'Historical court iconography and regional textile archives document Marwar Safa forms; specific colour associations vary by district and family custom.',
    occasions: ['Wedding', 'Groom', 'Royal or ceremonial occasion', 'Cultural celebration', 'Festival'],
    colors: ['Red', 'Saffron', 'Multicolour'],
    colorHexes: ['#641F2B', '#B75E40', '#B49A62'],
    fabric: 'Hand-dyed Chiffon / Georgette Silk with Leheriya or Bandhani resist',
    fabricCategory: 'Bandhani',
    style: 'Royal',
    difficulty: 'Intermediate',
    typicalLengthMeters: '9 m × 1.1 m',
    featuredFact:
      'Traditional Jodhpuri Leheriya Safas are resist-dyed by rolling cloth diagonally so the stripes resemble desert waves.',
    image: '/src/assets/images/turban_jodhpuri_safa_1795273980634.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_jodhpuri_safa_1795273980634.jpg',
        viewLabel: 'Portrait View',
        caption: 'Marwar Leheriya Safa with fanned crest and trailing shimla.',
        sourceAttribution: 'PAGDI Digital Archive — Marwar Documentation',
      },
      {
        url: '/src/assets/images/hero_turban_portrait_1795273975279.jpg',
        viewLabel: 'Side Profile',
        caption: 'Bandhani silk Safa worn in a sandstone courtyard colonnade.',
        sourceAttribution: 'PAGDI Digital Archive — Rajasthan Field Study',
      },
      {
        url: '/src/assets/images/craft_tying_hands_1795273981267.jpg',
        viewLabel: 'Textile Detail',
        caption: 'Hand-pleating Bandhani cloth prior to diagonal wrapping.',
        sourceAttribution: 'PAGDI Craft Documentation',
      },
    ],
    tryOnPresetId: 'jodhpuri-safa',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Fabric Conditioning & Folding',
        beginnerInstruction:
          'Lay the 9-metre cloth flat and fold it lengthwise into a neat band roughly 12–15 cm wide so the edges tuck cleanly inward.',
        detailedInstruction:
          'Lightly mist fine cotton or silk-chiffon Leheriya with water, press out sharp creases by hand, and gather longitudinal pleats into an even ribbon while reserving 90 cm for the trailing shimla.',
        clothLengthNote: '9.0 m total · Reserve ~0.9 m tail',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Starting Position at the Crown',
        beginnerInstruction:
          'Drape the reserved tail down the back of your neck and bring the active band diagonally across the right temple toward the forehead.',
        detailedInstruction:
          'Secure the anchor knot softly at the occipital base, letting the shimla fall cleanly over the left shoulder, and angle the first tension wrap 25° across the upper brow.',
        clothLengthNote: '1.2 m anchored',
        wrapAngleDeg: 25,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Establishing the Diagonal Frame',
        beginnerInstruction:
          'Carry the band firmly around the back of the head and bring it up over the left temple to cross the first layer at the centre.',
        detailedInstruction:
          'Maintain balanced tension across the parietal ridge without pinching the ears, intersecting the initial pass cleanly above the glabella to form the classic V-frame.',
        clothLengthNote: '2.8 m wrapped',
        wrapAngleDeg: -22,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Building Overlapping Diagonal Tiers',
        beginnerInstruction:
          'Continue wrapping side to side, stepping each new band slightly higher by half an inch to create visible stepped layers.',
        detailedInstruction:
          'Alternate left and right diagonal passes four times, revealing 1.5 cm of each underlying stripe so the Leheriya pattern radiates evenly across both temples.',
        clothLengthNote: '5.5 m wrapped',
        wrapAngleDeg: 18,
        layerCount: 5,
      },
      {
        phase: '05 · Pleats',
        title: 'Forming the Fanned Turra Crest',
        beginnerInstruction:
          'Gather the remaining 1.5 metres into accordion pleats and tuck the base neatly behind the upper side fold so it fans upward.',
        detailedInstruction:
          'Pinch 7 to 9 crisp accordion pleats between thumb and forefinger, fan them along the upper right crown, and lock the stem under the outermost diagonal band.',
        clothLengthNote: '7.8 m wrapped · 1.2 m pleated',
        wrapAngleDeg: 45,
        layerCount: 6,
      },
      {
        phase: '06 · Finishing',
        title: 'Locking the Tail & Securing Tension',
        beginnerInstruction:
          'Tuck any loose inner edge smoothly into the back folds and adjust the shoulder tail so it hangs naturally.',
        detailedInstruction:
          'Check symmetry along the browline, tuck the final edge beneath the rear anchor wrap without visible pins, and straighten the shimla border.',
        clothLengthNote: '9.0 m complete',
        wrapAngleDeg: 10,
        layerCount: 7,
      },
      {
        phase: '07 · Final Styling',
        title: 'Ceremonial Balance & Kalgi Placement',
        beginnerInstruction:
          'Gently lift the front pleats for volume and ensure the turban sits comfortably above the eyebrows.',
        detailedInstruction:
          'For grooms or ceremonial occasions, a traditional Kalgi or Sarpech ornament may be pinned just beside the fanned crest, balancing the vertical silhouette.',
        clothLengthNote: 'Complete · Ready to wear',
        wrapAngleDeg: 0,
        layerCount: 7,
      },
    ],
  },
  {
    id: 'jaipur-panchrangi-pagri',
    accessionNumber: 'ACC. IND-RJ-002',
    name: 'Jaipur Panchrangi Pagri',
    localName: 'जयपुरी पचरंगी पगड़ी',
    classification: 'Pagri',
    region: 'Rajasthan',
    subRegion: 'Dhundhar (Jaipur)',
    summary:
      'A slender, tightly wound five-colour royal Pagri celebrating Jaipur’s celebrated natural-dye and gota-zari traditions.',
    description:
      'Unlike the wide-banded Safa, the Jaipur Pagri is woven as an extraordinarily long, narrow strip (often 18 to 22 metres) that wraps into compact, sculpted horizontal ridges accented with gold zari borders.',
    historicalOrigin:
      'Associated with the Kachwaha court of Amber and Jaipur, the Panchrangi (five-colour) Pagri rose to prominence in the 18th century under royal patronage of weavers, dyers (rangrez), and tie-resist artisans.',
    culturalMeaning:
      'The five hues—traditionally saffron, crimson, rose pink, cream, and yellow or green—symbolise the five elements and festive abundance. It is worn during Teej, Gangaur, and celebratory processions.',
    verificationNote:
      'Archival textiles in the City Palace Jaipur textile collection preserve 19th-century Panchrangi Pagri lengths; exact dye recipes varied by guild.',
    occasions: ['Festival', 'Wedding', 'Royal or ceremonial occasion', 'Cultural celebration'],
    colors: ['Multicolour', 'Saffron', 'Pink', 'Red'],
    colorHexes: ['#B75E40', '#D9778A', '#F6F1E7', '#B49A62'],
    fabric: 'Fine Malmal Cotton with woven Gold Zari edge',
    fabricCategory: 'Cotton',
    style: 'Ceremonial',
    difficulty: 'Expert',
    typicalLengthMeters: '18 m × 0.22 m',
    featuredFact:
      'A traditional Jaipur Pagri uses a narrow 20 cm wide strip nearly 20 metres long, allowing over two dozen compact turns.',
    image: '/src/assets/images/turban_jaipur_pagri_1795273980695.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_jaipur_pagri_1795273980695.jpg',
        viewLabel: 'Archival Stand View',
        caption: 'Five-colour Jaipur Pagri with gold zari pleated crest.',
        sourceAttribution: 'PAGDI Museum Collection',
      },
      {
        url: '/src/assets/images/museum_textile_archive_1795273980409.jpg',
        viewLabel: 'Exhibition Plinth',
        caption: 'Folded silk and cotton ceremonial pagris in gallery display.',
        sourceAttribution: 'PAGDI Museum Gallery',
      },
    ],
    tryOnPresetId: 'jodhpuri-safa',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Rolling the Narrow Strip',
        beginnerInstruction:
          'Roll the narrow 18-metre cloth tightly into a compact spool so it unwinds smoothly without tangling.',
        detailedInstruction:
          'Starch lightly with traditional rice-water (maandi) for crisp edge memory, then coil into a tight hand-reel with the zari border aligned outward.',
        clothLengthNote: '18.0 m narrow strip',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Base Skull Band',
        beginnerInstruction:
          'Wrap two tight horizontal turns around the upper forehead and crown base to establish a secure foundation.',
        detailedInstruction:
          'Anchor the raw end above the left ear and draw two snug circumferential turns to lock the cranial base before angling upward.',
        clothLengthNote: '2.5 m wrapped',
        wrapAngleDeg: 5,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Colour Band Separation',
        beginnerInstruction:
          'Angle the strip slightly downward across one side and upward across the opposite temple to expose the five dyed bands.',
        detailedInstruction:
          'Twist slightly at the nape so successive dye segments register cleanly across the frontal arc in alternating warm hues.',
        clothLengthNote: '6.0 m wrapped',
        wrapAngleDeg: 18,
        layerCount: 4,
      },
      {
        phase: '04 · Layers',
        title: 'Compact Sculpted Ridges',
        beginnerInstruction:
          'Continue layering tightly from bottom to top, keeping each fold taut and uniform.',
        detailedInstruction:
          'Build ten to twelve slender overlapping tiers along the right temple while keeping the left side lower and smoothly contoured.',
        clothLengthNote: '12.5 m wrapped',
        wrapAngleDeg: 12,
        layerCount: 6,
      },
      {
        phase: '05 · Pleats',
        title: 'Zari Fan & Front Crest',
        beginnerInstruction:
          'Fan out the woven gold zari border at the side to form a scalloped metallic halo.',
        detailedInstruction:
          'Spread the final zari pallu into radial sun-pleats and tuck the lower edge firmly beneath the upper crown ridge.',
        clothLengthNote: '16.0 m wrapped',
        wrapAngleDeg: 40,
        layerCount: 7,
      },
      {
        phase: '06 · Finishing',
        title: 'Tucking the Terminal Edge',
        beginnerInstruction:
          'Fold the remaining tail inward and tuck it neatly into the top crown fold.',
        detailedInstruction:
          'Conceal the cut edge inside the upper rear fold and smooth the zari border using both palms.',
        clothLengthNote: '18.0 m complete',
        wrapAngleDeg: 0,
        layerCount: 8,
      },
      {
        phase: '07 · Final Styling',
        title: 'Setting the Tilt',
        beginnerInstruction:
          'Gently adjust the Pagri to sit with a slight ceremonial tilt toward one brow.',
        detailedInstruction:
          'Ensure the five colours remain balanced and visible in profile, reflecting Jaipur court proportion.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: -6,
        layerCount: 8,
      },
    ],
  },
  {
    id: 'punjabi-patiala-shahi-dastar',
    accessionNumber: 'ACC. IND-PB-003',
    name: 'Patiala Shahi Dastar',
    localName: 'ਪਟਿਆਲਾ ਸ਼ਾਹੀ ਦਸਤਾਰ',
    classification: 'Dastar',
    region: 'Punjab',
    subRegion: 'Malwa (Patiala)',
    summary:
      'A dignified, tall, symmetrically layered Sikh Dastar named after the royal court of Patiala, embodying sovereignty, equality, and spiritual discipline.',
    description:
      'Characterised by five to six crisp, parallel diagonal folds (larhs) meeting at a clean central peak above the forehead, the Patiala Shahi Dastar rises proudly with balanced volume on both sides.',
    historicalOrigin:
      'Within Sikh heritage, the Dastar is not an ornament but a sacred article of faith instituted to affirm equality, moral courage, and self-sovereignty—historically reserved only for royalty before being claimed for every Sikh.',
    culturalMeaning:
      'For Sikhs, tying the Dastar each morning is an act of spiritual discipline, humility, and responsibility. In the museum context, it is presented with deep respect as a living sacred crown of identity rather than a costume.',
    verificationNote:
      'Grounded in Sikh historical tradition and documented Patiala court styles; various regional Punjabi Dastar forms (Morni, Amritsari, Dumalla) also flourish.',
    occasions: ['Religious occasion', 'Wedding', 'Everyday traditional wear', 'Formal event', 'Cultural celebration'],
    colors: ['Blue', 'Saffron', 'Red', 'White'],
    colorHexes: ['#1F305E', '#D97706', '#641F2B', '#F6F1E7'],
    fabric: 'Full Voile or Rubia Voile Cotton (double-width folded)',
    fabricCategory: 'Cotton',
    style: 'Traditional',
    difficulty: 'Intermediate',
    typicalLengthMeters: '6.5 m – 7.5 m',
    featuredFact:
      'Unlike festive turbans tied only for special days, the Sikh Dastar is tied freshly by hand every morning as a sacred daily commitment.',
    image: '/src/assets/images/turban_punjabi_dastar_1795273980615.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_punjabi_dastar_1795273980615.jpg',
        viewLabel: 'Portrait View',
        caption: 'Deep indigo Patiala Shahi Dastar with crisp parallel larhs.',
        sourceAttribution: 'PAGDI Cultural Documentation — Punjab',
      },
      {
        url: '/src/assets/images/museum_textile_archive_1795273980409.jpg',
        viewLabel: 'Textile Study',
        caption: 'Hand-folded cotton and silk weaves preserved in archive.',
        sourceAttribution: 'PAGDI Textile Archive',
      },
    ],
    tryOnPresetId: 'punjabi-dastar',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Preparing the Pooni (Folded Cloth)',
        beginnerInstruction:
          'Lightly mist the cotton voile and fold it lengthwise with a partner or anchor point to create a smooth, crease-free strip called a Pooni.',
        detailedInstruction:
          'Pull the cloth taut along its grain, tucking both selvedges inward toward the centre line (double-pooni) so the outer edge remains sharp and smooth for clean larhs.',
        clothLengthNote: '7.0 m Full Voile · Folded into Pooni',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Base Keski & First Forehead Pass',
        beginnerInstruction:
          'Over a neat base keski (under-turban), clamp the starting edge gently between the teeth or hold at the nape and bring the first fold over the forehead.',
        detailedInstruction:
          'Establish the central apex above the nose bridge by angling the first pass at 35° across the right brow down toward the left ear.',
        clothLengthNote: '1.2 m anchored',
        wrapAngleDeg: 35,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Creating the Symmetrical V-Apex',
        beginnerInstruction:
          'Bring the cloth around the back and sweep upward from the left ear to meet the first fold at the top centre.',
        detailedInstruction:
          'Keep the thick closed edge of the Pooni facing downward on each lower pass so each fold forms a crisp horizontal ridge.',
        clothLengthNote: '2.5 m wrapped',
        wrapAngleDeg: -35,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Stepping the Five Patiala Larhs',
        beginnerInstruction:
          'Continue wrapping side to side, placing each new fold slightly above the previous one so five neat ridges appear on the left and right.',
        detailedInstruction:
          'Use a slender wooden or metal baaj (tucking pin) gently to align the thickness of each larh and prevent gaps at the temples.',
        clothLengthNote: '5.2 m wrapped',
        wrapAngleDeg: 28,
        layerCount: 5,
      },
      {
        phase: '05 · Pleats',
        title: 'Shaping the Crown Volume',
        beginnerInstruction:
          'Spread the upper layers cleanly across the top of the head so the silhouette rises smoothly without sagging.',
        detailedInstruction:
          'Fan the inner edge of the fourth and fifth larhs across the parietal crown to achieve the distinctive rounded Patiala Shahi arch.',
        clothLengthNote: '6.2 m wrapped',
        wrapAngleDeg: -15,
        layerCount: 6,
      },
      {
        phase: '06 · Finishing',
        title: 'Locking the Top Larh & Crown Cover',
        beginnerInstruction:
          'Open the final cloth layer slightly wider, pull it smoothly over the top of the head, and tuck the end neatly at the back.',
        detailedInstruction:
          'Draw the final central pass cleanly over the apex, pinch-tuck the top cover (sir dhakna) uniformly, and smooth the rear anchor.',
        clothLengthNote: '7.0 m complete',
        wrapAngleDeg: 0,
        layerCount: 7,
      },
      {
        phase: '07 · Final Styling',
        title: 'Alignment & Mirror Check',
        beginnerInstruction:
          'Ensure all folds sit evenly above the eyebrows and both sides frame the face symmetrically.',
        detailedInstruction:
          'Verify that the keski remains concealed cleanly behind the ear lines and the front apex aligns with the nasal bridge.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 7,
      },
    ],
  },
  {
    id: 'kolhapuri-pheta',
    accessionNumber: 'ACC. IND-MH-004',
    name: 'Kolhapuri Pheta',
    localName: 'कोल्हापुरी फेटा',
    classification: 'Pheta',
    region: 'Maharashtra',
    subRegion: 'Kolhapur & Western Maharashtra',
    summary:
      'An expressive, celebratory Maharashtrian turban crowned with a dramatic pleated fan (tura) and flowing side tail (shemla).',
    description:
      'Distinctly different from Northern Pagris, the Kolhapuri Pheta is wrapped loosely in vibrant saffron, crimson, or marigold cotton/silk and finished with an unmistakable upright pleated fan crest and long trailing sash.',
    historicalOrigin:
      'Rooted in Maratha royal courts and rural agrarian culture of Kolhapur, the Pheta became an emblem of civic pride, hospitality, and artistic life—especially in Lavani, Tamasha, wrestling akhadas, and state ceremonies.',
    culturalMeaning:
      'Offering a Pheta in Maharashtra is the highest gesture of welcome and honour (Pheta Bandhane). Saffron (kesari) evokes Maratha valour and devotion, while bright crimson and pink celebrate weddings and harvests.',
    verificationNote:
      'Documented in Kolhapur state archival photographs and living community practice across Western Maharashtra.',
    occasions: ['Wedding', 'Festival', 'Cultural celebration', 'Independence Day', 'Royal or ceremonial occasion'],
    colors: ['Saffron', 'Red', 'Pink', 'Yellow'],
    colorHexes: ['#D4622B', '#B75E40', '#B49A62', '#8B2635'],
    fabric: 'Fine Starched Cotton or Chanderi-blend Pheta cloth',
    fabricCategory: 'Cotton',
    style: 'Ceremonial',
    difficulty: 'Intermediate',
    typicalLengthMeters: '7.5 m × 0.9 m',
    featuredFact:
      'The upright pleated fan (tura) of a Kolhapuri Pheta resembles an open peacock crest and is shaped entirely from the final folds of the same uncut cloth.',
    image: '/src/assets/images/turban_kolhapuri_pheta_1795273980861.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_kolhapuri_pheta_1795273980861.jpg',
        viewLabel: 'Front Portrait',
        caption: 'Saffron Kolhapuri Pheta with radial fan crest and shoulder shemla.',
        sourceAttribution: 'PAGDI Regional Documentation — Maharashtra',
      },
      {
        url: '/src/assets/images/turban_puneri_pagdi_1795273980978.jpg',
        viewLabel: 'Regional Contrast',
        caption: 'Contrast between the sculpted Puneri Pagdi and the flowing Pheta.',
        sourceAttribution: 'PAGDI Museum Comparison',
      },
    ],
    tryOnPresetId: 'kolhapuri-pheta',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Crisp Longitudinal Gathering',
        beginnerInstruction:
          'Shake out the 7.5-metre cotton Pheta cloth and gather it loosely into a 15 cm wide ribbon without crushing its natural drape.',
        detailedInstruction:
          'Pre-starch lightly if a taller radial tura is desired; leave 1.2 metres of the trailing end ungathered for the chest-length shemla.',
        clothLengthNote: '7.5 m starched cotton',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Left-Shoulder Shemla Drop',
        beginnerInstruction:
          'Let the reserved tail hang down in front of the left shoulder and pass the active cloth across the brow.',
        detailedInstruction:
          'Anchor the shemla base cleanly behind the left ear and bring the initial turn diagonally upward across the right temple.',
        clothLengthNote: '1.2 m tail set',
        wrapAngleDeg: 22,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Establishing the Rounded Crown',
        beginnerInstruction:
          'Wrap around the back of the skull and cross back over the forehead to form a generous, comfortable band.',
        detailedInstruction:
          'Keep the lower forehead border broad and level above the eyebrows, creating an earthy, stable base.',
        clothLengthNote: '3.0 m wrapped',
        wrapAngleDeg: -18,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Voluminous Side Passes',
        beginnerInstruction:
          'Make three full turns around the head, letting the fabric fill out comfortably rather than pulling tight.',
        detailedInstruction:
          'Angle each subsequent turn slightly rearward so space remains at the upper right crown for the fan rosette.',
        clothLengthNote: '5.2 m wrapped',
        wrapAngleDeg: 15,
        layerCount: 4,
      },
      {
        phase: '05 · Pleats',
        title: 'Forming the Peacock Fan (Tura)',
        beginnerInstruction:
          'Fold the remaining 1.5 metres back and forth into wide, crisp accordion pleats and tuck the base into the top band so it opens like a fan.',
        detailedInstruction:
          'Pinch 8 to 10 deep pleats (each 4 cm wide) along the grain, fan them out into a semicircular halo, and wedge the base tightly behind the outer wrap.',
        clothLengthNote: '6.8 m wrapped · Tura formed',
        wrapAngleDeg: 48,
        layerCount: 5,
      },
      {
        phase: '06 · Finishing',
        title: 'Balancing the Tail & Back Tuck',
        beginnerInstruction:
          'Pull the hanging tail gently to adjust its length over the shoulder and secure any loose edge at the back.',
        detailedInstruction:
          'Spread the shemla slightly across the shoulder so its border lies flat without twisting.',
        clothLengthNote: '7.5 m complete',
        wrapAngleDeg: 0,
        layerCount: 6,
      },
      {
        phase: '07 · Final Styling',
        title: 'Opening the Fan',
        beginnerInstruction:
          'Lightly separate the upper pleats of the fan with your fingertips so it catches the light.',
        detailedInstruction:
          'Check that the tura tilts slightly outward at 35° for authentic Kolhapuri proportion.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 6,
      },
    ],
  },
  {
    id: 'puneri-pagdi',
    accessionNumber: 'ACC. IND-MH-005',
    name: 'Puneri Pagdi',
    localName: 'पुणेरी पगडी',
    classification: 'Pagdi',
    region: 'Maharashtra',
    subRegion: 'Pune',
    summary:
      'A pre-sculpted, Geographical Indication (GI)-protected crimson silk and gold zari Pagdi celebrated as a symbol of scholarship and civic dignity in Pune.',
    description:
      'Unlike cloth wrapped anew before every outing, the classical Puneri Pagdi is hand-constructed over a shaped mould using deep red silk, stiffened cotton backing, and an upward-curving gold zari crest (kokha).',
    historicalOrigin:
      'Popularised in 19th-century Pune and associated with social reformers, scholars, and civic leaders—most famously Lokmanya Bal Gangadhar Tilak and Justice Mahadev Govind Ranade—the Puneri Pagdi received Geographical Indication (GI) status in 2009.',
    culturalMeaning:
      'In Pune’s cultural memory, the Puneri Pagdi represents learning, principled leadership, and intellectual heritage. Today it is worn at academic convocations, cultural festivals, and traditional weddings.',
    verificationNote:
      'Verified Geographical Indication (GI No. 132, Government of India, 2009) documenting Pune’s traditional pagdi-making guilds.',
    occasions: ['Formal event', 'Cultural celebration', 'Wedding', 'Royal or ceremonial occasion'],
    colors: ['Red', 'Saffron'],
    colorHexes: ['#641F2B', '#B49A62', '#8B1E2B'],
    fabric: 'Crimson Silk with woven Gold Zari border (pre-formed)',
    fabricCategory: 'Silk',
    style: 'Traditional',
    difficulty: 'Beginner friendly',
    typicalLengthMeters: 'Pre-shaped sculptural form',
    featuredFact:
      'The Puneri Pagdi is one of India’s few turbans protected by a formal Geographical Indication (GI) tag, awarded in 2009.',
    image: '/src/assets/images/turban_puneri_pagdi_1795273980978.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_puneri_pagdi_1795273980978.jpg',
        viewLabel: 'Museum Plinth View',
        caption: 'Sculpted crimson silk Puneri Pagdi with gold-embroidered kokha crest.',
        sourceAttribution: 'PAGDI Museum Archive — Pune Collection',
      },
      {
        url: '/src/assets/images/turban_kolhapuri_pheta_1795273980861.jpg',
        viewLabel: 'Maharashtrian Lineage',
        caption: 'Living Maharashtrian Pheta worn alongside Pune’s sculptural pagdi.',
        sourceAttribution: 'PAGDI Regional Archive',
      },
    ],
    tryOnPresetId: 'kolhapuri-pheta',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Inspecting the Custom Fit',
        beginnerInstruction:
          'Because a Puneri Pagdi is hand-stitched over a rigid mould, select the size matching your head circumference.',
        detailedInstruction:
          'Artisans first construct an inner cardboard-and-cotton frame (bhoga) tailored precisely to the wearer’s cranial circumference.',
        clothLengthNote: 'Pre-formed cranial mould',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Aligning the Front Ridge',
        beginnerInstruction:
          'Hold the Pagdi with the sweeping crimson-and-gold border facing forward and the curved crest on the right.',
        detailedInstruction:
          'Position the lower stitched rim 1.5 cm above the eyebrows so the diagonal front fold frames the forehead cleanly.',
        clothLengthNote: 'Seated crown alignment',
        wrapAngleDeg: 5,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Seating the Rear Support',
        beginnerInstruction:
          'Lower the back rim gently toward the crown base so the Pagdi rests evenly without tilting.',
        detailedInstruction:
          'Check that the weighted silk folds sit securely against the occipital curve without pressing on the ears.',
        clothLengthNote: 'Balanced seating',
        wrapAngleDeg: 0,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Checking the Zari Band Symmetry',
        beginnerInstruction:
          'Observe the gold zari border running diagonally across the front.',
        detailedInstruction:
          'Ensure the brocade weave catches ambient light cleanly across the pleated right cheek of the pagdi.',
        clothLengthNote: 'Artisan-stitched pleats',
        wrapAngleDeg: 10,
        layerCount: 4,
      },
      {
        phase: '05 · Pleats',
        title: 'The Curved Kokha Crest',
        beginnerInstruction:
          'Adjust the angle slightly so the iconic upright curved crest rises gracefully above the crown.',
        detailedInstruction:
          'The characteristic pointed kokha should lean slightly rearward, balanced by the tassel drop if present.',
        clothLengthNote: 'Sculpted crest',
        wrapAngleDeg: 30,
        layerCount: 5,
      },
      {
        phase: '06 · Finishing',
        title: 'Securing the Inner Band',
        beginnerInstruction:
          'Confirm a snug, comfortable fit that stays steady during walking.',
        detailedInstruction:
          'Traditional makers line the interior with breathable cotton twill to absorb moisture during long ceremonies.',
        clothLengthNote: 'Breathable cotton lining',
        wrapAngleDeg: 0,
        layerCount: 6,
      },
      {
        phase: '07 · Final Styling',
        title: 'Pairing with Traditional Attire',
        beginnerInstruction:
          'Wear upright with a clean kurta, bandhgala, or traditional Maharashtrian uparne.',
        detailedInstruction:
          'Preserves the scholar-statesman silhouette associated with historic Pune gatherings.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 6,
      },
    ],
  },
  {
    id: 'kathiawadi-pagdi',
    accessionNumber: 'ACC. IND-GJ-006',
    name: 'Kathiawadi / Halari Pagdi',
    localName: 'કાઠિયાવાડી પાઘડી',
    classification: 'Pagdi',
    region: 'Gujarat',
    subRegion: 'Saurashtra & Kutch',
    summary:
      'A crisp, generously rounded cotton turban from Saurashtra and Kutch designed to shield against coastal sun and desert winds.',
    description:
      'Known locally as Paghdi or Moliyu, the Kathiawadi style features thick, cushioned coils—often bright white cotton or accented with vermilion Bandhani edges—providing natural insulation in western Gujarat.',
    historicalOrigin:
      'Worn for centuries across the Saurashtra peninsula and Kutch by pastoralists, maritime merchants, farmers, and chieftains, each fold variation quietly encoded village and community identity.',
    culturalMeaning:
      'In Gujarati folk proverbs, the Paghdi embodies word of honour ("Paghdi no bhar"). Crisp white cotton denotes elder wisdom and everyday dignity, while red-and-gold Bandhani transforms it for Navratri and weddings.',
    verificationNote:
      'Documented across Saurashtra and Kutch ethnographic textile surveys; local variants include Halari, Gohilwadi, and Kutchi Moliyu.',
    occasions: ['Everyday traditional wear', 'Festival', 'Wedding', 'Cultural celebration'],
    colors: ['White', 'Red'],
    colorHexes: ['#F6F1E7', '#B75E40', '#DCC9A6'],
    fabric: 'Handspun Khadi / Thick Cotton with Bandhani edge',
    fabricCategory: 'Cotton',
    style: 'Regional',
    difficulty: 'Intermediate',
    typicalLengthMeters: '7.5 m – 8.5 m',
    featuredFact:
      'In rural Saurashtra, the thick multi-layered cotton coils act as thermal insulation, keeping the wearer’s head noticeably cooler in 45°C summer heat.',
    image: '/src/assets/images/turban_gujarati_pagdi_1795273980645.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_gujarati_pagdi_1795273980645.jpg',
        viewLabel: 'Artisan Portrait',
        caption: 'Handspun ivory cotton Kathiawadi Pagdi with vermilion accent border.',
        sourceAttribution: 'PAGDI Archive — Kutch & Saurashtra Study',
      },
    ],
    tryOnPresetId: 'punjabi-dastar',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Softening the Handspun Khadi',
        beginnerInstruction:
          'Loosely gather the unstarched handspun cotton cloth in soft coils so it retains airy volume.',
        detailedInstruction:
          'Unlike crisp northern voiles, Kathiawadi cotton relies on soft, cushioned folds that cushion the crown against intense sunlight.',
        clothLengthNote: '8.0 m Khadi cotton',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Low Brow Cushion',
        beginnerInstruction:
          'Anchor one corner behind the left ear and sweep the first thick fold across the lower forehead.',
        detailedInstruction:
          'Bring the red Bandhani selvedge subtly along the front edge so a thin ribbon of colour highlights the crisp ivory cotton.',
        clothLengthNote: '1.5 m anchored',
        wrapAngleDeg: 14,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Crossed Temple Loops',
        beginnerInstruction:
          'Circle the back of the head and cross upward over the opposite temple to create the rounded Gujarati dome.',
        detailedInstruction:
          'Maintain slightly gentler tension so the fabric puffs outward at the sides like a protective halo.',
        clothLengthNote: '3.4 m wrapped',
        wrapAngleDeg: -16,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Building the Broad Crown',
        beginnerInstruction:
          'Layer three to four thick overlapping wraps around the sides, leaving the centre crown padded.',
        detailedInstruction:
          'Wrap upward in progressive arcs, letting each turn nestle against the previous cushion.',
        clothLengthNote: '6.0 m wrapped',
        wrapAngleDeg: 10,
        layerCount: 5,
      },
      {
        phase: '05 · Pleats',
        title: 'Tucking the Front Fold',
        beginnerInstruction:
          'Bring the penultimate pass across the upper crown and tuck smoothly behind the side band.',
        detailedInstruction:
          'Form a modest side twist (chhoti) if styling in the Halari manner.',
        clothLengthNote: '7.2 m wrapped',
        wrapAngleDeg: 8,
        layerCount: 6,
      },
      {
        phase: '06 · Finishing',
        title: 'Securing the End',
        beginnerInstruction:
          'Tuck the final tail cleanly downward into the rear layers.',
        detailedInstruction:
          'Ensure no sharp corners protrude; the silhouette should feel organic and balanced.',
        clothLengthNote: '8.0 m complete',
        wrapAngleDeg: 0,
        layerCount: 7,
      },
      {
        phase: '07 · Final Styling',
        title: 'Settling the Fit',
        beginnerInstruction:
          'Press lightly on top so the Pagdi sits securely above the ears.',
        detailedInstruction:
          'Ready for long outdoor gatherings, fairs, or folk music celebrations.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 7,
      },
    ],
  },
  {
    id: 'mysore-peta',
    accessionNumber: 'ACC. IND-KA-007',
    name: 'Mysore Peta',
    localName: 'ಮೈಸೂರು ಪೇಟ',
    classification: 'Peta',
    region: 'South India',
    subRegion: 'Mysuru (Karnataka)',
    summary:
      'The iconic ivory-and-gold silk ceremonial turban of the Wadiyar court of Mysuru, today bestowed across Karnataka to honour artists, scholars, and civic leaders.',
    description:
      'Constructed with shimmering Mysore silk and woven gold zari tissue, the Mysore Peta combines sculpted diagonal folds with an ornate gold border and optional feathered crest (turra).',
    historicalOrigin:
      'Adopted by the Maharajas of Mysuru in the 19th and early 20th centuries—and prominently worn by visionary statesmen such as Sir M. Visvesvaraya—the Mysore Peta bridged royal court etiquette and modern civic honour.',
    culturalMeaning:
      'While South India’s everyday climate favoured bare heads or lighter cloth wraps (mundas), the Mysore Peta endures as Karnataka’s premier emblem of respect, presented at Mysuru Dasara, university convocations, and weddings.',
    verificationNote:
      'Documented in Mysore Palace archives and Karnataka state ceremonial protocol.',
    occasions: ['Royal or ceremonial occasion', 'Formal event', 'Wedding', 'Groom', 'Cultural celebration'],
    colors: ['White', 'Saffron', 'Red'],
    colorHexes: ['#F6F1E7', '#B49A62', '#78350F'],
    fabric: 'Mysore Mulberry Silk & Gold Zari Tissue',
    fabricCategory: 'Silk',
    style: 'Royal',
    difficulty: 'Expert',
    typicalLengthMeters: 'Pre-formed or 6 m silk',
    featuredFact:
      'During the historic Mysuru Dasara, presenting a Mysore Peta alongside a shawl remains Karnataka’s highest traditional civic honour.',
    image: '/src/assets/images/turban_mysore_peta_1795273980342.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_mysore_peta_1795273980342.jpg',
        viewLabel: 'Royal Exhibition View',
        caption: 'Ivory Mysore silk Peta woven with gold zari and ceremonial crest.',
        sourceAttribution: 'PAGDI Museum Archive — Karnataka Collection',
      },
    ],
    tryOnPresetId: 'mysore-peta',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Preparing Silk & Zari Tissue',
        beginnerInstruction:
          'Handle the delicate mulberry silk and metallic zari tissue gently over a clean cloth surface.',
        detailedInstruction:
          'Modern ceremonial Mysore Petas are often pre-crafted on a cushioned crown frame, while hand-tied court versions use 6 metres of fine tissue silk.',
        clothLengthNote: '6.0 m silk zari or structured crown',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Aligning the Golden Brow Band',
        beginnerInstruction:
          'Place the wide woven zari border diagonally across the forehead.',
        detailedInstruction:
          'Keep the ivory silk field centered while allowing the metallic tissue band to trace an upward arc from left temple to right crown.',
        clothLengthNote: 'Frontal alignment',
        wrapAngleDeg: 20,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Cross-Pleating the Silk Field',
        beginnerInstruction:
          'Sweep the opposing silk band across the brow to create a layered golden V.',
        detailedInstruction:
          'Press smooth folds gently with clean dry hands to preserve the silk lustre.',
        clothLengthNote: '2.8 m wrapped',
        wrapAngleDeg: -20,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Building Side Tiers',
        beginnerInstruction:
          'Layer three smooth silk folds along the sides without bunching.',
        detailedInstruction:
          'Maintain crisp stepped spacing so the paisley zari motif remains uninterrupted.',
        clothLengthNote: '4.8 m wrapped',
        wrapAngleDeg: 14,
        layerCount: 5,
      },
      {
        phase: '05 · Pleats',
        title: 'Attaching the Sarpech & Crest',
        beginnerInstruction:
          'Position the central crest or feathered ornament neatly above the intersection.',
        detailedInstruction:
          'Anchor the kalgi stem behind the upper zari band so it stands centered and balanced.',
        clothLengthNote: 'Ornamental crest',
        wrapAngleDeg: 0,
        layerCount: 6,
      },
      {
        phase: '06 · Finishing',
        title: 'Tucking the Rear Silk',
        beginnerInstruction:
          'Smooth the back silk evenly over the crown and tuck the end discreetly.',
        detailedInstruction:
          'Ensure the interior cotton lining sits comfortably for ceremonial wear.',
        clothLengthNote: '6.0 m complete',
        wrapAngleDeg: 0,
        layerCount: 7,
      },
      {
        phase: '07 · Final Styling',
        title: 'Final Presentation',
        beginnerInstruction:
          'Adjust the Peta level across the brow for dignified royal poise.',
        detailedInstruction:
          'Traditionally worn with a Mysore silk angavastram or formal bandhgala.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 7,
      },
    ],
  },
  {
    id: 'himachali-kulluvi-pagri',
    accessionNumber: 'ACC. IND-HP-008',
    name: 'Kulluvi & Kinnauri Pagri',
    localName: 'कुल्लुवी पगड़ी / ठेठू',
    classification: 'Topi & Pagri',
    region: 'Himachal Pradesh',
    subRegion: 'Kullu & Kinnaur Valleys',
    summary:
      'High-altitude Himalayan woollen headwear combining handwoven geometric patti bands with wrapped woollen folds for warmth and ceremonial kinship.',
    description:
      'While Himachal Pradesh is widely recognised today for its iconic Kulluvi and Kinnauri caps (Topi), traditional mountain elders and grooms also wrap handspun woollen pagris—often encircled by a handwoven geometric border band.',
    historicalOrigin:
      'Evolved across isolated Himalayan valleys where local sheep wool (pattu) protected communities against freezing winds while handwoven geometric motifs encoded valley identities.',
    culturalMeaning:
      'In Kullu, Kinnaur, and Shimla hills, headwear is exchanged during village temple festivals (Melas) and weddings as a sign of brotherhood and blessing.',
    verificationNote:
      'Clearly distinguishes traditional wrapped woollen pagris/thethu from the modern pillbox Himachali Topi; both remain living valley traditions.',
    occasions: ['Festival', 'Everyday traditional wear', 'Wedding', 'Cultural celebration'],
    colors: ['Multicolour', 'Green', 'Red'],
    colorHexes: ['#7C8872', '#641F2B', '#DCC9A6'],
    fabric: 'Handspun Himalayan Wool with geometric woven Patti band',
    fabricCategory: 'Wool & Handloom',
    style: 'Regional',
    difficulty: 'Beginner friendly',
    typicalLengthMeters: '4.5 m woollen cloth or woven band',
    featuredFact:
      'The colourful geometric strip adorning Himachali headwear is woven separately on narrow pit-looms using patterns inspired by temple architecture.',
    image: '/src/assets/images/turban_himachali_kulluvi_1795273980673.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_himachali_kulluvi_1795273980673.jpg',
        viewLabel: 'Mountain Portrait',
        caption: 'Wrapped Himalayan woollen pagri framed by a Kinnauri geometric band.',
        sourceAttribution: 'PAGDI Archive — Western Himalaya',
      },
    ],
    tryOnPresetId: 'punjabi-dastar',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Gathering the Woollen Cloth',
        beginnerInstruction:
          'Lay out the soft handspun woollen wrap and keep the woven geometric patti band facing outward.',
        detailedInstruction:
          'Woollen wraps are shorter than plains cotton (around 4.5 m) to provide warmth without excessive weight.',
        clothLengthNote: '4.5 m Himalayan wool',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Warm Ear-Level Frame',
        beginnerInstruction:
          'Wrap the first turn snugly around the upper forehead and just above the ear tips.',
        detailedInstruction:
          'Anchor firmly at the nape to guard against mountain wind.',
        clothLengthNote: '1.2 m anchored',
        wrapAngleDeg: 10,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Diagonal Wool Coils',
        beginnerInstruction:
          'Bring the cloth around the crown in smooth, wide coils.',
        detailedInstruction:
          'Let each thick woollen turn overlap cleanly by half its width.',
        clothLengthNote: '2.5 m wrapped',
        wrapAngleDeg: -12,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Showcasing the Geometric Patti',
        beginnerInstruction:
          'Position the colourful handwoven geometric border prominently across the front brow.',
        detailedInstruction:
          'Ensure diamond motifs remain aligned across the frontal arc.',
        clothLengthNote: '3.6 m wrapped',
        wrapAngleDeg: 14,
        layerCount: 4,
      },
      {
        phase: '05 · Pleats',
        title: 'Crown Tuck & Marigold Accents',
        beginnerInstruction:
          'Tuck the final edge inside the side fold; fresh marigold or dry alpine flowers are traditionally tucked in for festivals.',
        detailedInstruction:
          'Secure the terminal flap inside the layered wool without requiring pins.',
        clothLengthNote: '4.5 m complete',
        wrapAngleDeg: 0,
        layerCount: 5,
      },
      {
        phase: '06 · Finishing',
        title: 'Checking Comfort',
        beginnerInstruction:
          'Adjust slightly backward so the brow remains open and warm.',
        detailedInstruction:
          'Balance the weight symmetrically across the crown.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 5,
      },
      {
        phase: '07 · Final Styling',
        title: 'Festive Completion',
        beginnerInstruction:
          'Ready for Kullu Dussehra, temple fairs, or mountain winter wear.',
        detailedInstruction:
          'Often paired with a handwoven woollen pattu or chola.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 5,
      },
    ],
  },
  {
    id: 'kashmiri-dastar',
    accessionNumber: 'ACC. IND-JK-009',
    name: 'Kashmiri Dastar',
    localName: 'کشمیری دستار',
    classification: 'Dastar',
    region: 'Kashmir',
    subRegion: 'Srinagar & Kashmir Valley',
    summary:
      'A softly coiled linen, cotton, or fine pashmina turban worn over an embroidered skullcap by Kashmiri elders, scholars, and master artisans.',
    description:
      'Gracefully wound in relaxed, organic coils with a single draped shoulder end, the Kashmiri Dastar pairs quiet elegance with warmth, typically worn over a traditional skullcap (topi/kullah).',
    historicalOrigin:
      'Historically worn across Sufi shrines, craft guilds, and merchant houses of Srinagar, Kashmiri turban traditions reflect centuries of Silk Route textile mastery in fine muslin and pashmina.',
    culturalMeaning:
      'Among Kashmiri elders, scholars, and spiritual leaders, the Dastar signifies serenity, hospitality, and reverence. Today it remains deeply respected at community prayers, weddings, and cultural heritage gatherings.',
    verificationNote:
      'Reflects documented Kashmiri valley elder and artisan headwear practices; distinct from neighbouring Himalayan and Punjabi forms.',
    occasions: ['Religious occasion', 'Everyday traditional wear', 'Cultural celebration', 'Formal event'],
    colors: ['White', 'Green'],
    colorHexes: ['#F6F1E7', '#7C8872', '#DCC9A6'],
    fabric: 'Fine Linen, Mulmul Cotton, or Pashmina-wool blend',
    fabricCategory: 'Other traditional textiles',
    style: 'Traditional',
    difficulty: 'Beginner friendly',
    typicalLengthMeters: '5.0 m – 6.0 m',
    featuredFact:
      'Unlike rigidly starched turbans, the Kashmiri Dastar is left softly unstarched so its linen or wool folds drape gently around a fitted inner cap.',
    image: '/src/assets/images/turban_kashmiri_dastar_1795273980898.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_kashmiri_dastar_1795273980898.jpg',
        viewLabel: 'Artisan Courtyard Portrait',
        caption: 'Softly wound ivory Kashmiri Dastar worn by a master walnut-wood carver.',
        sourceAttribution: 'PAGDI Archive — Srinagar Documentation',
      },
    ],
    tryOnPresetId: 'punjabi-dastar',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Base Skullcap & Soft Cloth',
        beginnerInstruction:
          'Place a fitted skullcap on the head first, then gather the soft unstarched linen cloth into an airy, unpressed band.',
        detailedInstruction:
          'Avoid sharp folding creases so the natural weave forms gentle cylindrical coils.',
        clothLengthNote: '5.5 m soft linen/cotton',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Shoulder Drape Setup',
        beginnerInstruction:
          'Leave a 60 cm woven end draped softly over the left shoulder before starting the first wrap.',
        detailedInstruction:
          'Anchor the cloth comfortably along the lower cap rim.',
        clothLengthNote: '0.6 m draped end',
        wrapAngleDeg: 10,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Soft Encircling Coils',
        beginnerInstruction:
          'Wrap gently around the skullcap in three or four relaxed circular passes.',
        detailedInstruction:
          'Keep the cap apex slightly visible or fully covered depending on personal tradition.',
        clothLengthNote: '2.5 m wrapped',
        wrapAngleDeg: 6,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Balanced Rounded Silhouette',
        beginnerInstruction:
          'Overlap each pass softly so the silhouette looks calm and rounded.',
        detailedInstruction:
          'Maintain uniform lightness without rigid triangular angles.',
        clothLengthNote: '4.2 m wrapped',
        wrapAngleDeg: -5,
        layerCount: 4,
      },
      {
        phase: '05 · Pleats',
        title: 'No Sharp Pleats Required',
        beginnerInstruction:
          'Allow the fabric’s natural texture and woven borders to take focus.',
        detailedInstruction:
          'Adjust the front folds gently with flat palms.',
        clothLengthNote: '5.0 m wrapped',
        wrapAngleDeg: 0,
        layerCount: 5,
      },
      {
        phase: '06 · Finishing',
        title: 'Tucking the Terminal End',
        beginnerInstruction:
          'Tuck the outer tail smoothly behind the ear fold while keeping the shoulder drape neat.',
        detailedInstruction:
          'Let the fringed woven edge rest cleanly over the pheran collar.',
        clothLengthNote: '5.5 m complete',
        wrapAngleDeg: 0,
        layerCount: 5,
      },
      {
        phase: '07 · Final Styling',
        title: 'Quiet Dignity',
        beginnerInstruction:
          'Verify balanced framing around the brow.',
        detailedInstruction:
          'Pairs naturally with a Kashmiri woollen pheran.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 5,
      },
    ],
  },
  {
    id: 'haryanvi-khandwa',
    accessionNumber: 'ACC. IND-HR-010',
    name: 'Haryanvi Khandwa',
    localName: 'हरियाणवी खंडवा',
    classification: 'Khandwa',
    region: 'Haryana',
    subRegion: 'Rohtak, Hisar & Rural Haryana',
    summary:
      'A crisp, broad-folded pure white handloom cotton turban revered across rural Haryana as a living emblem of panchayat honour, brotherhood, and elder authority.',
    description:
      'Tied in wide, bold horizontal and diagonal wraps using stiffened white cotton muslin, the Haryanvi Khandwa sits firmly and broadly on the head, projecting grounded strength and simplicity.',
    historicalOrigin:
      'Deeply woven into agrarian and village council (panchayat) life across Haryana and western Uttar Pradesh, the Khandwa has served for generations as sun protection in the fields and formal regalia in community assemblies.',
    culturalMeaning:
      'In Haryana, exchanging turbans ("Pagri badalna") creates a sacred lifelong bond of brotherhood, while placing a Khandwa upon a younger family member symbolises passing responsibility for the household’s honour.',
    verificationNote:
      'Grounded in documented rural Haryanvi social customs and folk literature; coloured Safas are also worn at weddings.',
    occasions: ['Everyday traditional wear', 'Cultural celebration', 'Family celebration', 'Wedding'],
    colors: ['White'],
    colorHexes: ['#F6F1E7', '#EBE3D3', '#DCC9A6'],
    fabric: 'Crisp Handloom Cotton Muslin (Desi Lattha / Malmal)',
    fabricCategory: 'Cotton',
    style: 'Traditional',
    difficulty: 'Beginner friendly',
    typicalLengthMeters: '7.0 m – 8.0 m',
    featuredFact:
      'In Haryanvi custom, "Pagri Sambhal Jatta" turned the white farmer’s turban into an enduring symbol of self-respect and agrarian solidarity.',
    image: '/src/assets/images/turban_haryanvi_khandwa_1795273980120.jpg',
    gallery: [
      {
        url: '/src/assets/images/turban_haryanvi_khandwa_1795273980120.jpg',
        viewLabel: 'Courtyard Portrait',
        caption: 'Pure white handloom Haryanvi Khandwa with broad structured folds.',
        sourceAttribution: 'PAGDI Archive — Haryana Field Study',
      },
    ],
    tryOnPresetId: 'punjabi-dastar',
    tryOnSupported: true,
    tutorialSteps: [
      {
        phase: '01 · Preparation',
        title: 'Wide Unfolded Drape',
        beginnerInstruction:
          'Keep the white cotton cloth wider than northern pagris—around 25 cm wide when loosely folded.',
        detailedInstruction:
          'Light starching gives the white cotton its crisp architectural presence.',
        clothLengthNote: '7.5 m handloom cotton',
        wrapAngleDeg: 0,
        layerCount: 1,
      },
      {
        phase: '02 · Anchor',
        title: 'Firm Brow Anchor',
        beginnerInstruction:
          'Anchor one end at the crown base and sweep a wide band firmly across the upper forehead.',
        detailedInstruction:
          'Keep the lower rim straight and confident just above the brow.',
        clothLengthNote: '1.5 m anchored',
        wrapAngleDeg: 15,
        layerCount: 2,
      },
      {
        phase: '03 · First Wrap',
        title: 'Crossing Broadly',
        beginnerInstruction:
          'Wrap around the back and bring the wide band across the opposite temple to form a broad V.',
        detailedInstruction:
          'Maintain firm tension so the turban stays secure through outdoor work and travel.',
        clothLengthNote: '3.2 m wrapped',
        wrapAngleDeg: -15,
        layerCount: 3,
      },
      {
        phase: '04 · Layers',
        title: 'Generous Side Width',
        beginnerInstruction:
          'Add three broad turns, letting the cotton build natural horizontal width.',
        detailedInstruction:
          'Overlap folds generously so the crown stays shaded and insulated.',
        clothLengthNote: '5.5 m wrapped',
        wrapAngleDeg: 10,
        layerCount: 4,
      },
      {
        phase: '05 · Pleats',
        title: 'Top Crown Coverage',
        beginnerInstruction:
          'Spread the upper fold broadly over the top of the head.',
        detailedInstruction:
          'Close the top opening cleanly to shield against midday sun.',
        clothLengthNote: '6.8 m wrapped',
        wrapAngleDeg: 0,
        layerCount: 5,
      },
      {
        phase: '06 · Finishing',
        title: 'Tucking the End Flap',
        beginnerInstruction:
          'Tuck the final tail firmly beneath the rear wrap.',
        detailedInstruction:
          'Some Haryanvi elders leave a short crisp flap (turra) tucked upward at the side.',
        clothLengthNote: '7.5 m complete',
        wrapAngleDeg: 0,
        layerCount: 6,
      },
      {
        phase: '07 · Final Styling',
        title: 'Grounded Balance',
        beginnerInstruction:
          'Check that the Khandwa sits squarely and comfortably.',
        detailedInstruction:
          'Pairs traditionally with white dhoti-kurta and a tailored bandi.',
        clothLengthNote: 'Complete',
        wrapAngleDeg: 0,
        layerCount: 6,
      },
    ],
  },
];

export const REGIONS_DATA: RegionProfile[] = [
  {
    id: 'Rajasthan',
    name: 'Rajasthan',
    localTerms: ['Safa', 'Pagri', 'Paag'],
    headline: 'A grammar of colour written in desert cloth.',
    summary:
      'In Rajasthan, it is famously said that dialect and turban style change every twenty miles. From the sweeping diagonal Safa of Marwar to the slender Panchrangi Pagri of Jaipur and the compact Mewari Paag, headwear encodes season, festival, and lineage.',
    climateAndCraft:
      'Intense desert sun inspired 9-to-20-metre wraps in breathable malmal cotton and lightweight silk, enriched by Bandhani tie-resist and Leheriya wave dyeing.',
    culturalNote:
      'Tying a turban on a guest honours them as family; exchanging turbans seals lifelong kinship.',
    image: '/src/assets/images/turban_jodhpuri_safa_1795273980634.jpg',
    representativeTurbanIds: ['jodhpuri-safa', 'jaipur-panchrangi-pagri'],
    mapCoordinates: { x: 165, y: 235 },
  },
  {
    id: 'Punjab',
    name: 'Punjab',
    localTerms: ['Dastar', 'Pagg', 'Dumalla'],
    headline: 'An article of faith, sovereignty, and daily discipline.',
    summary:
      'Across Punjab, the Dastar stands apart as a living spiritual commitment rather than occasional attire. From the tall Patiala Shahi to the sleek Morni and circular Dumalla, each fold is tied fresh by hand every morning.',
    climateAndCraft:
      'Crafted predominantly in breathable Full Voile and Rubia Voile cottons (5 to 8 metres) folded into a crisp double Pooni.',
    culturalNote:
      'Historically claimed as a declaration that every citizen carries equal dignity and moral responsibility.',
    image: '/src/assets/images/turban_punjabi_dastar_1795273980615.jpg',
    representativeTurbanIds: ['punjabi-patiala-shahi-dastar'],
    mapCoordinates: { x: 195, y: 145 },
  },
  {
    id: 'Maharashtra',
    name: 'Maharashtra',
    localTerms: ['Pheta', 'Puneri Pagdi', 'Mawala'],
    headline: 'Between scholarly precision and celebratory sweep.',
    summary:
      'Maharashtra preserves a remarkable duality: the pre-sculpted, GI-tagged Puneri Pagdi of 19th-century scholars and reformers alongside the vibrant, flowing Kolhapuri Pheta crowned with a peacock-like pleated fan.',
    climateAndCraft:
      'Crimson silk with gold zari for formal sculpted pagdis; crisp saffron, pink, or scarlet starched cottons for phetas.',
    culturalNote:
      'Welcoming a guest with a Pheta remains one of Maharashtra’s most cherished public gestures of warmth.',
    image: '/src/assets/images/turban_kolhapuri_pheta_1795273980861.jpg',
    representativeTurbanIds: ['kolhapuri-pheta', 'puneri-pagdi'],
    mapCoordinates: { x: 205, y: 390 },
  },
  {
    id: 'Gujarat',
    name: 'Gujarat',
    localTerms: ['Paghdi', 'Moliyu', 'Safa'],
    headline: 'Cushioned cotton crowns of Saurashtra and Kutch.',
    summary:
      'Across Kathiawar and Kutch, artisans, pastoralists, and elders wear thick, sun-shielding cotton turbans whose subtle folds and Bandhani borders quietly identify village and craft guild.',
    climateAndCraft:
      'Handspun Khadi cotton and natural-dyed Kutchi Bandhani resist cloth designed for coastal wind and intense heat.',
    culturalNote:
      'In Gujarati idiom, a person’s Paghdi embodies their word and integrity.',
    image: '/src/assets/images/turban_gujarati_pagdi_1795273980645.jpg',
    representativeTurbanIds: ['kathiawadi-pagdi'],
    mapCoordinates: { x: 120, y: 310 },
  },
  {
    id: 'Haryana',
    name: 'Haryana',
    localTerms: ['Khandwa', 'Pagri', 'Safa'],
    headline: 'Pure white cotton as an emblem of elder counsel.',
    summary:
      'In Haryana’s villages and assemblies, the broad white Khandwa reflects grounded agrarian dignity, solidarity, and the passing of family stewardship across generations.',
    climateAndCraft:
      'Stiffened handloom cotton muslin (lattha) wrapped in broad protective layers.',
    culturalNote:
      'Exchanging turbans (Pagri Badalna) creates a lifelong bond of sworn brotherhood.',
    image: '/src/assets/images/turban_haryanvi_khandwa_1795273980120.jpg',
    representativeTurbanIds: ['haryanvi-khandwa'],
    mapCoordinates: { x: 222, y: 185 },
  },
  {
    id: 'Himachal Pradesh',
    name: 'Himachal Pradesh',
    localTerms: ['Kulluvi Pagri', 'Thethu', 'Kinnauri Topi'],
    headline: 'Mountain wool and geometric loom-woven bands.',
    summary:
      'In the high valleys of Kullu and Kinnaur, sheep wool wraps and structured caps adorned with geometric pit-loom patti strips unite thermal resilience with ceremonial valley pride.',
    climateAndCraft:
      'Handspun Himalayan sheep wool paired with brightly patterned woollen borders.',
    culturalNote:
      'Exchanged during valley temple festivals (Melas) and mountain weddings.',
    image: '/src/assets/images/turban_himachali_kulluvi_1795273980673.jpg',
    representativeTurbanIds: ['himachali-kulluvi-pagri'],
    mapCoordinates: { x: 245, y: 125 },
  },
  {
    id: 'Kashmir',
    name: 'Kashmir',
    localTerms: ['Dastar', 'Lungi', 'Taranga'],
    headline: 'Soft linen and pashmina wound over an embroidered cap.',
    summary:
      'Kashmir’s traditional Dastar avoids rigid starching in favour of serene, organic linen or fine wool coils worn by craftsmen, elders, and spiritual leaders.',
    climateAndCraft:
      'Unstarched Kashmiri cotton, fine linen, and soft wool blends paired with inner skullcaps.',
    culturalNote:
      'Symbolises quiet scholarship, artisan mastery, and valley hospitality.',
    image: '/src/assets/images/turban_kashmiri_dastar_1795273980898.jpg',
    representativeTurbanIds: ['kashmiri-dastar'],
    mapCoordinates: { x: 210, y: 80 },
  },
  {
    id: 'South India',
    name: 'South India',
    localTerms: ['Mysore Peta', 'Mundu-Headwrap', 'Talappavu'],
    headline: 'Ceremonial silk tissue and civic honour in Karnataka.',
    summary:
      'While warm tropical climates made bare heads common in everyday southern life, royal courts such as Mysuru perfected the luminous gold-zari Mysore Peta—still presented today as Karnataka’s highest honour.',
    climateAndCraft:
      'Fine Mysuru mulberry silk interlaced with metallic gold zari tissue.',
    culturalNote:
      'Bestowed at Mysuru Dasara, literary honours, academic convocations, and formal weddings.',
    image: '/src/assets/images/turban_mysore_peta_1795273980342.jpg',
    representativeTurbanIds: ['mysore-peta'],
    mapCoordinates: { x: 245, y: 500 },
  },
];

export const HERITAGE_STORIES: HeritageStory[] = [
  {
    slug: 'why-turbans-differ-across-india',
    chapterNumber: 'Essay 01',
    title: 'Why No Two Regions Tie a Turban Alike',
    subtitle: 'How geography, climate, and community turned a single rectangle of cloth into hundreds of distinct silhouettes.',
    category: 'Regional Anthropology',
    readTime: '5 min read',
    publishedDate: 'Autumn Archive',
    heroImage: '/src/assets/images/museum_textile_archive_1795273980409.jpg',
    excerpt:
      'Across India, an uncut length of cotton or silk becomes a thermal shield in Marwar, a sacred covenant in Punjab, and a sculpted mark of scholarship in Pune.',
    pullQuote:
      'A turban is never merely cloth on a head—it is geography, climate, and lineage folded into form.',
    marginNotes: [
      {
        title: 'Terminology Matters',
        body: 'In Rajasthan, a Safa is wider and shorter with a tail; a Pagri is narrower and up to 20 metres long. In Maharashtra, a Pheta is hand-tied while a Puneri Pagdi is sculpted over a mould.',
      },
      {
        title: 'Climate Adaptation',
        body: 'Arid zones favour airy malmal cotton and layered cushions that trap cool air; Himalayan valleys weave dense sheep wool patti wraps.',
      },
    ],
    sections: [
      {
        heading: 'One Cloth, Many Grammars',
        paragraphs: [
          'To speak of "the Indian turban" in the singular is to miss the very genius of the tradition. Across the subcontinent, communities rarely cut or tailored their headwear into uniform hats; instead, they mastered the geometry of draping an uncut woven length.',
          'Because draping responds to human hands, climate, and custom, every valley and plain evolved its own vocabulary. A traveller moving from Patiala to Jodhpur, and onward to Kolhapur and Mysuru, encounters entirely distinct silhouettes—each carrying local rules of tension, pleating, and etiquette.',
        ],
      },
      {
        heading: 'Climate as Co-Designer',
        paragraphs: [
          'In the Thar Desert and Saurashtra, wrapped layers of fine malmal or handspun khadi act as remarkable passive insulation, shielding the cranium from fierce solar heat while absorbing perspiration. In the western Himalayas, woollen coils encircle the brow to hold warmth against alpine winds.',
          'Meanwhile, in humid coastal belts of southern and eastern India, everyday labour favoured lighter, temporary headcloths, reserving opulent silk-and-zari headwear like the Mysore Peta for royal courts and civic honours.',
        ],
      },
    ],
  },
  {
    slug: 'the-language-of-colour-and-occasion',
    chapterNumber: 'Essay 02',
    title: 'The Quiet Language of Saffron, Crimson, and White',
    subtitle: 'Decoding why colours shift with seasons, harvests, and life’s milestones.',
    category: 'Colour & Symbolism',
    readTime: '4 min read',
    publishedDate: 'Autumn Archive',
    heroImage: '/src/assets/images/hero_turban_portrait_1795273975279.jpg',
    excerpt:
      'Long before synthetic dyes arrived, natural indigo, madder root, turmeric, and safflower gave Indian turbans an unspoken calendar of mood and occasion.',
    pullQuote:
      'Without a single word spoken, the hue of a turban announced spring, celebration, solemnity, or resolve.',
    marginNotes: [
      {
        title: 'Leheriya & Monsoon',
        body: 'Diagonal striped Leheriya safas appear prominently during the Shravan monsoon festivals of Teej and Raksha Bandhan.',
      },
      {
        title: 'Saffron (Kesari)',
        body: 'Across Rajput, Maratha, and Sikh historical accounts, saffron dye signified courage, spring renewal, and spiritual readiness.',
      },
    ],
    sections: [
      {
        heading: 'Natural Dyes as Cultural Calendar',
        paragraphs: [
          'In traditional communities, opening one’s trunk of turbans meant reading the seasons of the year. Pale yellow basanti and pink gulabi greeted spring harvests and Holi; striped Leheriya echoed monsoon rains across Rajasthan; deep madder crimson accompanied winter weddings.',
          'Conversely, pure unbleached white cotton (safed) across Haryana, Gujarat, and Rajasthan conveyed elder dignity, simplicity, or solemn respect during condolence gatherings.',
        ],
      },
      {
        heading: 'Carrying Symbolism Forward',
        paragraphs: [
          'While modern weddings often treat turban hues purely as colour-coordination with apparel, understanding the historical grammar behind saffron, crimson, indigo, and ivory allows a new generation to wear colour with intention.',
        ],
      },
    ],
  },
  {
    slug: 'sacred-crown-and-civic-honour',
    chapterNumber: 'Essay 03',
    title: 'Of Faith, Brotherhood, and Sovereign Dignity',
    subtitle: 'Why the turban in India means responsibility before it ever means ornament.',
    category: 'Identity & Ethics',
    readTime: '6 min read',
    publishedDate: 'Autumn Archive',
    heroImage: '/src/assets/images/turban_punjabi_dastar_1795273980615.jpg',
    excerpt:
      'From the Sikh Dastar as a daily covenant of equality to the village custom of Pagri Badalna, the turban binds the wearer to a community ethic.',
    pullQuote:
      'In Indian tradition, placing a turban on another’s head is never trivial—it is entrusting them with honour.',
    marginNotes: [
      {
        title: 'Respectful Presentation',
        body: 'In museum curation, sacred traditions such as the Sikh Dastar must always be contextualised as articles of living faith, never reduced to novelty.',
      },
    ],
    sections: [
      {
        heading: 'When Headwear Became Equality',
        paragraphs: [
          'During eras when sumptuary laws restricted tall headgear to aristocrats, the Sikh Gurus elevated the Dastar into a universal daily mark of spiritual sovereignty and social equality—affirming that every person stands with unbroken dignity.',
          'Similarly, across rural northern and western India, the ceremony of Rasam Pagri—where an eldest heir receives the family turban—marks not privilege, but duty toward elders and kin.',
        ],
      },
    ],
  },
  {
    slug: 'hands-behind-the-loom-and-pleat',
    chapterNumber: 'Essay 04',
    title: 'The Artisans Behind the Craft',
    subtitle: 'Meet the weavers, Bandhani tiers, and master pagdi-bandhas keeping a tactile knowledge alive.',
    category: 'Craftsmanship',
    readTime: '5 min read',
    publishedDate: 'Autumn Archive',
    heroImage: '/src/assets/images/craft_tying_hands_1795273981267.jpg',
    excerpt:
      'Behind every dramatic crest sits hours of handloom weaving, knotted resist-dyeing, rice-water starching, and muscle memory passed across workshops.',
    pullQuote:
      'A master turban-tier reads the weight of cloth through fingertips—knowing in seconds how many folds will frame a face.',
    marginNotes: [
      {
        title: 'Bandhani Knots',
        body: 'A single silk Bandhani safa can contain thousands of tiny hand-tied resist knots pinched before immersion in dye vats.',
      },
    ],
    sections: [
      {
        heading: 'Tactile Knowledge at Risk',
        paragraphs: [
          'For centuries, specialist artisans—Bandhej workers in Sikar and Bhuj, weavers in Kota and Chanderi, and pagdi-makers in Pune’s historic lanes—formed an interdependent ecosystem around headwear.',
          'As everyday turban wearing declined in cities, pre-stitched foam-backed hats began replacing hand-tied cloth. Yet a quiet revival is underway: young grooms, cultural performers, and heritage collectives are returning to authentic hand-tied textiles.',
        ],
      },
    ],
  },
];

export const GALLERY_ITEMS: GalleryExhibitItem[] = [
  {
    id: 'gal-1',
    title: 'Jaipur Palace Colonnade Portrait',
    category: 'Royal turbans',
    region: 'Rajasthan',
    turbanId: 'jodhpuri-safa',
    turbanName: 'Jodhpuri Safa',
    caption: 'Hand-pleated crimson and saffron Bandhani silk Safa photographed in warm sandstone light.',
    sourceAttribution: 'PAGDI Curatorial Commission',
    image: '/src/assets/images/hero_turban_portrait_1795273975279.jpg',
  },
  {
    id: 'gal-2',
    title: 'Tactile Archive Plinths',
    category: 'Textile and craftsmanship',
    region: 'Pan-India',
    turbanId: 'jaipur-panchrangi-pagri',
    turbanName: 'Ceremonial Archive Trio',
    caption: 'Ivory cotton, saffron silk, and maroon zari brocade exhibited on travertine limestone plinths.',
    sourceAttribution: 'PAGDI Exhibition Gallery',
    image: '/src/assets/images/museum_textile_archive_1795273980409.jpg',
  },
  {
    id: 'gal-3',
    title: 'Marwar Leheriya Ceremonial Safa',
    category: 'Wedding turbans',
    region: 'Rajasthan',
    turbanId: 'jodhpuri-safa',
    turbanName: 'Jodhpuri Safa',
    caption: 'Deep maroon and gold Leheriya silk Safa with Kalgi jewel and trailing shoulder shimla.',
    sourceAttribution: 'PAGDI Archive — Marwar',
    image: '/src/assets/images/turban_jodhpuri_safa_1795273980634.jpg',
  },
  {
    id: 'gal-4',
    title: 'Panchrangi Five-Colour Zari Pagri',
    category: 'Festival turbans',
    region: 'Rajasthan',
    turbanId: 'jaipur-panchrangi-pagri',
    turbanName: 'Jaipur Panchrangi Pagri',
    caption: 'Narrow twenty-metre cotton strip dyed in five auspicious hues with scalloped zari crest.',
    sourceAttribution: 'PAGDI Museum Stand Collection',
    image: '/src/assets/images/turban_jaipur_pagri_1795273980695.jpg',
  },
  {
    id: 'gal-5',
    title: 'Patiala Shahi Indigo Dastar',
    category: 'Everyday turbans',
    region: 'Punjab',
    turbanId: 'punjabi-patiala-shahi-dastar',
    turbanName: 'Patiala Shahi Dastar',
    caption: 'Crisp symmetrical Full Voile folds tied cleanly as a daily commitment of Sikh identity.',
    sourceAttribution: 'PAGDI Punjab Documentation',
    image: '/src/assets/images/turban_punjabi_dastar_1795273980615.jpg',
  },
  {
    id: 'gal-6',
    title: 'Kolhapuri Saffron Fan Pheta',
    category: 'Festival turbans',
    region: 'Maharashtra',
    turbanId: 'kolhapuri-pheta',
    turbanName: 'Kolhapuri Pheta',
    caption: 'Vibrant saffron-terracotta Pheta crowned with a pleated radial tura and flowing shemla.',
    sourceAttribution: 'PAGDI Maharashtra Documentation',
    image: '/src/assets/images/turban_kolhapuri_pheta_1795273980861.jpg',
  },
  {
    id: 'gal-7',
    title: 'GI-Protected Puneri Silk Pagdi',
    category: 'Historical turbans',
    region: 'Maharashtra',
    turbanId: 'puneri-pagdi',
    turbanName: 'Puneri Pagdi',
    caption: 'Sculpted crimson silk and gold zari Pagdi celebrated as Pune’s scholarly heritage emblem.',
    sourceAttribution: 'PAGDI Pune Archive',
    image: '/src/assets/images/turban_puneri_pagdi_1795273980978.jpg',
  },
  {
    id: 'gal-8',
    title: 'Mysuru Court Zari Peta',
    category: 'Royal turbans',
    region: 'South India',
    turbanId: 'mysore-peta',
    turbanName: 'Mysore Peta',
    caption: 'Ivory mulberry silk and gold zari tissue ceremonial Peta with feathered sarpech.',
    sourceAttribution: 'PAGDI Karnataka Collection',
    image: '/src/assets/images/turban_mysore_peta_1795273980342.jpg',
  },
  {
    id: 'gal-9',
    title: 'Kutch Handspun Kathiawadi Pagdi',
    category: 'Everyday turbans',
    region: 'Gujarat',
    turbanId: 'kathiawadi-pagdi',
    turbanName: 'Kathiawadi / Halari Pagdi',
    caption: 'Unbleached khadi cotton cushioned coils with subtle vermilion Bandhani border.',
    sourceAttribution: 'PAGDI Gujarat Field Archive',
    image: '/src/assets/images/turban_gujarati_pagdi_1795273980645.jpg',
  },
  {
    id: 'gal-10',
    title: 'Pashmina & Linen Kashmiri Dastar',
    category: 'Historical turbans',
    region: 'Kashmir',
    turbanId: 'kashmiri-dastar',
    turbanName: 'Kashmiri Dastar',
    caption: 'Softly wound ivory linen Dastar photographed inside a carved walnut-wood courtyard.',
    sourceAttribution: 'PAGDI Srinagar Archive',
    image: '/src/assets/images/turban_kashmiri_dastar_1795273980898.jpg',
  },
  {
    id: 'gal-11',
    title: 'Himalayan Wool & Patti Wrap',
    category: 'Colour collections',
    region: 'Himachal Pradesh',
    turbanId: 'himachali-kulluvi-pagri',
    turbanName: 'Kulluvi & Kinnauri Pagri',
    caption: 'Handspun wool coils encircled by geometric maroon and sage Kinnauri weave.',
    sourceAttribution: 'PAGDI Western Himalaya Archive',
    image: '/src/assets/images/turban_himachali_kulluvi_1795273980673.jpg',
  },
  {
    id: 'gal-12',
    title: 'Hands Pleating Bandhani Silk',
    category: 'Textile and craftsmanship',
    region: 'Rajasthan',
    turbanId: 'jodhpuri-safa',
    turbanName: 'Artisan Pleating Technique',
    caption: 'Master craftsman gathering longitudinal accordion pleats before diagonal head wrapping.',
    sourceAttribution: 'PAGDI Craft Film Stills',
    image: '/src/assets/images/craft_tying_hands_1795273981267.jpg',
  },
];

export const OCCASIONS_LIST = [
  'Wedding',
  'Reception',
  'Festival',
  'Religious celebration',
  'Independence Day',
  'Cultural event',
  'Family celebration',
  'Traditional photoshoot',
  'Everyday wear',
] as const;

export function getRecommendationsForOccasion(
  occasion: string,
  region?: string
): OccasionRecommendation[] {
  const normalized = occasion.toLowerCase();

  const occasionRules: Record<string, { ids: string[]; rationale: Record<string, string>; colors: Record<string, string[]>; etiquette: Record<string, string> }> = {
    wedding: {
      ids: ['jodhpuri-safa', 'kolhapuri-pheta', 'mysore-peta', 'punjabi-patiala-shahi-dastar'],
      rationale: {
        'jodhpuri-safa': 'The sweeping Leheriya or Bandhani folds and trailing shimla frame wedding attire with unmistakable ceremonial warmth.',
        'kolhapuri-pheta': 'In Maharashtrian baraats and welcomes, bright saffron or pink Phetas unite guests and family in celebratory joy.',
        'mysore-peta': 'Ivory silk and woven gold zari tissue pair naturally with South Indian silk veshtis and sherwanis.',
        'punjabi-patiala-shahi-dastar': 'For Sikh Anand Karaj ceremonies, rich crimson, royal pink, or deep maroon Dastars honour the sacred occasion.',
      },
      colors: {
        'jodhpuri-safa': ['Crimson & Gold', 'Saffron Leheriya', 'Rose Pink'],
        'kolhapuri-pheta': ['Marigold Saffron', 'Kesari', 'Rani Pink'],
        'mysore-peta': ['Ivory & Gold Zari', 'Champagne Silk'],
        'punjabi-patiala-shahi-dastar': ['Deep Maroon', 'Royal Pink', 'Navy Blue'],
      },
      etiquette: {
        'jodhpuri-safa': 'Grooms traditionally add a Kalgi ornament; guests wear matching family Safas without the jewel.',
        'kolhapuri-pheta': 'Worn slightly tilted with the shemla falling cleanly over the left shoulder.',
        'mysore-peta': 'Presented respectfully by elders to honour the groom and close family.',
        'punjabi-patiala-shahi-dastar': 'Tied freshly with clean symmetrical larhs; heads remain covered throughout Gurdwara ceremonies.',
      },
    },
    reception: {
      ids: ['mysore-peta', 'puneri-pagdi', 'jodhpuri-safa'],
      rationale: {
        'mysore-peta': 'Architectural ivory and gold brocade brings understated evening formality to modern reception tailoring.',
        'puneri-pagdi': 'Crisp sculpted crimson silk commands quiet authority alongside a bandhgala or achkan.',
        'jodhpuri-safa': 'Minimal monochrome or muted gold Chanderi Safas complement contemporary evening silhouettes.',
      },
      colors: {
        'mysore-peta': ['Ivory Gold', 'Antique Cream'],
        'puneri-pagdi': ['Deep Crimson & Gold'],
        'jodhpuri-safa': ['Ivory', 'Muted Gold', 'Deep Maroon'],
      },
      etiquette: {
        'mysore-peta': 'Wear balanced and level above the brow.',
        'puneri-pagdi': 'Avoid casual tilting; keep the kokha crest poised.',
        'jodhpuri-safa': 'Keep pleats neat and understated for evening lighting.',
      },
    },
    festival: {
      ids: ['jaipur-panchrangi-pagri', 'kolhapuri-pheta', 'himachali-kulluvi-pagri', 'kathiawadi-pagdi'],
      rationale: {
        'jaipur-panchrangi-pagri': 'Five festive hues celebrate Teej, Gangaur, Diwali, and seasonal abundance.',
        'kolhapuri-pheta': 'Radiant saffron and scarlet folds animate Ganeshotsav, Gudi Padwa, and harvest processions.',
        'himachali-kulluvi-pagri': 'Patterned mountain patti wraps belong authentically to Kullu Dussehra and valley fairs.',
        'kathiawadi-pagdi': 'Crisp cotton and Bandhani edges bring vibrant folk energy to Navratri and Uttarayan.',
      },
      colors: {
        'jaipur-panchrangi-pagri': ['Panchrangi Five-Hue', 'Saffron & Rose'],
        'kolhapuri-pheta': ['Kesari Saffron', 'Vermilion'],
        'himachali-kulluvi-pagri': ['Natural Wool & Maroon Patti'],
        'kathiawadi-pagdi': ['Ivory & Vermilion Bandhani'],
      },
      etiquette: {
        'jaipur-panchrangi-pagri': 'Pair with light cotton angarkha or kurta.',
        'kolhapuri-pheta': 'Let the radial fan open generously.',
        'himachali-kulluvi-pagri': 'A fresh marigold tucked at the side celebrates local festival custom.',
        'kathiawadi-pagdi': 'Worn comfortably for long hours of folk music and dance.',
      },
    },
    'religious celebration': {
      ids: ['punjabi-patiala-shahi-dastar', 'kashmiri-dastar', 'haryanvi-khandwa'],
      rationale: {
        'punjabi-patiala-shahi-dastar': 'For Gurpurab and sacred gatherings, the Dastar is worn as a mark of devotion, humility, and equality.',
        'kashmiri-dastar': 'Softly coiled white linen or pashmina reflects quiet reverence during valley prayers.',
        'haryanvi-khandwa': 'Unbleached pure white cotton symbolises purity and elder blessing at family rituals.',
      },
      colors: {
        'punjabi-patiala-shahi-dastar': ['Kesri Saffron', 'Deep Navy', 'Pure White'],
        'kashmiri-dastar': ['Off-White Linen', 'Muted Sage'],
        'haryanvi-khandwa': ['Pure White'],
      },
      etiquette: {
        'punjabi-patiala-shahi-dastar': 'Always treat the Dastar with reverence; remove shoes and handle with clean hands.',
        'kashmiri-dastar': 'Worn neatly over a fitted inner cap.',
        'haryanvi-khandwa': 'Keep folds sober and free of flamboyant ornaments.',
      },
    },
    'independence day': {
      ids: ['kolhapuri-pheta', 'puneri-pagdi', 'haryanvi-khandwa', 'punjabi-patiala-shahi-dastar'],
      rationale: {
        'kolhapuri-pheta': 'Saffron Phetas echo civic pride and Maharashtra’s historic cultural rallies.',
        'puneri-pagdi': 'Directly linked to Pune’s 19th-century freedom thinkers and civic reformers.',
        'haryanvi-khandwa': 'White cotton turbans evoke agrarian self-respect and historic freedom movements.',
        'punjabi-patiala-shahi-dastar': 'Basanti and deep indigo Dastars honour Punjab’s legacy of courage and service.',
      },
      colors: {
        'kolhapuri-pheta': ['Saffron', 'White'],
        'puneri-pagdi': ['Crimson & Gold'],
        'haryanvi-khandwa': ['Pure White'],
        'punjabi-patiala-shahi-dastar': ['Basanti Yellow', 'Deep Indigo'],
      },
      etiquette: {
        'kolhapuri-pheta': 'Wear upright with simple handloom khadi attire.',
        'puneri-pagdi': 'Best paired with classic khadi kurta or bandhgala.',
        'haryanvi-khandwa': 'Emphasises dignified simplicity.',
        'punjabi-patiala-shahi-dastar': 'Worn with traditional poise.',
      },
    },
    'cultural event': {
      ids: ['mysore-peta', 'jodhpuri-safa', 'puneri-pagdi', 'himachali-kulluvi-pagri'],
      rationale: {
        'mysore-peta': 'Ideal for academic convocations, music sabhas, and literary honours.',
        'jodhpuri-safa': 'Showcases Rajasthan’s living textile resist crafts at heritage showcases.',
        'puneri-pagdi': 'Immediately signals scholarly and classical cultural heritage.',
        'himachali-kulluvi-pagri': 'Highlights handloom geometric weaving of the western Himalayas.',
      },
      colors: {
        'mysore-peta': ['Ivory & Gold'],
        'jodhpuri-safa': ['Maroon Leheriya', 'Terracotta'],
        'puneri-pagdi': ['Crimson Silk'],
        'himachali-kulluvi-pagri': ['Natural Wool & Sage'],
      },
      etiquette: {
        'mysore-peta': 'Honours cultural presenters and recipients alike.',
        'jodhpuri-safa': 'Great conversation piece when paired with its regional story.',
        'puneri-pagdi': 'Wear with respect for Pune’s scholarly lineage.',
        'himachali-kulluvi-pagri': 'Carry the story of Kullu/Kinnaur loom weavers.',
      },
    },
    'family celebration': {
      ids: ['jodhpuri-safa', 'kolhapuri-pheta', 'haryanvi-khandwa', 'kathiawadi-pagdi'],
      rationale: {
        'jodhpuri-safa': 'Tying matching Safas on elders and younger cousins creates instant multigenerational belonging.',
        'kolhapuri-pheta': 'Easy to photograph and joyful for milestone anniversaries and housewarmings.',
        'haryanvi-khandwa': 'Honours elders during milestone family gatherings and naming ceremonies.',
        'kathiawadi-pagdi': 'Brings warm folk warmth to family reunions.',
      },
      colors: {
        'jodhpuri-safa': ['Saffron', 'Rose', 'Gold'],
        'kolhapuri-pheta': ['Marigold', 'Terracotta'],
        'haryanvi-khandwa': ['White', 'Cream'],
        'kathiawadi-pagdi': ['Ivory & Red'],
      },
      etiquette: {
        'jodhpuri-safa': 'Elders often tie the first turn for younger members.',
        'kolhapuri-pheta': 'Keep the shemla tail neatly draped.',
        'haryanvi-khandwa': 'Honour elders first in the ceremony.',
        'kathiawadi-pagdi': 'Comfortable for full-day family hosting.',
      },
    },
    'traditional photoshoot': {
      ids: ['jodhpuri-safa', 'jaipur-panchrangi-pagri', 'kolhapuri-pheta', 'mysore-peta'],
      rationale: {
        'jodhpuri-safa': 'Dynamic diagonal Leheriya lines and a sculpted crest create timeless architectural framing.',
        'jaipur-panchrangi-pagri': 'Five-colour dye bands and zari weave shine in golden-hour stone courtyards.',
        'kolhapuri-pheta': 'The dramatic fan rosette offers unmatched silhouette depth in profile.',
        'mysore-peta': 'Lustrous silk and gold tissue photograph beautifully against dark wood or sandstone.',
      },
      colors: {
        'jodhpuri-safa': ['Deep Maroon & Gold', 'Terracotta'],
        'jaipur-panchrangi-pagri': ['Panchrangi'],
        'kolhapuri-pheta': ['Burnt Saffron'],
        'mysore-peta': ['Warm Ivory & Gold'],
      },
      etiquette: {
        'jodhpuri-safa': 'Choose natural matte silk or cotton rather than synthetic shine.',
        'jaipur-panchrangi-pagri': 'Position against neutral limestone or courtyard backdrops.',
        'kolhapuri-pheta': 'Angle slightly in three-quarter profile.',
        'mysore-peta': 'Ensure the crest sits centered and upright.',
      },
    },
    'everyday wear': {
      ids: ['punjabi-patiala-shahi-dastar', 'haryanvi-khandwa', 'kathiawadi-pagdi', 'kashmiri-dastar'],
      rationale: {
        'punjabi-patiala-shahi-dastar': 'Breathable Full Voile cotton keeps the Dastar comfortable from dawn to dusk.',
        'haryanvi-khandwa': 'Pure white handloom cotton shields effortlessly against sun and dust.',
        'kathiawadi-pagdi': 'Airy unstarched khadi cushions the head in warm dry climates.',
        'kashmiri-dastar': 'Soft unstarched linen and wool adapt naturally to cool mornings.',
      },
      colors: {
        'punjabi-patiala-shahi-dastar': ['Navy Blue', 'Slate', 'White', 'Maroon'],
        'haryanvi-khandwa': ['Pure White'],
        'kathiawadi-pagdi': ['Off-White Cotton'],
        'kashmiri-dastar': ['Ivory', 'Earthy Sage'],
      },
      etiquette: {
        'punjabi-patiala-shahi-dastar': 'Wash and dry voile regularly to keep folds crisp.',
        'haryanvi-khandwa': 'Keep spare starched cotton ready for clean daily rotation.',
        'kathiawadi-pagdi': 'Simple unornamented drape suited to active daily life.',
        'kashmiri-dastar': 'Pair with fitted inner topi for effortless comfort.',
      },
    },
  };

  const matchedKey =
    Object.keys(occasionRules).find((k) => normalized.includes(k)) || 'wedding';
  const rule = occasionRules[matchedKey];

  let candidates = rule.ids
    .map((id) => TURBANS_DATA.find((t) => t.id === id))
    .filter((t): t is Turban => Boolean(t));

  if (region && region !== 'All') {
    const regionalMatches = candidates.filter(
      (t) => t.region.toLowerCase() === region.toLowerCase()
    );
    if (regionalMatches.length > 0) {
      candidates = regionalMatches;
    }
  }

  return candidates.map((turban) => ({
    turban,
    whyItFits:
      rule.rationale[turban.id] ||
      `${turban.name} brings authentic ${turban.region} craftsmanship and heritage meaning to ${occasion}.`,
    suggestedColors: rule.colors[turban.id] || turban.colors,
    culturalEtiquette:
      rule.etiquette[turban.id] ||
      `Wear with awareness of its ${turban.region} regional heritage and traditional occasion etiquette.`,
  }));
}
