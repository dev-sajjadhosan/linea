import TooltipBtn from '@/components/custom/Tooltipbtn'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Key } from 'lucide-react'
import { toast } from 'sonner'

const exampleQueries = [
  'minimalist architecture firm, sophisticated and spacious, for high-end clients',
  'cozy coffee shop, rustic and authentic, for urban creatives',
  'innovative fintech app, secure and modern, for professionals',
  'sustainable eco-brand, natural and trustworthy, for conscious consumers',
  'wedding photography portfolio, elegant and timeless, for engaged couples',
  'modern jewelry store, luxurious and delicate, for affluent shoppers',
  'tech blog, clean and readable, for developers and IT pros',
  'adventure travel agency, bold and exciting, for thrill-seekers',
  'kids educational app, playful and friendly, for children and parents',
  'craft brewery, bold and traditional, for beer enthusiasts',
  'corporate consulting, authoritative and stable, for executives',
  'yoga studio, serene and organic, for wellness seekers',
  'gaming hardware brand, aggressive and futuristic, for hardcore gamers',
  'local bookstore, literary and classic, for community readers',
  'digital marketing agency, creative and bold, for startup founders',
  'medical website, clean and trustworthy, for patients',
  'artisan pizza restaurant, handmade and energetic, for foodies',
  'non-profit organization, compassionate and strong, for donors and volunteers',
  'fashion blog, trendy and stylish, for young adults',
  'music festival, edgy and loud, for young concert-goers',
  'real estate agency, established and reliable, for homeowners',
  'productivity app, simple and functional, for professionals',
  'vintage clothing store, nostalgic and unique, for fashion lovers',
  'podcast website, conversational and modern, for listeners',
  'luxury car dealership, sleek and powerful, for affluent buyers',
]

export default function PreKeywords({
  setSearch,
  search,
}: {
  setSearch: (search: string) => void
  search: string
}) {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <TooltipBtn label="Keywords" icon={<Key />} />
        </PopoverTrigger>
        <PopoverContent className="w-xl! p-5 mt-5" side='bottom'>
          <h3 className="text-lg font-light">Example Keywords</h3>
          <ul className="mt-2.5 space-y-2 overflow-y-scroll h-[50vh] pr-3">
            {exampleQueries.map((query, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearch(query)
                  toast.success('Search keyword set')
                }}
                className={`text-sm text-gray-300 px-3 rounded-md py-2.5 capitalize cursor-copy duration-200 border  hover:bg-zinc-900 ${
                  query === search ? 'bg-orange-700/25' : 'bg-zinc-800'
                }
                    `}
              >
                {query}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}
