import { profileData } from '@/data/profile'
import { skillsData } from '@/data/skills'
import { projectsData } from '@/data/projects'
import { researchData } from '@/data/research'
import { experienceData } from '@/data/experience'
import { certificationsData } from '@/data/certifications'

describe('Data Store Integrity Tests', () => {
  test('profileData contains valid personal and domain metadata', () => {
    expect(profileData.name).toBe('Deepak R')
    expect(profileData.cgpa).toContain('9.2')
    expect(profileData.email).toBe('deepak121289@outlook.com')
    expect(profileData.socials.portfolio).toBe('https://www.deepak-arkz.me')
    expect(profileData.socials.github).toContain('Arkz-Deepak')
    expect(profileData.socials.linkedin).toContain('robotics-deepak')
  })

  test('skillsData has populated categories and valid skill items', () => {
    expect(skillsData.length).toBeGreaterThanOrEqual(4)
    skillsData.forEach(category => {
      expect(category.category).toBeTruthy()
      expect(category.skills.length).toBeGreaterThan(0)
    })
  })

  test('projectsData contains AutoTwin-AI and Hybrid Vortex Crawler', () => {
    const projectIds = projectsData.map(p => p.id)
    expect(projectIds).toContain('autotwin-ai')
    expect(projectIds).toContain('hybrid-vortex-crawler')
    expect(projectIds).toContain('oomwoo-coverage-planner')
    
    const crawler = projectsData.find(p => p.id === 'hybrid-vortex-crawler')
    expect(crawler?.stats?.length).toBeGreaterThanOrEqual(4)
    expect(crawler?.cadSpecs?.length).toBeGreaterThan(0)
  })

  test('researchData contains Zenodo preprint with valid DOI', () => {
    const preprint = researchData.find(r => r.id === 'traffic-rl-preprint')
    expect(preprint).toBeDefined()
    expect(preprint?.doi).toBe('10.5281/zenodo.20265628')
    expect(preprint?.doiUrl).toContain('10.5281/zenodo.20265628')
    expect(preprint?.citationBibtex).toContain('@article')
  })

  test('experienceData contains all 5 industrial experiences with NDA notices where applicable', () => {
    expect(experienceData.length).toBe(5)
    const wildplant = experienceData.find(e => e.id === 'wildplant')
    expect(wildplant?.ndaProtected).toBe(true)
    expect(wildplant?.technologies).toContain('Three.js')
    
    const precise = experienceData.find(e => e.id === 'precise3dm')
    expect(precise?.technologies).toContain('Gemini API')
  })

  test('certificationsData contains verified technical credentials', () => {
    expect(certificationsData.length).toBeGreaterThanOrEqual(4)
    expect(certificationsData.some(c => c.title.includes('ROS 2'))).toBe(true)
    expect(certificationsData.some(c => c.issuer.includes('IBM'))).toBe(true)
  })
})
