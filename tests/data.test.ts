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
    expect(profileData.resumeUrl).toBe('/resume.pdf')
    expect(profileData.resumeViewUrl).toBe('/resume')
  })

  test('skillsData has populated categories and valid skill items', () => {
    expect(skillsData.length).toBeGreaterThanOrEqual(4)
    skillsData.forEach(category => {
      expect(category.category).toBeTruthy()
      expect(category.skills.length).toBeGreaterThan(0)
    })

    const allSkills = skillsData.flatMap(c => c.skills.map(s => s.name))
    expect(allSkills).toContain('PyTorch & Autoencoders')
    expect(allSkills).toContain('Blender OptiX Ray-Tracing')
    expect(allSkills).toContain('TFLite & ONNX Runtime')
    expect(allSkills).toContain('Decentralized Mesh Protocols')
    expect(allSkills).toContain('ConvLSTM / Spatiotemporal Modeling')
    expect(allSkills).toContain('TimeDistributed CNNs')
    expect(allSkills).toContain('ROS 2 CI/CD (GitHub Actions)')
    expect(allSkills).toContain('CentroidRayRoPE Geometric Embeddings')
    expect(allSkills).toContain('STM32 Microcontrollers')
    expect(allSkills).toContain('ESP-NOW & LoRa Mesh OTA')
  })

  test('projectsData contains AutoTwin-AI, WeldGuard-AI, and Vortex Crawler, and excludes purged projects', () => {
    const projectIds = projectsData.map(p => p.id)
    expect(projectIds).not.toContain('sih-space-debris-cleaner')
    expect(projectIds).not.toContain('edgevision-npu-profiler')
    expect(projectIds).not.toContain('project-tara')
    expect(projectIds).not.toContain('twindeo-industrial-digital-twin')
    expect(projectIds).toContain('autotwin-ai')
    expect(projectIds).toContain('weldguard-ai')
    expect(projectIds).toContain('hybrid-vortex-crawler')
    expect(projectIds).toContain('oomwoo-coverage-planner')
    expect(projectIds).toContain('vga-robotic-manipulation')
    expect(projectIds).toContain('tbo-onedesk')

    const tbo = projectsData.find(p => p.id === 'tbo-onedesk')
    expect(tbo?.stats?.length).toBeGreaterThanOrEqual(4)
    expect(tbo?.stack).toContain('FastAPI')
    expect(tbo?.stack).toContain('Finite State Machine')

    const autotwin = projectsData.find(p => p.id === 'autotwin-ai')
    expect(autotwin?.stats?.length).toBeGreaterThanOrEqual(4)
    expect(autotwin?.stack).toContain('Convolutional Autoencoders')
    expect(autotwin?.stack).toContain('Blender Cycles OptiX')
    expect(autotwin?.docsUrl).toContain('lab.deepak-arkz.me')

    const weldguard = projectsData.find(p => p.id === 'weldguard-ai')
    expect(weldguard?.stats?.length).toBeGreaterThanOrEqual(4)
    expect(weldguard?.stack).toContain('Geometric Ellipse Fitting')
    expect(weldguard?.stack).toContain('ConvLSTM')

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

    const vga = researchData.find(r => r.id === 'vga-robotic-manipulation')
    expect(vga?.authors).toContain('Deepak R')
    expect(vga?.pdfUrl).toBe('/papers/VGA_RSS_2027_Manuscript.pdf')

    const neurocode = researchData.find(r => r.id === 'neurocode-framework')
    expect(neurocode?.pdfUrl).toBe('/papers/NeuroCode_JPDC_Manuscript.pdf')
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
