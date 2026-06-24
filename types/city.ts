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

export interface InternationalExperience {
  studentPopulation: string
  internationalStudentPct: string
  englishPrograms: string
  safetyRating: string
  overallVibe: string
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
  internationalExperience: InternationalExperience
}
