export interface HeroStat {
  label: string
  value: string
}

export interface Overview {
  studentPopulation: string
  internationalStudentPct: string
  englishProgramsAvailable: boolean
  safetyRating: string
  overallVibe: string
}

export interface Housing {
  studioRentMonthly: number
  sharedRoomMonthly: string
  totalMonthlyBudget: number
  cafAidMonthly: string
  bestNeighborhoods: string[]
}

export interface Universities {
  main: string[]
  grandesEcoles: string[]
  tuitionEUPerYear: number
  tuitionNonEUPerYear: number
  bestFields: string[]
}

export interface Airport {
  name: string
  code: string
  sourceUrl?: string | null
}

export interface Transport {
  studentPassMonthly: number
  regularPassMonthly: number
  airportConnection: string
  bikeFriendly: boolean
  bikeShareName: string
  networkName?: string
  studentPassName?: string
  transitModes?: string
  airports?: Airport[]
}

export interface WorkVisa {
  partTimeHours: string
  studentJobMarket: string
  visaType: string
  internshipScene: string
}

export interface Climate {
  avgSummerTempC: number
  avgWinterTempC: number
  sunshineDaysPerYear: number
  character: string
}

export interface CostBreakdown {
  groceriesMonthly: number
  diningOutAvgMeal: number
  utilitiesMonthly: number
  crousMealPrice?: number | null
}

export interface CityLife {
  climate: Climate
  costBreakdown: CostBreakdown
  cityPopulation: string
  notableStatus: string | null
  languageBarrier: string
}

export interface SchoolRanking {
  school: string
  program: string | null
  rankingType: string
  rank: string
  sourceLabel: string
  sourceUrl: string
  note: string | null
}

export interface FaqItem {
  q: string
  a: string
  sourceUrl?: string | null
  flags?: Record<string, string>
}

export interface Neighborhood {
  name: string
  blurb: string
  studentFriendly?: boolean
  avgRent?: string | null
  avgRentSourceUrl?: string | null
  sourceUrl?: string | null
  flags?: Record<string, string>
}

export interface Distances {
  toParisMins: number | null
  nearestAirport: string
  airportMins: number
}

export interface DistanceEntry {
  destination: string
  timeByTrain: string | null
  timeByCar: string | null
  timeByTransit?: string | null
  sourceUrl: string | null
  flags?: Record<string, string>
}

export interface FieldSource {
  label: string
  url?: string
  retrievedDate: string
  estimated?: boolean
}

export interface City {
  slug: string
  name: string
  country: string
  region: string
  tagline: string
  metaDescription: string
  heroStats: HeroStat[]
  overview: Overview
  housing: Housing
  universities: Universities
  transport: Transport
  workVisa: WorkVisa
  cityLife: CityLife
  rankings?: SchoolRanking[]
  faq?: FaqItem[]
  neighborhoods?: Neighborhood[]
  distances?: Distances
  travelTimes?: DistanceEntry[]
  sources?: { [key: string]: FieldSource | undefined }
  knownFor?: string[]
  localTips?: string[]
  editorNote?: string
  lastUpdated: string
}
