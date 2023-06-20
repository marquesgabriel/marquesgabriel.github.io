export type Skill = {
  name: string
  description: string | string[]
}

export type Link = {
  description: string
  type: string
  url: string
}

export type Study = {
  _id: string
  title: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export type Work = {
  _id: string
  title: string
  subTitle: string
  location: string
  startDate: string
  endDate: string | null,
  description: string | null | string[]
}