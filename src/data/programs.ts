import type { City, CityId, DependencyEdge, Program } from './types'

export const CITIES: Record<CityId, City> = {
  buenosAires: {
    id: 'buenosAires',
    name: { en: 'Buenos Aires', es: 'Buenos Aires' },
    country: 'Argentina',
    coordinates: [-58.38, -34.6],
  },
  saoPaulo: {
    id: 'saoPaulo',
    name: { en: 'São Paulo', es: 'São Paulo' },
    country: 'Brasil',
    coordinates: [-46.63, -23.55],
  },
  mexicoCity: {
    id: 'mexicoCity',
    name: { en: 'Mexico City', es: 'Ciudad de México' },
    country: 'México',
    coordinates: [-99.13, 19.43],
  },
  bogota: {
    id: 'bogota',
    name: { en: 'Bogotá', es: 'Bogotá' },
    country: 'Colombia',
    coordinates: [-74.07, 4.71],
  },
  santiago: {
    id: 'santiago',
    name: { en: 'Santiago', es: 'Santiago' },
    country: 'Chile',
    coordinates: [-70.67, -33.45],
  },
}

export const PROGRAMS: Program[] = [
  // ────────────────────────────── CANOPUS ──────────────────────────────
  {
    id: 'canopus',
    codename: 'CANOPUS',
    domain: { en: 'Workplace Modernization', es: 'Modernización del entorno de trabajo' },
    description: {
      en: 'Device refresh and managed-workplace rollout across five countries — hardware, imaging, endpoint management, and a regional support model, hub in Buenos Aires.',
      es: 'Renovación de dispositivos y despliegue de puesto de trabajo gestionado en cinco países — hardware, imágenes, gestión de endpoints y un modelo de soporte regional, con sede en Buenos Aires.',
    },
    narrative: {
      en: 'Green. Waves 1–2 (AR, CL, CO, MX) are complete and Wave 3 (BR) is staged for late September. Adoption is tracking to 86% by week 12, ahead of the 80% target, and hardware pricing came in under plan. Watch: Brazil customs lead times and champion coverage in smaller sites.',
      es: 'Verde. Las olas 1–2 (AR, CL, CO, MX) están completas y la ola 3 (BR) está preparada para fines de septiembre. La adopción avanza hacia el 86% en la semana 12, por encima de la meta del 80%, y el precio del hardware quedó por debajo del plan. Atención: plazos aduaneros en Brasil y cobertura de embajadores en sitios pequeños.',
    },
    city: 'buenosAires',
    status: 'green',
    methodology: 'hybrid',
    budget: 8_400_000,
    spendToDate: 4_900_000,
    fac: 8_050_000,
    burn: [420_000, 550_000, 680_000, 780_000, 820_000, 850_000, 800_000, 850_000, 800_000, 650_000, 500_000, 350_000],
    actualsThrough: 7,
    phases: [
      { label: { en: 'Plan & design', es: 'Plan y diseño' }, start: 0, end: 1 },
      { label: { en: 'Pilot', es: 'Piloto' }, start: 2, end: 3 },
      { label: { en: 'Rollout waves', es: 'Olas de despliegue' }, start: 4, end: 9 },
      { label: { en: 'Stabilize', es: 'Estabilización' }, start: 10, end: 11 },
    ],
    milestones: [
      {
        id: 'can-m1',
        label: { en: 'Design & standards locked', es: 'Diseño y estándares aprobados' },
        date: '2026-02-27',
        state: 'done',
      },
      {
        id: 'can-m2',
        label: { en: 'Pilot complete — Buenos Aires HQ', es: 'Piloto completo — sede Buenos Aires' },
        date: '2026-04-24',
        state: 'done',
      },
      {
        id: 'can-m3',
        label: { en: 'Wave 1 complete (AR · CL)', es: 'Ola 1 completa (AR · CL)' },
        date: '2026-06-19',
        state: 'done',
      },
      {
        id: 'can-m4',
        label: { en: 'Wave 2 complete (CO · MX)', es: 'Ola 2 completa (CO · MX)' },
        date: '2026-07-24',
        state: 'done',
      },
      {
        id: 'can-m5',
        label: { en: 'Wave 3 complete (BR)', es: 'Ola 3 completa (BR)' },
        date: '2026-09-25',
        state: 'onTrack',
      },
      {
        id: 'can-m6',
        label: { en: 'Managed workplace service live', es: 'Servicio de puesto gestionado en producción' },
        date: '2026-11-20',
        state: 'onTrack',
      },
    ],
    raid: [
      {
        id: 'can-r1',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'Brazil customs clearance may delay Wave 3 device arrival',
          es: 'La aduana de Brasil puede demorar la llegada de equipos de la ola 3',
        },
        owner: 'L. Paredes',
        due: '2026-08-28',
        mitigation: {
          en: 'Shipment split across two entry points; broker engaged; 3-week buffer held in the wave plan.',
          es: 'Envío dividido en dos puntos de entrada; agente aduanero contratado; colchón de 3 semanas en el plan de ola.',
        },
      },
      {
        id: 'can-r2',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'Wave 3 scope creep from Brazil-specific localization asks',
          es: 'Ampliación de alcance en la ola 3 por pedidos de localización para Brasil',
        },
        owner: 'C. O’Donovan',
        due: '2026-09-04',
        mitigation: {
          en: 'Change-control gate at steerco; localization backlog deferred to stabilization phase.',
          es: 'Control de cambios en el comité; backlog de localización diferido a la fase de estabilización.',
        },
      },
      {
        id: 'can-r3',
        type: 'risk',
        severity: 'low',
        title: {
          en: 'Champion attrition in smaller sites weakens floor support',
          es: 'Rotación de embajadores en sitios pequeños debilita el soporte de piso',
        },
        owner: 'F. Olguín',
        due: '2026-09-30',
        mitigation: {
          en: 'Backfill list per site; recognition program renewed for H2.',
          es: 'Lista de reemplazos por sitio; programa de reconocimiento renovado para el segundo semestre.',
        },
      },
      {
        id: 'can-a1',
        type: 'assumption',
        severity: 'low',
        title: {
          en: 'Site networks meet endpoint-management bandwidth baseline',
          es: 'Las redes de sitio cumplen la base de ancho de banda para gestión de endpoints',
        },
        owner: 'R. Kaufmann',
        due: '2026-08-21',
        mitigation: {
          en: 'Validated per wave during readiness checks; MIMOSA uplift covers the two outliers.',
          es: 'Validado por ola en los chequeos de preparación; la mejora de MIMOSA cubre los dos casos fuera de norma.',
        },
      },
      {
        id: 'can-i1',
        type: 'issue',
        severity: 'low',
        title: {
          en: 'Asset-tag mismatches from Wave 1 still reconciling in CMDB',
          es: 'Diferencias de etiquetas de activos de la ola 1 aún en conciliación en la CMDB',
        },
        owner: 'A. Duarte',
        due: '2026-08-14',
        mitigation: {
          en: 'Weekly reconciliation job in place; 92% matched, closure expected mid-August.',
          es: 'Conciliación semanal en marcha; 92% conciliado, cierre previsto a mediados de agosto.',
        },
      },
      {
        id: 'can-d1',
        type: 'dependency',
        severity: 'medium',
        title: {
          en: 'ACRUX needs Wave 2 device-compliance baseline for MFA enforcement',
          es: 'ACRUX necesita la base de cumplimiento de dispositivos de la ola 2 para exigir MFA',
        },
        owner: 'C. O’Donovan',
        due: '2026-08-01',
        mitigation: {
          en: 'Delivered 1 Aug — compliance data feed validated with the ACRUX team.',
          es: 'Entregado el 1 de agosto — flujo de datos de cumplimiento validado con el equipo de ACRUX.',
        },
      },
    ],
    stakeholders: {
      sponsor: 'M. Herrera — VP, Enterprise Technology LATAM',
      owner: 'A. Duarte — Digital Workplace Lead',
      pm: 'C. O’Donovan',
    },
    vendors: [
      {
        name: 'Callao Logística',
        service: { en: 'Device staging & regional logistics', es: 'Preparación de equipos y logística regional' },
        slaBreached: false,
      },
      {
        name: 'Andes Cloud Partners',
        service: { en: 'Endpoint management build & run', es: 'Construcción y operación de gestión de endpoints' },
        slaBreached: false,
      },
    ],
    escalationTier: 1,
    adoption: {
      curve: [4, 9, 16, 24, 33, 42, 51, 59, 67, 74, 81, 86],
      trainingPct: 78,
      champions: 42,
      countries: 5,
      pulse: 4.2,
    },
  },

  // ────────────────────────────── ACRUX ──────────────────────────────
  {
    id: 'acrux',
    codename: 'ACRUX',
    domain: { en: 'Identity & Access Consolidation', es: 'Consolidación de identidad y accesos' },
    description: {
      en: 'Single sign-on and MFA enforcement across regional business units — one identity platform, federated apps, and conditional access tied to device compliance.',
      es: 'Inicio de sesión único y exigencia de MFA en las unidades de negocio regionales — una plataforma de identidad, aplicaciones federadas y acceso condicional ligado al cumplimiento de dispositivos.',
    },
    narrative: {
      en: 'Green. SSO is live with the top-20 apps federated, the corporate MFA pilot closed clean, and the CANOPUS device-compliance gate was validated on 1 August. Enforcement for all business units lands 2 October; the frontline shared-device pattern is the one high risk being worked.',
      es: 'Verde. El SSO está en producción con las 20 aplicaciones principales federadas, el piloto corporativo de MFA cerró sin incidencias y la validación del control de cumplimiento de dispositivos de CANOPUS se completó el 1 de agosto. La exigencia para todas las unidades llega el 2 de octubre; el patrón de dispositivos compartidos de primera línea es el único riesgo alto en gestión.',
    },
    city: 'mexicoCity',
    status: 'green',
    methodology: 'agile',
    budget: 3_200_000,
    spendToDate: 1_900_000,
    fac: 3_020_000,
    burn: [180_000, 220_000, 260_000, 300_000, 320_000, 320_000, 300_000, 300_000, 280_000, 240_000, 180_000, 120_000],
    actualsThrough: 7,
    sprintWeeks: 2,
    milestones: [
      {
        id: 'acr-m1',
        label: { en: 'SSO platform live', es: 'Plataforma SSO en producción' },
        date: '2026-03-13',
        state: 'done',
      },
      {
        id: 'acr-m2',
        label: { en: 'Top-20 apps federated', es: '20 aplicaciones principales federadas' },
        date: '2026-05-15',
        state: 'done',
      },
      {
        id: 'acr-m3',
        label: { en: 'MFA pilot — corporate users', es: 'Piloto de MFA — usuarios corporativos' },
        date: '2026-07-10',
        state: 'done',
      },
      {
        id: 'acr-m4',
        label: {
          en: 'Device-compliance gate validated (CANOPUS)',
          es: 'Control de cumplimiento de dispositivos validado (CANOPUS)',
        },
        date: '2026-08-01',
        state: 'done',
      },
      {
        id: 'acr-m5',
        label: { en: 'MFA enforcement — all business units', es: 'Exigencia de MFA — todas las unidades' },
        date: '2026-10-02',
        state: 'onTrack',
      },
      {
        id: 'acr-m6',
        label: { en: 'Legacy IdP decommissioned', es: 'IdP heredado dado de baja' },
        date: '2026-12-04',
        state: 'onTrack',
      },
    ],
    raid: [
      {
        id: 'acr-r1',
        type: 'risk',
        severity: 'high',
        title: {
          en: 'MFA enforcement could lock out frontline shared-device users',
          es: 'La exigencia de MFA podría bloquear a usuarios de dispositivos compartidos de primera línea',
        },
        owner: 'J. Salcedo',
        due: '2026-10-02',
        mitigation: {
          en: 'Shared-device sign-in pattern in pilot at two sites; FIDO keys budgeted for kiosks; staged enforcement by unit.',
          es: 'Patrón de inicio de sesión para dispositivos compartidos en piloto en dos sitios; llaves FIDO presupuestadas para kioscos; exigencia escalonada por unidad.',
        },
      },
      {
        id: 'acr-r2',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'Helpdesk surge in the first two weeks of enforcement',
          es: 'Pico de tickets en la mesa de ayuda en las dos primeras semanas de exigencia',
        },
        owner: 'P. Aristizábal',
        due: '2026-10-02',
        mitigation: {
          en: 'ATRIA desk pre-briefed with scripted flows; self-service reset promoted in comms two weeks ahead.',
          es: 'Mesa de ATRIA preparada con guiones; restablecimiento autoservicio difundido en comunicaciones con dos semanas de anticipación.',
        },
      },
      {
        id: 'acr-r3',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'Three legacy apps lack modern SAML/OIDC support',
          es: 'Tres aplicaciones heredadas carecen de soporte moderno de SAML/OIDC',
        },
        owner: 'J. Salcedo',
        due: '2026-11-06',
        mitigation: {
          en: 'Header-based gateway pattern approved; owners committed to retire one app by November.',
          es: 'Patrón de gateway por cabeceras aprobado; los dueños se comprometieron a retirar una aplicación en noviembre.',
        },
      },
      {
        id: 'acr-a1',
        type: 'assumption',
        severity: 'low',
        title: {
          en: 'Business units complete access reviews before enforcement',
          es: 'Las unidades completan las revisiones de acceso antes de la exigencia',
        },
        owner: 'P. Aristizábal',
        due: '2026-09-18',
        mitigation: {
          en: 'Weekly completion tracking; two lagging units escalated to sponsors 28 July.',
          es: 'Seguimiento semanal de avance; dos unidades rezagadas escaladas a patrocinadores el 28 de julio.',
        },
      },
      {
        id: 'acr-d1',
        type: 'dependency',
        severity: 'medium',
        title: {
          en: 'HADAR consolidation waits on SSO for the collaboration platform',
          es: 'La consolidación de HADAR espera el SSO para la plataforma de colaboración',
        },
        owner: 'C. O’Donovan',
        due: '2026-07-10',
        mitigation: {
          en: 'Delivered 10 July — HADAR tenants federated in production.',
          es: 'Entregado el 10 de julio — tenants de HADAR federados en producción.',
        },
      },
    ],
    stakeholders: {
      sponsor: 'R. Kaufmann — Regional CISO',
      owner: 'J. Salcedo — Identity Platform Owner',
      pm: 'C. O’Donovan',
    },
    vendors: [
      {
        name: 'Copérnica IT',
        service: { en: 'Identity integration factory', es: 'Fábrica de integración de identidad' },
        slaBreached: false,
      },
    ],
    escalationTier: 1,
  },

  // ────────────────────────────── ANTARES ──────────────────────────────
  {
    id: 'antares',
    codename: 'ANTARES',
    domain: { en: 'Cloud Migration — Wave 2', es: 'Migración a la nube — Ola 2' },
    description: {
      en: 'Regional data-center exit to cloud: 300 workloads across two waves, with the São Paulo facility contract ending in Q1 2027.',
      es: 'Salida del centro de datos regional hacia la nube: 300 cargas de trabajo en dos olas, con el contrato de la instalación de São Paulo venciendo en el primer trimestre de 2027.',
    },
    narrative: {
      en: 'Red. Wave 2 migration is blocked: the high-capacity replication link for São Paulo — a MIMOSA deliverable — slipped three weeks on the carrier side, compressing the migration window against the fixed facility-exit date. Escalated to Program Steerco on 24 July with a written recovery plan: re-sequence non-São Paulo workloads now, and approve a secondary carrier (+$180K) to recover two weeks. With the decision this week, the December exit date holds.',
      es: 'Rojo. La migración de la ola 2 está bloqueada: el enlace de replicación de alta capacidad para São Paulo — un entregable de MIMOSA — se corrió tres semanas por el operador, comprimiendo la ventana de migración contra la fecha fija de salida de la instalación. Escalado al comité del programa el 24 de julio con un plan de recuperación por escrito: re-secuenciar ahora las cargas fuera de São Paulo y aprobar un operador secundario (+$180K) para recuperar dos semanas. Con la decisión esta semana, la fecha de salida de diciembre se mantiene.',
    },
    city: 'saoPaulo',
    status: 'red',
    methodology: 'agile',
    budget: 14_200_000,
    spendToDate: 7_600_000,
    fac: 14_500_000,
    burn: [800_000, 950_000, 1_100_000, 1_200_000, 1_250_000, 1_200_000, 1_100_000, 1_050_000, 1_350_000, 1_550_000, 1_600_000, 1_350_000],
    actualsThrough: 7,
    sprintWeeks: 2,
    milestones: [
      {
        id: 'ant-m1',
        label: { en: 'Landing zone hardened', es: 'Landing zone reforzada' },
        date: '2026-02-13',
        state: 'done',
      },
      {
        id: 'ant-m2',
        label: { en: 'Wave 1 — 120 workloads migrated', es: 'Ola 1 — 120 cargas migradas' },
        date: '2026-04-17',
        state: 'done',
      },
      {
        id: 'ant-m3',
        label: { en: 'Wave 2 readiness review', es: 'Revisión de preparación de la ola 2' },
        date: '2026-06-26',
        state: 'done',
      },
      {
        id: 'ant-m4',
        label: { en: 'São Paulo replication link live', es: 'Enlace de replicación de São Paulo activo' },
        date: '2026-08-14',
        state: 'atRisk',
      },
      {
        id: 'ant-m5',
        label: { en: 'Wave 2 — 180 workloads migrated', es: 'Ola 2 — 180 cargas migradas' },
        date: '2026-11-13',
        state: 'atRisk',
      },
      {
        id: 'ant-m6',
        label: { en: 'Data-center exit complete', es: 'Salida del centro de datos completa' },
        date: '2026-12-18',
        state: 'onTrack',
      },
    ],
    raid: [
      {
        id: 'ant-r1',
        type: 'risk',
        severity: 'high',
        title: {
          en: 'Replication-link delay compresses the Wave 2 window against the facility exit date',
          es: 'La demora del enlace de replicación comprime la ventana de la ola 2 contra la fecha de salida de la instalación',
        },
        owner: 'C. O’Donovan',
        due: '2026-08-12',
        mitigation: {
          en: 'Recovery plan at steerco: re-sequenced backlog starts non-SP workloads now; secondary-carrier decision recovers 2 of 3 weeks.',
          es: 'Plan de recuperación en el comité: el backlog re-secuenciado arranca ya con cargas fuera de SP; la decisión del operador secundario recupera 2 de 3 semanas.',
        },
      },
      {
        id: 'ant-r2',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'Cloud egress and dual-running costs above model during compressed cutover',
          es: 'Costos de egreso y operación en paralelo por encima del modelo durante el cambio comprimido',
        },
        owner: 'D. Montoya',
        due: '2026-10-09',
        mitigation: {
          en: 'FinOps review weekly during Wave 2; $300K contingency drawn into FAC; egress-heavy workloads batched.',
          es: 'Revisión FinOps semanal durante la ola 2; contingencia de $300K incorporada al pronóstico; cargas con alto egreso agrupadas.',
        },
      },
      {
        id: 'ant-r3',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'Undocumented interdependencies among legacy Wave 2 workloads',
          es: 'Interdependencias no documentadas entre cargas heredadas de la ola 2',
        },
        owner: 'S. Ferreyra',
        due: '2026-09-04',
        mitigation: {
          en: 'Dependency-mapping tooling run on all 180 workloads; move groups locked two sprints ahead.',
          es: 'Mapeo de dependencias ejecutado sobre las 180 cargas; grupos de migración cerrados con dos sprints de anticipación.',
        },
      },
      {
        id: 'ant-i1',
        type: 'issue',
        severity: 'high',
        title: {
          en: 'ESCALATION — São Paulo replication circuit not delivered; Wave 2 start blocked',
          es: 'ESCALAMIENTO — Circuito de replicación de São Paulo no entregado; inicio de la ola 2 bloqueado',
        },
        owner: 'C. O’Donovan',
        due: '2026-08-12',
        mitigation: {
          en: 'At Program Steerco (tier 2) since 24 July. Ask: approve secondary carrier +$180K → recovers 2 weeks; decision due 12 August.',
          es: 'En el comité del programa (nivel 2) desde el 24 de julio. Solicitud: aprobar operador secundario +$180K → recupera 2 semanas; decisión antes del 12 de agosto.',
        },
      },
      {
        id: 'ant-d1',
        type: 'dependency',
        severity: 'high',
        title: {
          en: 'MIMOSA São Paulo circuit is the Wave 2 critical path',
          es: 'El circuito de São Paulo de MIMOSA es la ruta crítica de la ola 2',
        },
        owner: 'V. Linares',
        due: '2026-08-21',
        mitigation: {
          en: 'Joint daily standup with MIMOSA until link is live; shared burndown reviewed at steerco.',
          es: 'Reunión diaria conjunta con MIMOSA hasta activar el enlace; burndown compartido revisado en el comité.',
        },
      },
      {
        id: 'ant-a1',
        type: 'assumption',
        severity: 'low',
        title: {
          en: 'Facility exit date (Q1 2027 contract end) will not move',
          es: 'La fecha de salida de la instalación (fin de contrato en Q1 2027) no se moverá',
        },
        owner: 'D. Montoya',
        due: '2026-09-30',
        mitigation: {
          en: 'Treated as fixed; a paid extension quote requested as a last-resort fallback only.',
          es: 'Se considera fija; se pidió cotización de extensión paga solo como último recurso.',
        },
      },
    ],
    stakeholders: {
      sponsor: 'M. Herrera — VP, Enterprise Technology LATAM',
      owner: 'S. Ferreyra — Cloud Platform Owner',
      pm: 'C. O’Donovan',
    },
    vendors: [
      {
        name: 'Andes Cloud Partners',
        service: { en: 'Migration factory', es: 'Fábrica de migración' },
        slaBreached: false,
      },
      {
        name: 'Horizonte Sur Datacenters',
        service: { en: 'Facility exit & decommissioning', es: 'Salida y desmantelamiento de la instalación' },
        slaBreached: false,
      },
    ],
    escalationTier: 2,
  },

  // ────────────────────────────── MIMOSA ──────────────────────────────
  {
    id: 'mimosa',
    codename: 'MIMOSA',
    domain: { en: 'Network & Connectivity Uplift', es: 'Mejora de red y conectividad' },
    description: {
      en: 'New carrier circuits and SD-WAN across twelve regional offices — capacity for cloud migration and modern workplace traffic, with local-breakout security.',
      es: 'Nuevos circuitos de operador y SD-WAN en doce oficinas regionales — capacidad para la migración a la nube y el tráfico del nuevo entorno de trabajo, con seguridad de salida local.',
    },
    narrative: {
      en: 'Amber. Ten of twelve sites are on plan and the SD-WAN overlay is performing above baseline. The São Paulo high-capacity circuit slipped three weeks — carrier SLA breached — and it carries the ANTARES Wave 2 critical path. Recovery options are costed; the secondary-carrier decision is at steering this week.',
      es: 'Ámbar. Diez de doce sitios avanzan según el plan y la superposición SD-WAN rinde por encima de la línea base. El circuito de alta capacidad de São Paulo se corrió tres semanas — SLA del operador incumplido — y sostiene la ruta crítica de la ola 2 de ANTARES. Las opciones de recuperación están costeadas; la decisión del operador secundario está en el comité esta semana.',
    },
    city: 'santiago',
    status: 'amber',
    methodology: 'waterfall',
    budget: 5_600_000,
    spendToDate: 3_100_000,
    fac: 5_500_000,
    burn: [300_000, 380_000, 450_000, 500_000, 520_000, 500_000, 450_000, 480_000, 550_000, 550_000, 450_000, 370_000],
    actualsThrough: 7,
    phases: [
      { label: { en: 'Design', es: 'Diseño' }, start: 0, end: 2 },
      { label: { en: 'Procurement', es: 'Adquisiciones' }, start: 1, end: 4 },
      { label: { en: 'Deploy', es: 'Despliegue' }, start: 5, end: 10 },
      { label: { en: 'Handover', es: 'Transferencia' }, start: 11, end: 11 },
    ],
    milestones: [
      {
        id: 'mim-m1',
        label: { en: 'Network design approved', es: 'Diseño de red aprobado' },
        date: '2026-03-06',
        state: 'done',
      },
      {
        id: 'mim-m2',
        label: { en: 'Circuit orders placed — 12 sites', es: 'Órdenes de circuitos emitidas — 12 sitios' },
        date: '2026-05-08',
        state: 'done',
      },
      {
        id: 'mim-m3',
        label: { en: 'Pilot sites cut over (Santiago · BA)', es: 'Sitios piloto migrados (Santiago · BA)' },
        date: '2026-07-03',
        state: 'done',
      },
      {
        id: 'mim-m4',
        label: { en: 'Mexico City site cutover', es: 'Migración del sitio de Ciudad de México' },
        date: '2026-07-24',
        state: 'done',
      },
      {
        id: 'mim-m5',
        label: { en: 'São Paulo circuit delivered', es: 'Circuito de São Paulo entregado' },
        date: '2026-08-21',
        state: 'atRisk',
      },
      {
        id: 'mim-m6',
        label: { en: 'All sites cut over', es: 'Todos los sitios migrados' },
        date: '2026-11-13',
        state: 'onTrack',
      },
    ],
    raid: [
      {
        id: 'mim-r1',
        type: 'risk',
        severity: 'high',
        title: {
          en: 'Carrier delivery risk recurs at the three remaining metro sites',
          es: 'El riesgo de entrega del operador se repite en los tres sitios metropolitanos restantes',
        },
        owner: 'V. Linares',
        due: '2026-09-18',
        mitigation: {
          en: 'Weekly carrier delivery reviews with penalties enforced; secondary-carrier quotes pre-approved for the three sites.',
          es: 'Revisiones semanales de entrega con penalidades aplicadas; cotizaciones de operador secundario preaprobadas para los tres sitios.',
        },
      },
      {
        id: 'mim-r2',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'Building-access permits could slow overnight cutovers',
          es: 'Los permisos de acceso a edificios podrían demorar los cambios nocturnos',
        },
        owner: 'G. Antúnez',
        due: '2026-09-04',
        mitigation: {
          en: 'Permits requested 6 weeks ahead per site; landlord contact list maintained with facilities.',
          es: 'Permisos solicitados con 6 semanas de anticipación por sitio; lista de contactos de propietarios mantenida con facilities.',
        },
      },
      {
        id: 'mim-r3',
        type: 'risk',
        severity: 'low',
        title: {
          en: 'Edge-device lead times tighten in Q4',
          es: 'Los plazos de entrega de equipos de borde se ajustan en el cuarto trimestre',
        },
        owner: 'G. Antúnez',
        due: '2026-10-02',
        mitigation: {
          en: 'Remaining hardware ordered in July; spares pool covers first failures.',
          es: 'Hardware restante pedido en julio; el stock de repuestos cubre las primeras fallas.',
        },
      },
      {
        id: 'mim-i1',
        type: 'issue',
        severity: 'high',
        title: {
          en: 'Meridian Redes missed the São Paulo circuit date — SLA breached by 3 weeks',
          es: 'Meridian Redes incumplió la fecha del circuito de São Paulo — SLA excedido por 3 semanas',
        },
        owner: 'V. Linares',
        due: '2026-08-21',
        mitigation: {
          en: 'Penalty clause invoked; executive review with carrier held 28 July; secondary-carrier option costed at +$180K, at steering 12 Aug.',
          es: 'Cláusula de penalidad invocada; revisión ejecutiva con el operador el 28 de julio; opción de operador secundario costeada en +$180K, en el comité el 12 de agosto.',
        },
      },
      {
        id: 'mim-d1',
        type: 'dependency',
        severity: 'high',
        title: {
          en: 'ANTARES Wave 2 start depends on the São Paulo circuit',
          es: 'El inicio de la ola 2 de ANTARES depende del circuito de São Paulo',
        },
        owner: 'C. O’Donovan',
        due: '2026-08-21',
        mitigation: {
          en: 'Joint daily standup with ANTARES; link-live to migration-start handoff rehearsed.',
          es: 'Reunión diaria conjunta con ANTARES; ensayada la transición de enlace activo a inicio de migración.',
        },
      },
      {
        id: 'mim-a1',
        type: 'assumption',
        severity: 'low',
        title: {
          en: 'Existing circuits stay stable until each site cutover',
          es: 'Los circuitos actuales permanecen estables hasta el cambio de cada sitio',
        },
        owner: 'V. Linares',
        due: '2026-11-13',
        mitigation: {
          en: 'Monitoring thresholds tightened; rollback runbook per site.',
          es: 'Umbrales de monitoreo ajustados; runbook de reversión por sitio.',
        },
      },
    ],
    stakeholders: {
      sponsor: 'R. Kaufmann — Regional CISO',
      owner: 'V. Linares — Network Services Owner',
      pm: 'C. O’Donovan',
    },
    vendors: [
      {
        name: 'Meridian Redes',
        service: { en: 'Carrier circuits — primary', es: 'Circuitos de operador — primario' },
        slaBreached: true,
        slaNote: {
          en: 'São Paulo delivery 3 weeks late; penalties invoked 28 July.',
          es: 'Entrega de São Paulo con 3 semanas de atraso; penalidades invocadas el 28 de julio.',
        },
      },
      {
        name: 'NodoUno Ingeniería',
        service: { en: 'SD-WAN field deployment', es: 'Despliegue de SD-WAN en campo' },
        slaBreached: false,
      },
    ],
    escalationTier: 1,
  },

  // ────────────────────────────── HADAR ──────────────────────────────
  {
    id: 'hadar',
    codename: 'HADAR',
    domain: { en: 'Collaboration Platform Unification', es: 'Unificación de la plataforma de colaboración' },
    description: {
      en: 'One collaboration platform and a single meeting-room AV standard across the region — consolidating three legacy tools and 118 rooms.',
      es: 'Una sola plataforma de colaboración y un estándar único de audio y video para salas en la región — consolidando tres herramientas heredadas y 118 salas.',
    },
    narrative: {
      en: 'Green. SSO landed via ACRUX on 10 July and Room Standard v1 published on 31 July, closing the design phase. Migration runs by floor from September; the platform sunset narrative is agreed with the three tool owners. Watch: AV hardware supply for Q4 room builds.',
      es: 'Verde. El SSO llegó vía ACRUX el 10 de julio y el Estándar de Salas v1 se publicó el 31 de julio, cerrando la fase de diseño. La migración avanza por piso desde septiembre; la baja de plataformas está acordada con los dueños de las tres herramientas. Atención: suministro de hardware AV para las salas del cuarto trimestre.',
    },
    city: 'buenosAires',
    status: 'green',
    methodology: 'hybrid',
    budget: 2_100_000,
    spendToDate: 1_000_000,
    fac: 1_950_000,
    burn: [80_000, 110_000, 140_000, 160_000, 170_000, 180_000, 160_000, 200_000, 220_000, 210_000, 180_000, 140_000],
    actualsThrough: 7,
    phases: [
      { label: { en: 'Assess & select', es: 'Evaluación y selección' }, start: 0, end: 2 },
      { label: { en: 'Design & pilot', es: 'Diseño y piloto' }, start: 3, end: 6 },
      { label: { en: 'Migrate by floor', es: 'Migración por piso' }, start: 7, end: 10 },
      { label: { en: 'Sunset legacy', es: 'Baja de sistemas heredados' }, start: 11, end: 11 },
    ],
    milestones: [
      {
        id: 'had-m1',
        label: { en: 'Platform decision & licensing', es: 'Decisión de plataforma y licenciamiento' },
        date: '2026-04-10',
        state: 'done',
      },
      {
        id: 'had-m2',
        label: { en: 'Pilot rooms live — Buenos Aires', es: 'Salas piloto activas — Buenos Aires' },
        date: '2026-06-12',
        state: 'done',
      },
      {
        id: 'had-m3',
        label: { en: 'SSO integration via ACRUX', es: 'Integración de SSO vía ACRUX' },
        date: '2026-07-10',
        state: 'done',
      },
      {
        id: 'had-m4',
        label: { en: 'Room Standard v1 published', es: 'Estándar de Salas v1 publicado' },
        date: '2026-07-31',
        state: 'done',
      },
      {
        id: 'had-m5',
        label: { en: '50% of rooms migrated', es: '50% de las salas migradas' },
        date: '2026-10-16',
        state: 'onTrack',
      },
      {
        id: 'had-m6',
        label: { en: 'Legacy platforms sunset', es: 'Plataformas heredadas dadas de baja' },
        date: '2026-12-11',
        state: 'onTrack',
      },
    ],
    raid: [
      {
        id: 'had-r1',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'AV hardware supply for Q4 room builds',
          es: 'Suministro de hardware AV para salas del cuarto trimestre',
        },
        owner: 'B. Quiñones',
        due: '2026-09-11',
        mitigation: {
          en: 'Q4 kit ordered in August; two alternate SKUs certified against the room standard.',
          es: 'Kits del cuarto trimestre pedidos en agosto; dos modelos alternativos certificados contra el estándar de salas.',
        },
      },
      {
        id: 'had-a1',
        type: 'assumption',
        severity: 'low',
        title: {
          en: 'Legacy tool contracts allow December termination',
          es: 'Los contratos de herramientas heredadas permiten la terminación en diciembre',
        },
        owner: 'N. Bravo',
        due: '2026-10-30',
        mitigation: {
          en: 'Notice periods confirmed with procurement for two of three; third under review.',
          es: 'Plazos de aviso confirmados con compras para dos de tres; el tercero en revisión.',
        },
      },
      {
        id: 'had-i1',
        type: 'issue',
        severity: 'low',
        title: {
          en: 'Recording-retention policy mismatch between legacy tools',
          es: 'Diferencias de política de retención de grabaciones entre herramientas heredadas',
        },
        owner: 'N. Bravo',
        due: '2026-08-28',
        mitigation: {
          en: 'Legal review scheduled; interim rule applied — retain-all until harmonized.',
          es: 'Revisión legal agendada; regla provisoria aplicada — retener todo hasta armonizar.',
        },
      },
      {
        id: 'had-d1',
        type: 'dependency',
        severity: 'medium',
        title: {
          en: 'ATRIA service desk needs the platform chat module for support workflows',
          es: 'La mesa de servicio de ATRIA necesita el módulo de chat de la plataforma para sus flujos de soporte',
        },
        owner: 'C. O’Donovan',
        due: '2026-09-25',
        mitigation: {
          en: 'Chat module in the September migration wave; joint test plan agreed with ATRIA.',
          es: 'Módulo de chat en la ola de migración de septiembre; plan de pruebas conjunto acordado con ATRIA.',
        },
      },
    ],
    stakeholders: {
      sponsor: 'L. Paredes — Regional CIO Office',
      owner: 'B. Quiñones — Collaboration Services Owner',
      pm: 'C. O’Donovan',
    },
    vendors: [
      {
        name: 'Ríoplata AV',
        service: { en: 'Meeting-room integration', es: 'Integración de salas de reunión' },
        slaBreached: false,
      },
    ],
    escalationTier: 1,
  },

  // ────────────────────────────── ATRIA ──────────────────────────────
  {
    id: 'atria',
    codename: 'ATRIA',
    domain: { en: 'Service Experience Transformation', es: 'Transformación de la experiencia de servicio' },
    description: {
      en: 'Service-desk modernization on a new ITSM platform, managed to experience-level agreements (XLAs) instead of ticket counts.',
      es: 'Modernización de la mesa de servicio sobre una nueva plataforma ITSM, gestionada por acuerdos de nivel de experiencia (XLA) en lugar de volúmenes de tickets.',
    },
    narrative: {
      en: 'Green. The platform has been live since March, XLA baselines published in May, and the DMAIC cycle on onsite support cut ticket MTTR 34% — from 6.1 to 4.0 days — with the control phase running since 29 July. Self-service portal v2 lands in October.',
      es: 'Verde. La plataforma está en producción desde marzo, las líneas base de XLA se publicaron en mayo y el ciclo DMAIC sobre el soporte en sitio redujo el MTTR de tickets un 34% — de 6.1 a 4.0 días — con la fase de control activa desde el 29 de julio. El portal de autoservicio v2 llega en octubre.',
    },
    city: 'bogota',
    status: 'green',
    methodology: 'agile',
    budget: 1_800_000,
    spendToDate: 1_100_000,
    fac: 1_650_000,
    burn: [120_000, 140_000, 160_000, 170_000, 170_000, 180_000, 160_000, 140_000, 130_000, 110_000, 90_000, 80_000],
    actualsThrough: 7,
    sprintWeeks: 2,
    milestones: [
      {
        id: 'atr-m1',
        label: { en: 'ITSM platform live', es: 'Plataforma ITSM en producción' },
        date: '2026-03-20',
        state: 'done',
      },
      {
        id: 'atr-m2',
        label: { en: 'XLA baseline published', es: 'Línea base de XLA publicada' },
        date: '2026-05-22',
        state: 'done',
      },
      {
        id: 'atr-m3',
        label: { en: 'Skill-based routing live', es: 'Enrutamiento por competencias activo' },
        date: '2026-07-08',
        state: 'done',
      },
      {
        id: 'atr-m4',
        label: { en: 'DMAIC control phase started', es: 'Fase de control DMAIC iniciada' },
        date: '2026-07-29',
        state: 'done',
      },
      {
        id: 'atr-m5',
        label: { en: 'Self-service portal v2', es: 'Portal de autoservicio v2' },
        date: '2026-10-09',
        state: 'onTrack',
      },
      {
        id: 'atr-m6',
        label: {
          en: 'XLA targets met two consecutive quarters',
          es: 'Metas XLA cumplidas dos trimestres consecutivos',
        },
        date: '2026-12-04',
        state: 'onTrack',
      },
    ],
    raid: [
      {
        id: 'atr-r1',
        type: 'risk',
        severity: 'medium',
        title: {
          en: 'XLA telemetry quality varies across countries',
          es: 'La calidad de la telemetría XLA varía entre países',
        },
        owner: 'K. Ibáñez',
        due: '2026-09-25',
        mitigation: {
          en: 'Data-quality scorecard per country; two collectors re-instrumented in August.',
          es: 'Tablero de calidad de datos por país; dos recolectores re-instrumentados en agosto.',
        },
      },
      {
        id: 'atr-a1',
        type: 'assumption',
        severity: 'low',
        title: {
          en: 'Agent headcount stays flat through the transformation',
          es: 'La dotación de agentes se mantiene estable durante la transformación',
        },
        owner: 'K. Ibáñez',
        due: '2026-12-04',
        mitigation: {
          en: 'Efficiency gains absorbed as improved response, not headcount reduction — agreed with sponsors.',
          es: 'Las eficiencias se absorben como mejor respuesta, no como reducción de dotación — acordado con los patrocinadores.',
        },
      },
      {
        id: 'atr-i1',
        type: 'issue',
        severity: 'low',
        title: {
          en: 'Legacy ticket history import has 4% unmatched categories',
          es: 'La importación del histórico de tickets tiene 4% de categorías sin coincidencia',
        },
        owner: 'H. Ocampo',
        due: '2026-08-21',
        mitigation: {
          en: 'Mapping table extended; remainder reclassified by rule during quiet hours.',
          es: 'Tabla de mapeo ampliada; el resto se reclasifica por regla en horarios de baja carga.',
        },
      },
      {
        id: 'atr-d1',
        type: 'dependency',
        severity: 'medium',
        title: {
          en: 'Support chat workflows depend on the HADAR platform chat module',
          es: 'Los flujos de chat de soporte dependen del módulo de chat de la plataforma HADAR',
        },
        owner: 'C. O’Donovan',
        due: '2026-09-25',
        mitigation: {
          en: 'Joint test plan with HADAR; fallback keeps web chat on the current tool until November.',
          es: 'Plan de pruebas conjunto con HADAR; el plan alternativo mantiene el chat web en la herramienta actual hasta noviembre.',
        },
      },
    ],
    stakeholders: {
      sponsor: 'L. Paredes — Regional CIO Office',
      owner: 'K. Ibáñez — Service Experience Owner',
      pm: 'C. O’Donovan',
    },
    vendors: [
      {
        name: 'Austral Serviceworks',
        service: { en: 'ITSM implementation & XLA analytics', es: 'Implementación ITSM y analítica XLA' },
        slaBreached: false,
      },
    ],
    escalationTier: 1,
    improvement: {
      series: [6.3, 5.9, 6.4, 6.0, 6.2, 5.8, 6.1, 6.0, 5.2, 4.6, 4.2, 3.9, 4.1, 3.8, 4.0, 3.9],
      interventionWeek: 8,
      beforeDays: 6.1,
      afterDays: 4.0,
      reductionPct: 34,
    },
  },
]

export const DEPENDENCIES: DependencyEdge[] = [
  {
    from: 'canopus',
    to: 'acrux',
    label: {
      en: 'Device-compliance baseline before MFA enforcement',
      es: 'Base de cumplimiento de dispositivos antes de exigir MFA',
    },
  },
  {
    from: 'mimosa',
    to: 'antares',
    critical: true,
    label: {
      en: 'São Paulo circuit gates Wave 2 migration',
      es: 'El circuito de São Paulo condiciona la migración de la ola 2',
    },
  },
  {
    from: 'acrux',
    to: 'hadar',
    label: {
      en: 'SSO before platform consolidation',
      es: 'SSO antes de consolidar la plataforma',
    },
  },
  {
    from: 'hadar',
    to: 'atria',
    label: {
      en: 'Platform chat module for support workflows',
      es: 'Módulo de chat de la plataforma para flujos de soporte',
    },
  },
]

export const PROGRAM_BY_ID = Object.fromEntries(PROGRAMS.map((p) => [p.id, p])) as Record<
  Program['id'],
  Program
>
