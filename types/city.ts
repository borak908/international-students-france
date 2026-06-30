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

export interface Transport {
  studentPassMonthly: number
  regularPassMonthly: number
  airportConnection: string
  bikeFriendly: boolean
  bikeShareName: string
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
  lastUpdated: string
}
