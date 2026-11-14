/* ============================================================
   ATELIER — Product catalogue
   Editorial photography sourced from Pexels (free licence).
   ============================================================ */

const px = (id, w = 1200, h = 1500) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`

export const IMAGES = {
  hero: px(20284091, 2000, 2600),
  seasonTall: px(19222080, 1100, 1500),
  seasonWide: px(31132019, 1200, 820),
  seasonKnit: px(11594664, 1100, 1400),
  story: px(31823166, 1300, 1700),
  storyWide: px(7255429, 1600, 1050),
  philosophy: px(8581064, 900, 1100),
  aboutWorkshop: px(13673656, 1200, 1500),
  aboutRail: px(8484138, 1400, 950),
  aboutDetail: px(6765065, 1000, 1250),
  campaign: [
    px(19771906, 900, 1200),
    px(33568368, 900, 1200),
    px(8422301, 900, 1200),
    px(10482937, 900, 1200),
    px(9690414, 900, 1200),
    px(29413396, 900, 1200),
  ],
  categories: {
    women: px(33343523, 1300, 1650),
    men: px(39731509, 1300, 1650),
    outerwear: px(19169496, 1300, 1650),
    essentials: px(39325098, 1300, 1650),
    accessories: px(12945022, 1300, 1650),
  },
}

export const productImages = {
  coat: px(19169496, 1100, 1400),
  knitPortrait: px(29413396, 1100, 1400),
}

const OX = { name: 'Onyx', hex: '#1b1b1a' }
const IVORY = { name: 'Ivory', hex: '#efe9de' }
const CAMEL = { name: 'Camel', hex: '#b49b7f' }
const CHARCOAL = { name: 'Charcoal', hex: '#2c2c29' }
const OAT = { name: 'Oat', hex: '#d8cdbb' }
const SAND = { name: 'Sand', hex: '#c9b79f' }
const TAUPE = { name: 'Taupe', hex: '#a69b8b' }
const STONE = { name: 'Stone', hex: '#a9a29a' }
const BARK = { name: 'Bark', hex: '#6e5a45' }
const WHITE = { name: 'White', hex: '#f2eee7' }
const INDIGO = { name: 'Indigo', hex: '#3b4a5a' }

export const products = [
  {
    id: 'aw26-01',
    name: 'Sculpted Wool Coat',
    price: 1290,
    category: 'outerwear',
    gender: 'women',
    material: 'Italian virgin wool',
    colourName: 'Camel',
    colours: [CAMEL, CHARCOAL, IVORY],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [px(19169496), px(19271545), px(6765065)],
    isNew: true,
    featured: true,
    description:
      'A coat cut with the confidence of a tailored jacket: strong shoulder, softened waist, a hem that falls just below the knee. Designed to be worn open, belted, or thrown over everything already in your wardrobe.',
    fabric:
      '100% virgin wool woven in Biella, Italy. Fully lined in cupro. Horn buttons, hand-finished lapel and a single deep back vent for movement.',
    care: 'Dry clean only. Air between wears. Store on a broad wooden hanger.',
  },
  {
    id: 'aw26-02',
    name: 'Bias Silk Gown',
    price: 890,
    category: 'women',
    gender: 'women',
    material: 'Sandwashed silk',
    colourName: 'Ivory',
    colours: [IVORY, OX],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [px(40720650), px(11594664)],
    isNew: true,
    featured: true,
    description:
      'Cut on the true bias so the silk moves with you rather than against you. A quiet, liquid silhouette with a cowl neck and an open back that only shows itself when you turn.',
    fabric:
      '100% sandwashed mulberry silk, 19 momme. French seams throughout, hand-rolled hem, no hardware.',
    care: 'Dry clean. Cool iron on the reverse if required.',
  },
  {
    id: 'aw26-03',
    name: 'Single-Breasted Blazer',
    price: 740,
    category: 'women',
    gender: 'women',
    material: 'Wool crepe',
    colourName: 'Chalk',
    colours: [IVORY, OX, CHARCOAL],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [px(29090983), px(17945059)],
    isNew: false,
    featured: true,
    description:
      'The blazer that does the work of three garments. Sharp at the shoulder, gentle through the body, with a slightly longer line that reads as both tailoring and outerwear.',
    fabric: '96% wool, 4% elastane crepe. Half-canvassed construction, cupro lining, patch pockets.',
    care: 'Dry clean only. Steam lightly to refresh.',
  },
  {
    id: 'aw26-04',
    name: 'Cashmere Crewneck',
    price: 420,
    category: 'women',
    gender: 'women',
    material: 'Grade-A cashmere',
    colourName: 'Oat',
    colours: [OAT, CHARCOAL, TAUPE],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [px(15914797), px(19264213), px(8581064)],
    isNew: true,
    featured: true,
    description:
      'Knitted in a fine 12-gauge cashmere with a relaxed, straight body and a neckline that sits exactly where it should. The kind of piece that becomes the quiet centre of a wardrobe.',
    fabric: '100% Grade-A Inner Mongolian cashmere, two-ply. Fully fashioned sleeves and linked trims.',
    care: 'Hand wash cold with cashmere shampoo. Dry flat, away from direct light.',
  },
  {
    id: 'aw26-05',
    name: 'Column Dress',
    price: 560,
    category: 'women',
    gender: 'women',
    material: 'Italian jersey',
    colourName: 'Onyx',
    colours: [OX, OAT],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [px(9690414), px(19771906)],
    isNew: false,
    featured: false,
    description:
      'A single, uninterrupted line from shoulder to floor. Weighted jersey holds the shape without clinging, with a high neck and a low, considered back.',
    fabric: '72% viscose, 28% silk. Double-layered body, invisible side zip, unlined for drape.',
    care: 'Dry clean. Do not hang for long periods; fold with tissue.',
  },
  {
    id: 'aw26-06',
    name: 'Cropped Knit Vest',
    price: 280,
    category: 'women',
    gender: 'women',
    material: 'Merino wool',
    colourName: 'Ecru',
    colours: [IVORY, TAUPE, OX],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [px(39325098), px(29413396)],
    isNew: true,
    featured: false,
    description:
      'A compact layer for transitions — cropped at the waist, knitted in a dry merino that holds its shape. Worn alone or beneath tailoring.',
    fabric: '100% extra-fine merino wool. Fully fashioned, ribbed trims, corozo buttons.',
    care: 'Hand wash cold. Dry flat. Do not tumble dry.',
  },
  {
    id: 'aw26-07',
    name: 'Italian Wool Overcoat',
    price: 1450,
    category: 'outerwear',
    gender: 'men',
    material: 'Double-faced wool',
    colourName: 'Stone',
    colours: [STONE, CAMEL, CHARCOAL],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [px(14643835), px(19122050), px(6765065)],
    isNew: true,
    featured: true,
    description:
      'An overcoat with presence but no weight. Double-faced wool means no lining and no compromise — clean inside and out, with a soft roll to the lapel that improves with wear.',
    fabric:
      '80% virgin wool, 20% cashmere, double-faced and hand-finished at the seams. Unlined, with taped edges.',
    care: 'Dry clean only. Brush after wear and rest between outings.',
  },
  {
    id: 'aw26-08',
    name: 'Double-Breasted Suit',
    price: 1180,
    category: 'men',
    gender: 'men',
    material: 'Super 120s wool',
    colourName: 'Charcoal',
    colours: [CHARCOAL, OX, STONE],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [px(26903318), px(26903333), px(29569640)],
    isNew: false,
    featured: true,
    description:
      'A modern six-button double-breasted suit with a clean shoulder and a tapered trouser. Cut to be worn as a whole, or split apart without anyone noticing.',
    fabric:
      '100% Super 120s wool, woven in Huddersfield. Half-canvassed jacket, bemberg lining, unfinished trouser hem for tailoring.',
    care: 'Dry clean sparingly. Press with a cloth. Hang jacket and trousers separately.',
  },
  {
    id: 'aw26-09',
    name: 'Merino Turtleneck',
    price: 320,
    category: 'men',
    gender: 'men',
    material: 'Extra-fine merino',
    colourName: 'Black',
    colours: [OX, OAT, CHARCOAL],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [px(10482937), px(31589335)],
    isNew: false,
    featured: false,
    description:
      'A fine-gauge turtleneck that sits close without pressure. The collar holds its line all day, making it the simplest answer to tailoring.',
    fabric: '100% extra-fine merino wool, 18.5 micron. Fully fashioned, linked collar and cuffs.',
    care: 'Hand wash cold or wool cycle. Dry flat.',
  },
  {
    id: 'aw26-10',
    name: 'Washed Linen Overshirt',
    price: 290,
    category: 'men',
    gender: 'men',
    material: 'Washed European linen',
    colourName: 'Sand',
    colours: [SAND, IVORY, CHARCOAL],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [px(18031039), px(8483487)],
    isNew: true,
    featured: false,
    description:
      'An overshirt cut generously enough to layer, in a linen that has already been washed soft. Worn open over a tee, or buttoned as a light jacket.',
    fabric: '100% European flax linen, garment-washed. Corozo buttons, single patch pocket, flat-felled seams.',
    care: 'Machine wash cold, gentle. Line dry. Wrinkles are part of the fabric.',
  },
  {
    id: 'aw26-11',
    name: 'Sculpted Leather Jacket',
    price: 1090,
    category: 'outerwear',
    gender: 'men',
    material: 'Lambskin leather',
    colourName: 'Black',
    colours: [OX, BARK],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [px(8422301), px(8441407)],
    isNew: false,
    featured: false,
    description:
      'A leather jacket reduced to its essentials: clean front, standing collar, slightly cropped body. Soft enough to wear from the first day, structured enough to hold its shape for years.',
    fabric: '100% lambskin, vegetable-tanned. Cupro lining, YKK Excella zip, hand-set sleeves.',
    care: 'Specialist leather clean only. Condition annually. Keep away from prolonged rain.',
  },
  {
    id: 'aw26-12',
    name: 'Wide-Leg Trouser',
    price: 380,
    category: 'men',
    gender: 'men',
    material: 'Wool twill',
    colourName: 'Charcoal',
    colours: [CHARCOAL, SAND, OX],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [px(39731509), px(31563818)],
    isNew: false,
    featured: false,
    description:
      'A high-rise trouser with a straight, generous leg and a single forward pleat. Cut long so it can break exactly where you want it to.',
    fabric: '100% wool twill, 320gsm. Unfinished hem, extended waistband, side adjusters.',
    care: 'Dry clean. Press on the reverse with a damp cloth.',
  },
  {
    id: 'aw26-13',
    name: 'Heavyweight Cotton Tee',
    price: 95,
    category: 'essentials',
    gender: 'unisex',
    material: 'Organic cotton, 280gsm',
    colourName: 'White',
    colours: [WHITE, OX, OAT],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [px(37704842), px(9594422)],
    isNew: false,
    featured: true,
    description:
      'A t-shirt with the weight of a knit. Dense, dry cotton that falls away from the body, with a collar that survives washing.',
    fabric: '100% organic cotton jersey, 280gsm. Tubular body, twin-needle hems, no side seams.',
    care: 'Machine wash cold, inside out. Line dry.',
  },
  {
    id: 'aw26-14',
    name: 'Selvedge Denim',
    price: 240,
    category: 'essentials',
    gender: 'unisex',
    material: 'Japanese selvedge denim',
    colourName: 'Indigo',
    colours: [INDIGO, OX],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [px(3944690), px(8581064)],
    isNew: false,
    featured: false,
    description:
      'Straight-leg denim woven on shuttle looms in Okayama, left raw so it fades to you. A five-pocket cut with a mid-rise and a clean, honest finish.',
    fabric: '100% cotton, 13.5oz raw selvedge denim. Chain-stitched hem, copper rivets, leather patch.',
    care: 'Wash rarely and cold, inside out. Hang dry. Expect indigo transfer at first.',
  },
  {
    id: 'aw26-15',
    name: 'Woven Leather Tote',
    price: 690,
    category: 'accessories',
    gender: 'unisex',
    material: 'Hand-woven calf leather',
    colourName: 'Tan',
    colours: [CAMEL, BARK, OX],
    sizes: ['One Size'],
    images: [px(12945022), px(9595290)],
    isNew: true,
    featured: true,
    description:
      'A soft, unstructured tote hand-woven from strips of vegetable-tanned calf. Holds a laptop, a folder and the rest of a day without announcing any of it.',
    fabric:
      '100% vegetable-tanned calf leather, hand-woven. Unlined suede base, magnetic closure, detachable zip pouch.',
    care: 'Wipe with a dry cloth. Condition twice yearly. Store in the dust bag provided.',
  },
  {
    id: 'aw26-16',
    name: 'Structured Handbag',
    price: 820,
    category: 'accessories',
    gender: 'women',
    material: 'Smooth calf leather',
    colourName: 'Bark',
    colours: [BARK, OX, IVORY],
    sizes: ['One Size'],
    images: [px(6650001), px(13525167)],
    isNew: false,
    featured: false,
    description:
      'A small, architectural bag with a rigid handle and a surprisingly generous interior. Designed to be carried by hand and kept for a long time.',
    fabric: 'Smooth Italian calf leather, hand-painted edges. Suede lining, palladium hardware, detachable strap.',
    care: 'Store filled with tissue in the dust bag. Avoid direct sunlight.',
  },
]

export const getProduct = (id) => products.find((product) => product.id === id)

export const categories = [
  {
    id: 'women',
    label: "Women's Clothing",
    short: 'Women',
    to: '/women',
    image: IMAGES.categories.women,
    note: 'Tailoring, knitwear and evening',
  },
  {
    id: 'men',
    label: "Men's Clothing",
    short: 'Men',
    to: '/men',
    image: IMAGES.categories.men,
    note: 'Suiting, outerwear and shirts',
  },
  {
    id: 'outerwear',
    label: 'Outerwear',
    short: 'Outerwear',
    to: '/collections?category=outerwear',
    image: IMAGES.categories.outerwear,
    note: 'Coats, jackets and layers',
  },
  {
    id: 'essentials',
    label: 'Essentials',
    short: 'Essentials',
    to: '/collections?category=essentials',
    image: IMAGES.categories.essentials,
    note: 'The permanent collection',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    short: 'Accessories',
    to: '/collections?category=accessories',
    image: IMAGES.categories.accessories,
    note: 'Leather, woven by hand',
  },
]

export const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']

export const allColours = (() => {
  const map = new Map()
  products.forEach((product) =>
    product.colours.forEach((colour) => {
      if (!map.has(colour.name)) map.set(colour.name, colour)
    }),
  )
  return [...map.values()]
})()
