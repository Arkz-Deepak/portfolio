import { experienceData } from './experience'

export interface TimelineItem {
  id: string
  title: string
  role: string
  period: string
  location?: string
  domain: string
  description: string
  ndaProtected?: boolean
  ndaNotice?: string
  technologies?: string[]
}

export const TIMELINE_DATA: TimelineItem[] = experienceData.map((exp) => ({
  id: exp.id,
  title: exp.company,
  role: exp.role,
  period: exp.period,
  location: exp.location,
  domain: `[ ${exp.domainTag.toUpperCase()} ]`,
  description: exp.responsibilities.join(' '),
  ndaProtected: exp.ndaProtected,
  ndaNotice: exp.ndaNotice,
  technologies: exp.technologies
}))
