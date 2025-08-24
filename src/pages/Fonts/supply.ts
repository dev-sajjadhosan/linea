import { GoogleFontsResponse } from "@/hooks/useFonts"

const quickSearchCategories: Record<string, string[]> = {
  all: [],
  Logo: [],
  Gaming: [],
  'Landing Page': [],
  'Hero Section': [],
  Blog: [],
  Portfolio: [],
  Corporate: [],
  Business: [],
  Creative: [],
  Display: [],
  Handwriting: [],
  Monospace: [],
  Serif: [],
  'Sans-serif': [],
  Modern: [],
  Classic: [],
  Minimal: [],
  Tech: [],
  Education: [],
  Kids: [],
  Branding: [],
  Web: [],
  UI: [],
  Print: [],
  Magazine: [],
  'Social Media': [],
  Poster: [],
  'Creative Projects': [],
  'Mobile App': [],
  'Crypto / Blockchain': [],
  'Esports / Streaming': [],
  'NFT / Web3': [],
  'Futuristic / Sci-Fi': [],
  'Indie Game': [],

  'Startup Pitch': [],
  'Personal Branding': [],
  'Retro / Vaporwave': [],
  'Metaverse / VR': [],
  'Fashion / Lifestyle': [],
  'Event / Invitation': [],

  'Digital Art / Illustration': [],
  'Minimal Portfolio': [],
  'Podcast / Audio Branding': [],

  'Luxury / Premium': [],
  'Handmade / Craft': [],
  'Eco / Sustainability': [],

  'AI / Tech': [],

  'Mobile Gaming': [],
  'Web3 Finance': [],
  'Coding / Dev': [],
}

function autoCategorizeFonts(fonts: GoogleFontsResponse['items']) {
  const mapping: Record<string, string[]> = { ...quickSearchCategories }

  fonts.forEach((f) => {
    const family = f.family
    const cat = f.category.toLowerCase()
    const name = family.toLowerCase()

    // Always add to 'all'
    mapping.all.push(family)

    // ===== Main category mapping =====
    switch (cat) {
      case 'display':
        mapping.Display.push(family)
        mapping.Logo.push(family)
        mapping.Poster.push(family)
        mapping.Creative.push(family)
        mapping.Gaming.push(family)
        mapping['Hero Section'].push(family)
        break
      case 'handwriting':
        mapping.Handwriting.push(family)
        mapping['Creative Projects'].push(family)
        mapping.Kids.push(family)
        mapping['Minimal Portfolio'].push(family)
        break
      case 'monospace':
        mapping.Monospace.push(family)
        mapping.Tech.push(family)
        mapping['Coding / Dev'].push(family) // optional new
        break
      case 'serif':
        mapping.Serif.push(family)
        mapping.Classic.push(family)
        mapping.Print.push(family)
        mapping.Magazine.push(family)
        mapping.Education.push(family)
        mapping['Luxury / Premium'].push(family)
        break
      case 'sans-serif':
        mapping['Sans-serif'].push(family)
        mapping.Web.push(family)
        mapping.UI.push(family)
        mapping['Landing Page'].push(family)
        mapping.Corporate.push(family)
        mapping.Business.push(family)
        mapping.Modern.push(family)
        mapping.Minimal.push(family)
        break
      default:
        mapping.Modern.push(family)
        mapping.Creative.push(family)
        break
    }

    // ===== Keyword-based boosts =====
    const boosts: { keys: string[]; categories: string[] }[] = [
      {
        keys: ['logo', 'bebas', 'anton', 'lux', 'gold'],
        categories: ['Logo', 'Branding'],
      },
      {
        keys: ['gaming', 'press', 'game', 'gamer', 'esport', 'stream'],
        categories: [
          'Gaming',
          'Esports / Streaming',
          'Indie Game',
          'Mobile Gaming',
        ],
      },
      { keys: ['blog', 'merriweather', 'news'], categories: ['Blog'] },
      {
        keys: ['portfolio', 'quicksand', 'nunito', 'minimal'],
        categories: ['Portfolio', 'Minimal Portfolio'],
      },
      {
        keys: ['hero', 'playfair', 'poppins', 'raleway'],
        categories: ['Hero Section'],
      },
      {
        keys: ['social', 'pacifico', 'instagram', 'facebook', 'twitter'],
        categories: ['Social Media'],
      },
      {
        keys: ['branding', 'personal'],
        categories: ['Branding', 'Personal Branding'],
      },
      { keys: ['poster', 'impact', 'headline'], categories: ['Poster'] },
      {
        keys: ['creative', 'bangers', 'fredoka', 'art', 'illustration'],
        categories: ['Creative Projects', 'Digital Art / Illustration'],
      },
      { keys: ['education', 'noto', 'libre'], categories: ['Education'] },
      { keys: ['kids', 'baloo', 'comic', 'children'], categories: ['Kids'] },
      { keys: ['corporate', 'lato', 'open sans'], categories: ['Corporate'] },
      {
        keys: ['business', 'work sans', 'ibm plex'],
        categories: ['Business'],
      },
      { keys: ['mobile', 'app'], categories: ['Mobile App'] },
      {
        keys: ['crypto', 'blockchain', 'web3', 'nft', 'pixel', 'collectible'],
        categories: ['Crypto / Blockchain', 'NFT / Web3', 'Web3 Finance'],
      },
      {
        keys: ['futur', 'sci-fi', 'space'],
        categories: ['Futuristic / Sci-Fi'],
      },
      { keys: ['pitch', 'startup'], categories: ['Startup Pitch'] },
      {
        keys: ['podcast', 'audio'],
        categories: ['Podcast / Audio Branding'],
      },
      { keys: ['retro', 'vaporwave'], categories: ['Retro / Vaporwave'] },
      { keys: ['luxury', 'premium'], categories: ['Luxury / Premium'] },
      { keys: ['handmade', 'craft'], categories: ['Handmade / Craft'] },
      { keys: ['eco', 'sustain'], categories: ['Eco / Sustainability'] },
      { keys: ['fashion', 'lifestyle'], categories: ['Fashion / Lifestyle'] },
      { keys: ['event', 'invitation'], categories: ['Event / Invitation'] },
      {
        keys: ['ai', 'machine', 'intelligence', 'robot'],
        categories: ['AI / Tech'],
      },
      {
        keys: ['vr', 'metaverse', 'mixed reality'],
        categories: ['Metaverse / VR'],
      },
      { keys: ['pitch', 'startup'], categories: ['Startup Pitch'] },
      { keys: ['retro', 'vaporwave'], categories: ['Retro / Vaporwave'] },
      {
        keys: ['vr', 'metaverse', 'mixed reality'],
        categories: ['Metaverse / VR'],
      },
      { keys: ['fashion', 'lifestyle'], categories: ['Fashion / Lifestyle'] },
      { keys: ['event', 'invitation'], categories: ['Event / Invitation'] },
    ]

    boosts.forEach((boost) => {
      boost.keys.forEach((k) => {
        if (name.includes(k)) {
          boost.categories.forEach((c) => mapping[c].push(family))
        }
      })
    })
  })

  // ===== Remove duplicates =====
  Object.keys(mapping).forEach((key) => {
    mapping[key] = Array.from(new Set(mapping[key]))
  })

  return mapping
}

export { autoCategorizeFonts, quickSearchCategories }
