import type { Bi } from '../i18n'
import type { ProgramId } from './types'

/**
 * Pre-authored status drafts for the Composer.
 * 6 programs × 2 audiences × 2 rotating variants = 24 texts, each EN + ES.
 * The Composer simulates AI generation with these for reliability (disclosed in About).
 */
export interface StatusDraft {
  headline: Bi
  wins: Bi[]
  watch: Bi[]
  ask: Bi
  next: Bi
}

type Drafts = { exec: [StatusDraft, StatusDraft]; team: [StatusDraft, StatusDraft] }

export const STATUS_TEXTS: Record<ProgramId, Drafts> = {
  // ────────────────────────────── CANOPUS ──────────────────────────────
  canopus: {
    exec: [
      {
        headline: {
          en: 'GREEN — Wave 2 complete; rollout ahead of adoption target and under budget.',
          es: 'VERDE — Ola 2 completa; el despliegue supera la meta de adopción y está por debajo del presupuesto.',
        },
        wins: [
          {
            en: 'Wave 2 (Colombia, Mexico) closed 24 July — four of five countries now on the managed workplace.',
            es: 'La ola 2 (Colombia, México) cerró el 24 de julio — cuatro de cinco países ya operan en el puesto gestionado.',
          },
          {
            en: 'Adoption tracking to 86% at week 12, six points ahead of the 80% target.',
            es: 'La adopción proyecta 86% en la semana 12, seis puntos por encima de la meta del 80%.',
          },
          {
            en: 'Hardware pricing locked below plan — forecast at completion now $8.05M against an $8.4M budget.',
            es: 'Precio de hardware cerrado por debajo del plan — pronóstico al cierre de $8.05M contra un presupuesto de $8.4M.',
          },
        ],
        watch: [
          {
            en: 'Brazil customs lead times for Wave 3 devices; shipment is split across two entry points as mitigation.',
            es: 'Plazos aduaneros en Brasil para los equipos de la ola 3; el envío se dividió en dos puntos de entrada como mitigación.',
          },
          {
            en: 'Localization requests from Brazil are testing Wave 3 scope; change control holds the line.',
            es: 'Los pedidos de localización de Brasil presionan el alcance de la ola 3; el control de cambios mantiene el límite.',
          },
        ],
        ask: {
          en: 'No decision needed this cycle — visibility only.',
          es: 'Sin decisiones este ciclo — solo para visibilidad.',
        },
        next: {
          en: 'Wave 3 complete (Brazil) — 25 September.',
          es: 'Ola 3 completa (Brasil) — 25 de septiembre.',
        },
      },
      {
        headline: {
          en: 'GREEN — Four countries live, adoption above target, forecast $350K under budget.',
          es: 'VERDE — Cuatro países en producción, adopción sobre la meta, pronóstico $350K por debajo del presupuesto.',
        },
        wins: [
          {
            en: 'Champions network at full strength: 42 champions across five countries carried Wave 2 with a 4.2/5 pulse score.',
            es: 'Red de embajadores completa: 42 embajadores en cinco países sostuvieron la ola 2 con un pulso de 4.2/5.',
          },
          {
            en: 'Training completion reached 78% region-wide before Wave 3 begins.',
            es: 'La capacitación alcanzó el 78% en la región antes de iniciar la ola 3.',
          },
          {
            en: 'Device-compliance baseline handed to ACRUX on 1 August, unblocking MFA enforcement.',
            es: 'La base de cumplimiento de dispositivos se entregó a ACRUX el 1 de agosto, destrabando la exigencia de MFA.',
          },
        ],
        watch: [
          {
            en: 'Champion attrition in smaller sites — backfills identified per site.',
            es: 'Rotación de embajadores en sitios pequeños — reemplazos identificados por sitio.',
          },
          {
            en: 'CMDB asset reconciliation from Wave 1 at 92%; closure expected mid-August.',
            es: 'Conciliación de activos en la CMDB de la ola 1 al 92%; cierre previsto a mediados de agosto.',
          },
        ],
        ask: {
          en: 'Sponsors: reinforce the champions recognition program for H2 at the next town hall.',
          es: 'Patrocinadores: reforzar el programa de reconocimiento de embajadores del segundo semestre en la próxima reunión general.',
        },
        next: {
          en: 'Wave 3 complete (Brazil) — 25 September.',
          es: 'Ola 3 completa (Brasil) — 25 de septiembre.',
        },
      },
    ],
    team: [
      {
        headline: {
          en: 'GREEN — Wave 3 prep is the whole game this fortnight.',
          es: 'VERDE — La preparación de la ola 3 es la prioridad de esta quincena.',
        },
        wins: [
          {
            en: 'Wave 2 punch list closed: 14 residual tickets resolved, none older than five days.',
            es: 'Lista de pendientes de la ola 2 cerrada: 14 tickets residuales resueltos, ninguno mayor a cinco días.',
          },
          {
            en: 'Brazil imaging profile validated against the Wave 3 device SKUs in the lab.',
            es: 'Perfil de imagen para Brasil validado en laboratorio contra los modelos de la ola 3.',
          },
          {
            en: 'Compliance data feed to ACRUX validated end-to-end on 1 August.',
            es: 'Flujo de datos de cumplimiento hacia ACRUX validado de punta a punta el 1 de agosto.',
          },
        ],
        watch: [
          {
            en: 'Customs broker reports 10-day clearance on the first Brazil shipment — second shipment leaves this week; escalate if clearance exceeds 15 days.',
            es: 'El agente aduanero reporta 10 días de despacho para el primer envío a Brasil — el segundo sale esta semana; escalar si supera los 15 días.',
          },
          {
            en: 'São Paulo site readiness check runs 14 August; network validation depends on current circuits, not MIMOSA.',
            es: 'El chequeo de preparación del sitio de São Paulo es el 14 de agosto; la validación de red usa los circuitos actuales, no MIMOSA.',
          },
        ],
        ask: {
          en: 'Site leads: confirm floor-walker rosters for Wave 3 by Friday 8 August.',
          es: 'Líderes de sitio: confirmar los turnos de apoyo en piso para la ola 3 antes del viernes 8 de agosto.',
        },
        next: {
          en: 'Wave 3 readiness gate — 21 August; go/no-go at the biweekly steerco.',
          es: 'Puerta de preparación de la ola 3 — 21 de agosto; decisión en el comité quincenal.',
        },
      },
      {
        headline: {
          en: 'GREEN — Adoption engine humming; keep the floor support warm through Wave 3.',
          es: 'VERDE — El motor de adopción funciona; mantener el apoyo en piso durante la ola 3.',
        },
        wins: [
          {
            en: 'Week-10 adoption hit 74%, tracking the curve to 86% by week 12.',
            es: 'La adopción de la semana 10 llegó al 74%, en línea con la curva hacia el 86% en la semana 12.',
          },
          {
            en: 'Pulse survey held at 4.2/5 across both Wave 2 countries.',
            es: 'La encuesta de pulso se mantuvo en 4.2/5 en los dos países de la ola 2.',
          },
          {
            en: 'Training completion at 78%; the remaining cohort is scheduled through August.',
            es: 'Capacitación completada al 78%; la cohorte restante está agendada durante agosto.',
          },
        ],
        watch: [
          {
            en: 'Two smaller sites lost champions to rotation — onboarding replacements next week.',
            es: 'Dos sitios pequeños perdieron embajadores por rotación — los reemplazos se incorporan la próxima semana.',
          },
          {
            en: 'Localization backlog for Brazil is parked for stabilization; keep it out of Wave 3 scope.',
            es: 'El backlog de localización para Brasil queda para estabilización; mantenerlo fuera del alcance de la ola 3.',
          },
        ],
        ask: {
          en: 'Country leads: nominate Wave 3 champions in Brazil by 15 August (target: 10).',
          es: 'Líderes de país: nominar embajadores de la ola 3 en Brasil antes del 15 de agosto (meta: 10).',
        },
        next: {
          en: 'Brazil champions onboarded — 22 August; Wave 3 complete — 25 September.',
          es: 'Embajadores de Brasil incorporados — 22 de agosto; ola 3 completa — 25 de septiembre.',
        },
      },
    ],
  },

  // ────────────────────────────── ACRUX ──────────────────────────────
  acrux: {
    exec: [
      {
        headline: {
          en: 'GREEN — Pilot clean, compliance gate validated; enforcement on track for 2 October.',
          es: 'VERDE — Piloto sin incidencias, control de cumplimiento validado; exigencia en curso para el 2 de octubre.',
        },
        wins: [
          {
            en: 'Corporate MFA pilot closed 10 July with zero lockout incidents.',
            es: 'El piloto corporativo de MFA cerró el 10 de julio sin incidentes de bloqueo.',
          },
          {
            en: 'CANOPUS device-compliance gate validated 1 August — the enforcement precondition is met.',
            es: 'Control de cumplimiento de dispositivos de CANOPUS validado el 1 de agosto — la precondición de la exigencia está cumplida.',
          },
          {
            en: 'Forecast at completion $3.02M against a $3.2M budget.',
            es: 'Pronóstico al cierre de $3.02M contra un presupuesto de $3.2M.',
          },
        ],
        watch: [
          {
            en: 'Frontline shared-device sign-in remains the one high risk; staged enforcement limits blast radius.',
            es: 'El inicio de sesión en dispositivos compartidos de primera línea sigue siendo el riesgo alto; la exigencia escalonada limita el impacto.',
          },
          {
            en: 'Three legacy apps without modern federation — gateway pattern approved, one app to retire in November.',
            es: 'Tres aplicaciones heredadas sin federación moderna — patrón de gateway aprobado, una se retira en noviembre.',
          },
        ],
        ask: {
          en: 'Endorse the staged enforcement calendar (by business unit, 2 October start) at this steerco.',
          es: 'Avalar en este comité el calendario de exigencia escalonada (por unidad de negocio, inicio el 2 de octubre).',
        },
        next: {
          en: 'MFA enforcement begins — 2 October.',
          es: 'Comienza la exigencia de MFA — 2 de octubre.',
        },
      },
      {
        headline: {
          en: 'GREEN — Identity consolidation on schedule; enforcement risk actively managed.',
          es: 'VERDE — Consolidación de identidad según cronograma; riesgo de la exigencia gestionado activamente.',
        },
        wins: [
          {
            en: 'Top-20 application estate fully federated since May; no rollback events.',
            es: 'Las 20 aplicaciones principales federadas desde mayo; sin reversiones.',
          },
          {
            en: 'Shared-device sign-in pattern in pilot at two frontline sites.',
            es: 'Patrón de inicio de sesión para dispositivos compartidos en piloto en dos sitios de primera línea.',
          },
          {
            en: 'HADAR unblocked: collaboration tenants federated in production since 10 July.',
            es: 'HADAR destrabado: tenants de colaboración federados en producción desde el 10 de julio.',
          },
        ],
        watch: [
          {
            en: 'Access reviews lag in two business units — escalated to sponsors 28 July, both now moving.',
            es: 'Revisiones de acceso demoradas en dos unidades — escaladas a patrocinadores el 28 de julio, ambas ya avanzan.',
          },
          {
            en: 'Helpdesk surge expected in the first two enforcement weeks; ATRIA desk is pre-briefed.',
            es: 'Se espera un pico en la mesa de ayuda en las dos primeras semanas de exigencia; la mesa de ATRIA está preparada.',
          },
        ],
        ask: {
          en: 'Business-unit leads to complete access reviews by 18 September.',
          es: 'Que las unidades de negocio completen las revisiones de acceso antes del 18 de septiembre.',
        },
        next: {
          en: 'MFA enforcement — all business units, 2 October.',
          es: 'Exigencia de MFA — todas las unidades, 2 de octubre.',
        },
      },
    ],
    team: [
      {
        headline: {
          en: 'GREEN — Enforcement runway: eight weeks, three workstreams.',
          es: 'VERDE — Pista hacia la exigencia: ocho semanas, tres frentes de trabajo.',
        },
        wins: [
          {
            en: 'Compliance gate test matrix passed 40/40 cases against CANOPUS Wave 1–2 devices.',
            es: 'La matriz de pruebas del control de cumplimiento pasó 40/40 casos contra dispositivos de las olas 1–2 de CANOPUS.',
          },
          {
            en: 'FIDO keys for kiosk scenarios quoted and in procurement.',
            es: 'Llaves FIDO para escenarios de kiosco cotizadas y en compras.',
          },
          {
            en: 'Conditional-access policies peer-reviewed and versioned in the policy repo.',
            es: 'Políticas de acceso condicional revisadas por pares y versionadas en el repositorio.',
          },
        ],
        watch: [
          {
            en: 'Shared-device pilot at the two frontline sites reports Friday — watch failed-sign-in telemetry.',
            es: 'El piloto de dispositivos compartidos en los dos sitios reporta el viernes — vigilar la telemetría de inicios fallidos.',
          },
          {
            en: 'Header-gateway config for the three legacy apps needs a second reviewer.',
            es: 'La configuración del gateway por cabeceras para las tres aplicaciones heredadas necesita un segundo revisor.',
          },
        ],
        ask: {
          en: 'Volunteers for enforcement-week hypercare rota (two per country) by 22 August.',
          es: 'Voluntarios para la guardia de hipercuidado de la semana de exigencia (dos por país) antes del 22 de agosto.',
        },
        next: {
          en: 'Enforcement dry run — sprint of 7 September; go-live 2 October.',
          es: 'Ensayo de exigencia — sprint del 7 de septiembre; salida en vivo el 2 de octubre.',
        },
      },
      {
        headline: {
          en: 'GREEN — Clean pilot behind us; the detail work is in the long tail of apps.',
          es: 'VERDE — Piloto limpio completado; el trabajo fino está en la cola larga de aplicaciones.',
        },
        wins: [
          {
            en: 'Zero pilot lockouts across 1,800 corporate users.',
            es: 'Cero bloqueos en el piloto con 1,800 usuarios corporativos.',
          },
          {
            en: 'Self-service credential reset adoption at 63% and climbing after the July comms push.',
            es: 'Adopción del restablecimiento autoservicio en 63% y subiendo tras la campaña de julio.',
          },
          {
            en: 'App owners for 9 of 12 long-tail apps confirmed federation dates.',
            es: 'Los dueños de 9 de 12 aplicaciones de cola larga confirmaron fechas de federación.',
          },
        ],
        watch: [
          {
            en: 'Three long-tail apps unresponsive — owner escalation drafted for the PM sync.',
            es: 'Tres aplicaciones de cola larga sin respuesta — escalamiento a dueños preparado para la sincronización de PM.',
          },
          {
            en: 'Token-lifetime edge case on offline devices logged from the pilot; fix scheduled next sprint.',
            es: 'Caso borde de vigencia de tokens en dispositivos sin conexión registrado en el piloto; corrección agendada para el próximo sprint.',
          },
        ],
        ask: {
          en: 'Confirm Spanish and Portuguese enforcement comms are final by 29 August.',
          es: 'Confirmar las comunicaciones de exigencia en español y portugués antes del 29 de agosto.',
        },
        next: {
          en: 'Long-tail federation batch 2 — 11 September.',
          es: 'Lote 2 de federación de cola larga — 11 de septiembre.',
        },
      },
    ],
  },

  // ────────────────────────────── ANTARES ──────────────────────────────
  antares: {
    exec: [
      {
        headline: {
          en: 'RED — Wave 2 blocked on the São Paulo circuit; recovery plan holds the December exit if approved this week.',
          es: 'ROJO — Ola 2 bloqueada por el circuito de São Paulo; el plan de recuperación sostiene la salida de diciembre si se aprueba esta semana.',
        },
        wins: [
          {
            en: 'Wave 1 remains stable in production — 120 workloads, no sev-1 incidents since April.',
            es: 'La ola 1 sigue estable en producción — 120 cargas, sin incidentes de severidad 1 desde abril.',
          },
          {
            en: 'Re-sequenced backlog keeps teams productive: 22 non-São Paulo workloads brought forward.',
            es: 'El backlog re-secuenciado mantiene la productividad: 22 cargas fuera de São Paulo adelantadas.',
          },
          {
            en: 'Recovery plan written, costed, and at Program Steerco since 24 July.',
            es: 'Plan de recuperación redactado, costeado y en el comité del programa desde el 24 de julio.',
          },
        ],
        watch: [
          {
            en: 'Every week without the link consumes migration buffer against the fixed Q1 2027 facility exit.',
            es: 'Cada semana sin el enlace consume el colchón de migración contra la salida fija de la instalación en el primer trimestre de 2027.',
          },
          {
            en: 'Dual-running and egress costs during the compressed window — FinOps reviews weekly, $300K contingency in FAC.',
            es: 'Costos de operación en paralelo y egreso durante la ventana comprimida — revisión FinOps semanal, contingencia de $300K en el pronóstico.',
          },
        ],
        ask: {
          en: 'DECISION: approve the secondary carrier at +$180K to recover two of the three lost weeks — due 12 August.',
          es: 'DECISIÓN: aprobar el operador secundario por +$180K para recuperar dos de las tres semanas perdidas — antes del 12 de agosto.',
        },
        next: {
          en: 'São Paulo replication link live — 14 August (at risk; gated by the carrier decision).',
          es: 'Enlace de replicación de São Paulo activo — 14 de agosto (en riesgo; sujeto a la decisión del operador).',
        },
      },
      {
        headline: {
          en: 'RED — Critical path exposed for three weeks; mitigation is funded, decision is not yet taken.',
          es: 'ROJO — Ruta crítica expuesta por tres semanas; la mitigación está financiada, la decisión aún no se toma.',
        },
        wins: [
          {
            en: 'Escalation is working as designed: tier-2 governance engaged within 48 hours of the slip.',
            es: 'El escalamiento funciona según lo diseñado: la gobernanza de nivel 2 se activó a las 48 horas del atraso.',
          },
          {
            en: 'Dependency mapping across all 180 Wave 2 workloads completed — move groups locked two sprints ahead.',
            es: 'Mapeo de dependencias completado en las 180 cargas de la ola 2 — grupos de migración cerrados con dos sprints de anticipación.',
          },
          {
            en: 'Forecast at completion held at $14.5M including contingency — 2.1% over an unchanged $14.2M budget, declared early.',
            es: 'Pronóstico al cierre sostenido en $14.5M con contingencia — 2.1% sobre el presupuesto sin cambios de $14.2M, declarado a tiempo.',
          },
        ],
        watch: [
          {
            en: 'If the decision slips past 12 August, the December exit date moves — a paid facility extension is the fallback, at materially higher cost.',
            es: 'Si la decisión pasa del 12 de agosto, la fecha de salida de diciembre se mueve — la extensión paga de la instalación es el plan alternativo, con un costo sustancialmente mayor.',
          },
          {
            en: 'Team fatigue on the re-sequenced plan; scope discipline protects the critical path.',
            es: 'Fatiga del equipo con el plan re-secuenciado; la disciplina de alcance protege la ruta crítica.',
          },
        ],
        ask: {
          en: 'DECISION: secondary carrier, +$180K, recovers 2 weeks. Recommendation: approve.',
          es: 'DECISIÓN: operador secundario, +$180K, recupera 2 semanas. Recomendación: aprobar.',
        },
        next: {
          en: 'Wave 2 first move group — within 10 days of link-live.',
          es: 'Primer grupo de migración de la ola 2 — dentro de los 10 días de activado el enlace.',
        },
      },
    ],
    team: [
      {
        headline: {
          en: 'RED — Blocked on the SP link; we stay productive on the re-sequenced backlog.',
          es: 'ROJO — Bloqueados por el enlace de SP; seguimos productivos con el backlog re-secuenciado.',
        },
        wins: [
          {
            en: '22 re-sequenced workloads through pre-migration checks; 9 already cut over.',
            es: '22 cargas re-secuenciadas pasaron los chequeos previos; 9 ya migradas.',
          },
          {
            en: 'Cutover rehearsal for move group SP-1 completed in the lab against a throttled link profile.',
            es: 'Ensayo de migración del grupo SP-1 completado en laboratorio con un perfil de enlace limitado.',
          },
          {
            en: 'Joint daily standup with MIMOSA running since 25 July — single shared burndown.',
            es: 'Reunión diaria conjunta con MIMOSA desde el 25 de julio — un solo burndown compartido.',
          },
        ],
        watch: [
          {
            en: 'Do not start SP-dependent workloads until link-live is confirmed — no exceptions without PM sign-off.',
            es: 'No iniciar cargas dependientes de SP hasta confirmar el enlace activo — sin excepciones sin visto bueno del PM.',
          },
          {
            en: 'Egress-heavy workloads must go in batches per the FinOps schedule.',
            es: 'Las cargas con alto egreso deben ir en lotes según el calendario FinOps.',
          },
        ],
        ask: {
          en: 'Move-group owners: refresh rollback runbooks by 8 August, before the steering decision lands.',
          es: 'Dueños de grupos de migración: actualizar los runbooks de reversión antes del 8 de agosto, previo a la decisión del comité.',
        },
        next: {
          en: 'Steering decision 12 August; if approved, secondary carrier installs within 2 weeks.',
          es: 'Decisión del comité el 12 de agosto; si se aprueba, el operador secundario instala en 2 semanas.',
        },
      },
      {
        headline: {
          en: 'RED — Three weeks lost upstream; our job is to make them back downstream.',
          es: 'ROJO — Tres semanas perdidas aguas arriba; nuestro trabajo es recuperarlas aguas abajo.',
        },
        wins: [
          {
            en: 'Wave 2 move groups compressed from 14 to 11 without raising risk class — parallel validation streams.',
            es: 'Los grupos de la ola 2 se comprimieron de 14 a 11 sin subir la clase de riesgo — validación en paralelo.',
          },
          {
            en: 'Automated smoke-test pack now covers 87% of Wave 2 workloads, up from 60% in June.',
            es: 'El paquete automatizado de pruebas cubre el 87% de las cargas de la ola 2, desde el 60% de junio.',
          },
          {
            en: 'No new sev-1/sev-2 on Wave 1 workloads for 14 consecutive weeks.',
            es: 'Sin nuevos incidentes de severidad 1/2 en cargas de la ola 1 por 14 semanas consecutivas.',
          },
        ],
        watch: [
          {
            en: 'Compressed calendar leaves one weekend buffer per move group — protect it.',
            es: 'El calendario comprimido deja un fin de semana de colchón por grupo — protegerlo.',
          },
          {
            en: 'Watch dual-running costs in the daily FinOps dashboard; flag anomalies same-day.',
            es: 'Vigilar los costos de operación en paralelo en el tablero FinOps diario; reportar anomalías el mismo día.',
          },
        ],
        ask: {
          en: 'All hands on the link-live rehearsal 11 August — full dry run of the first 48 hours.',
          es: 'Todos en el ensayo del enlace activo el 11 de agosto — simulacro completo de las primeras 48 horas.',
        },
        next: {
          en: 'Link-live target 14 August; Wave 2 — 180 workloads by 13 November.',
          es: 'Enlace activo previsto el 14 de agosto; ola 2 — 180 cargas al 13 de noviembre.',
        },
      },
    ],
  },

  // ────────────────────────────── MIMOSA ──────────────────────────────
  mimosa: {
    exec: [
      {
        headline: {
          en: 'AMBER — Ten of twelve sites on plan; São Paulo circuit slip is contained but carries the ANTARES critical path.',
          es: 'ÁMBAR — Diez de doce sitios según el plan; el atraso del circuito de São Paulo está contenido pero sostiene la ruta crítica de ANTARES.',
        },
        wins: [
          {
            en: 'Mexico City cutover completed 24 July — the largest site so far, done inside the change window.',
            es: 'Migración de Ciudad de México completada el 24 de julio — el sitio más grande hasta ahora, dentro de la ventana de cambio.',
          },
          {
            en: 'SD-WAN overlay performing above baseline at all live sites; user-visible incidents: zero.',
            es: 'La superposición SD-WAN rinde sobre la línea base en todos los sitios activos; incidentes visibles para usuarios: cero.',
          },
          {
            en: 'Carrier penalties invoked and executive review held 28 July — recovery options costed within a week of the slip.',
            es: 'Penalidades al operador invocadas y revisión ejecutiva el 28 de julio — opciones de recuperación costeadas a la semana del atraso.',
          },
        ],
        watch: [
          {
            en: 'Three remaining metro sites share the same carrier — delivery reviews now weekly with pre-approved secondary quotes.',
            es: 'Los tres sitios metropolitanos restantes comparten el mismo operador — revisiones de entrega semanales con cotizaciones secundarias preaprobadas.',
          },
          {
            en: 'ANTARES exposure: every week of circuit delay converts directly into migration-window compression.',
            es: 'Exposición de ANTARES: cada semana de atraso del circuito se convierte en compresión de su ventana de migración.',
          },
        ],
        ask: {
          en: 'DECISION: approve the São Paulo secondary carrier at +$180K to recover two weeks — joint ask with ANTARES, due 12 August.',
          es: 'DECISIÓN: aprobar el operador secundario de São Paulo por +$180K para recuperar dos semanas — solicitud conjunta con ANTARES, antes del 12 de agosto.',
        },
        next: {
          en: 'São Paulo circuit delivery — 21 August (revised carrier date).',
          es: 'Entrega del circuito de São Paulo — 21 de agosto (fecha revisada del operador).',
        },
      },
      {
        headline: {
          en: 'AMBER — Program fundamentals green; one vendor slip drives the rating and one decision resolves it.',
          es: 'ÁMBAR — Fundamentos del programa en verde; un atraso de proveedor explica la calificación y una decisión la resuelve.',
        },
        wins: [
          {
            en: 'Four sites cut over to date — Santiago, Buenos Aires, Mexico City, Bogotá — all inside their change windows.',
            es: 'Cuatro sitios migrados a la fecha — Santiago, Buenos Aires, Ciudad de México, Bogotá — todos dentro de sus ventanas de cambio.',
          },
          {
            en: 'Forecast at completion $5.5M against a $5.6M budget, before the pending carrier decision (+$180K if approved).',
            es: 'Pronóstico al cierre de $5.5M contra un presupuesto de $5.6M, antes de la decisión pendiente del operador (+$180K si se aprueba).',
          },
          {
            en: 'Local-breakout security model passed the regional security review first pass.',
            es: 'El modelo de seguridad de salida local pasó la revisión regional de seguridad en la primera instancia.',
          },
        ],
        watch: [
          {
            en: 'Meridian Redes now under weekly delivery governance with penalties enforced.',
            es: 'Meridian Redes bajo gobernanza semanal de entregas con penalidades aplicadas.',
          },
          {
            en: 'Building-access permits for overnight cutovers — requested six weeks ahead per site.',
            es: 'Permisos de acceso para cambios nocturnos — solicitados con seis semanas de anticipación por sitio.',
          },
        ],
        ask: {
          en: 'Approve the secondary-carrier spend so the recovery starts before the next steering cycle.',
          es: 'Aprobar el gasto del operador secundario para iniciar la recuperación antes del próximo ciclo del comité.',
        },
        next: {
          en: 'All-sites cutover complete — 13 November.',
          es: 'Migración de todos los sitios completa — 13 de noviembre.',
        },
      },
    ],
    team: [
      {
        headline: {
          en: 'AMBER — Hold the deployment rhythm; São Paulo is managed at steering level.',
          es: 'ÁMBAR — Mantener el ritmo de despliegue; São Paulo se gestiona a nivel del comité.',
        },
        wins: [
          {
            en: 'Mexico City cutover: 6 hours end-to-end, rollback never armed, zero user tickets Monday morning.',
            es: 'Migración de Ciudad de México: 6 horas de punta a punta, sin activar la reversión, cero tickets el lunes por la mañana.',
          },
          {
            en: 'Edge hardware for the remaining eight sites received and staged at the Santiago depot.',
            es: 'Hardware de borde para los ocho sitios restantes recibido y preparado en el depósito de Santiago.',
          },
          {
            en: 'Cutover runbook v3 published — includes the permit checklist and landlord contacts.',
            es: 'Runbook de migración v3 publicado — incluye la lista de permisos y contactos de propietarios.',
          },
        ],
        watch: [
          {
            en: 'Daily standup with ANTARES continues until São Paulo link-live — attendance is not optional.',
            es: 'La reunión diaria con ANTARES sigue hasta activar el enlace de São Paulo — la asistencia no es opcional.',
          },
          {
            en: 'Bogotá port-channel flap seen twice last week — vendor case open, monitor thresholds tightened.',
            es: 'El canal de puertos de Bogotá osciló dos veces la semana pasada — caso abierto con el proveedor, umbrales de monitoreo ajustados.',
          },
        ],
        ask: {
          en: 'Site engineers: submit September permit requests by 15 August (six-week rule).',
          es: 'Ingenieros de sitio: presentar los permisos de septiembre antes del 15 de agosto (regla de seis semanas).',
        },
        next: {
          en: 'Lima and Montevideo cutovers — weeks of 7 and 21 September.',
          es: 'Migraciones de Lima y Montevideo — semanas del 7 y del 21 de septiembre.',
        },
      },
      {
        headline: {
          en: 'AMBER — One carrier, one circuit, one decision — everything else is on rails.',
          es: 'ÁMBAR — Un operador, un circuito, una decisión — todo lo demás va sobre rieles.',
        },
        wins: [
          {
            en: 'SD-WAN telemetry: latency down 22% and packet loss under 0.1% at all four live sites.',
            es: 'Telemetría SD-WAN: latencia 22% menor y pérdida de paquetes bajo 0.1% en los cuatro sitios activos.',
          },
          {
            en: 'Secondary-carrier survey for São Paulo completed — install feasible in two weeks from approval.',
            es: 'Relevamiento del operador secundario para São Paulo completado — instalación factible a dos semanas de la aprobación.',
          },
          {
            en: 'QoS profiles for ANTARES replication traffic pre-staged and lab-tested.',
            es: 'Perfiles de QoS para el tráfico de replicación de ANTARES preparados y probados en laboratorio.',
          },
        ],
        watch: [
          {
            en: 'If the 21 August carrier date slips again, the joint escalation goes to tier 3 the same day.',
            es: 'Si la fecha del 21 de agosto vuelve a correrse, el escalamiento conjunto pasa a nivel 3 el mismo día.',
          },
          {
            en: 'Keep spare edge devices sealed — Q4 lead times mean no cannibalizing the spares pool.',
            es: 'Mantener sellados los equipos de repuesto — los plazos del cuarto trimestre no permiten usar el stock de repuestos.',
          },
        ],
        ask: {
          en: 'Confirm the São Paulo site is install-ready (power, rack, access) by 11 August.',
          es: 'Confirmar que el sitio de São Paulo esté listo para instalación (energía, rack, acceso) antes del 11 de agosto.',
        },
        next: {
          en: 'Steering decision 12 August; São Paulo circuit live target 21 August.',
          es: 'Decisión del comité el 12 de agosto; circuito de São Paulo activo previsto el 21 de agosto.',
        },
      },
    ],
  },

  // ────────────────────────────── HADAR ──────────────────────────────
  hadar: {
    exec: [
      {
        headline: {
          en: 'GREEN — Design phase closed; floor-by-floor migration starts September.',
          es: 'VERDE — Fase de diseño cerrada; la migración piso por piso comienza en septiembre.',
        },
        wins: [
          {
            en: 'Room Standard v1 published 31 July — one AV specification for all 118 rooms.',
            es: 'Estándar de Salas v1 publicado el 31 de julio — una especificación AV para las 118 salas.',
          },
          {
            en: 'SSO live via ACRUX since 10 July; consolidation now runs on one identity.',
            es: 'SSO activo vía ACRUX desde el 10 de julio; la consolidación opera sobre una sola identidad.',
          },
          {
            en: 'Forecast at completion $1.95M against a $2.1M budget.',
            es: 'Pronóstico al cierre de $1.95M contra un presupuesto de $2.1M.',
          },
        ],
        watch: [
          {
            en: 'AV hardware supply for Q4 room builds — orders placed in August, alternates certified.',
            es: 'Suministro de hardware AV para las salas del cuarto trimestre — pedidos en agosto, alternativas certificadas.',
          },
          {
            en: 'Legacy contract notice periods: two of three confirmed for December termination; third under review.',
            es: 'Plazos de aviso de contratos heredados: dos de tres confirmados para terminar en diciembre; el tercero en revisión.',
          },
        ],
        ask: {
          en: 'No decision needed; sponsor comms for the September migration wave appreciated.',
          es: 'Sin decisiones; se agradece comunicación de patrocinadores para la ola de migración de septiembre.',
        },
        next: {
          en: '50% of rooms migrated — 16 October.',
          es: '50% de las salas migradas — 16 de octubre.',
        },
      },
      {
        headline: {
          en: 'GREEN — Three tools become one; the sunset plan is agreed and funded.',
          es: 'VERDE — Tres herramientas se vuelven una; el plan de baja está acordado y financiado.',
        },
        wins: [
          {
            en: 'All three legacy tool owners signed the sunset narrative and December dates.',
            es: 'Los dueños de las tres herramientas heredadas firmaron el plan de baja y las fechas de diciembre.',
          },
          {
            en: 'Pilot rooms in Buenos Aires holding a 4.5/5 satisfaction score after eight weeks.',
            es: 'Las salas piloto de Buenos Aires mantienen 4.5/5 de satisfacción tras ocho semanas.',
          },
          {
            en: 'ATRIA support workflows scoped against the platform chat module — joint test plan agreed.',
            es: 'Flujos de soporte de ATRIA definidos sobre el módulo de chat — plan de pruebas conjunto acordado.',
          },
        ],
        watch: [
          {
            en: 'Recording-retention policy mismatch — interim retain-all rule until legal review closes.',
            es: 'Diferencias de retención de grabaciones — regla provisoria de retener todo hasta cerrar la revisión legal.',
          },
          {
            en: 'Change fatigue risk as migration reaches heavy-use floors; comms sequenced with CANOPUS.',
            es: 'Riesgo de fatiga de cambio al llegar a pisos de uso intensivo; comunicaciones secuenciadas con CANOPUS.',
          },
        ],
        ask: {
          en: 'Confirm the third legacy contract termination clause with procurement by 30 October.',
          es: 'Confirmar con compras la cláusula de terminación del tercer contrato antes del 30 de octubre.',
        },
        next: {
          en: 'September migration wave begins — week of 7 September.',
          es: 'Comienza la ola de migración de septiembre — semana del 7 de septiembre.',
        },
      },
    ],
    team: [
      {
        headline: {
          en: 'GREEN — Standard shipped; now we industrialize the floor migrations.',
          es: 'VERDE — Estándar publicado; ahora industrializamos las migraciones por piso.',
        },
        wins: [
          {
            en: 'Room Standard v1: 3 room sizes, 2 certified SKU sets, one install checklist.',
            es: 'Estándar de Salas v1: 3 tamaños de sala, 2 juegos de equipos certificados, una lista de instalación.',
          },
          {
            en: 'Floor-migration kit tested on the pilot floor — 4 rooms per day per crew is sustainable.',
            es: 'Kit de migración por piso probado en el piso piloto — 4 salas por día por cuadrilla es sostenible.',
          },
          {
            en: 'Ríoplata AV crew certified on the standard; second crew in training.',
            es: 'Cuadrilla de Ríoplata AV certificada en el estándar; segunda cuadrilla en formación.',
          },
        ],
        watch: [
          {
            en: 'Q4 hardware POs must be in by 29 August to hold October installs.',
            es: 'Las órdenes de compra del cuarto trimestre deben emitirse antes del 29 de agosto para sostener las instalaciones de octubre.',
          },
          {
            en: 'Retention rule: keep everything until legal closes the review — no local deletions.',
            es: 'Regla de retención: conservar todo hasta que legal cierre la revisión — sin borrados locales.',
          },
        ],
        ask: {
          en: 'Floor captains for the September wave: confirm access windows by 21 August.',
          es: 'Referentes de piso de la ola de septiembre: confirmar ventanas de acceso antes del 21 de agosto.',
        },
        next: {
          en: 'First migration floor — week of 7 September.',
          es: 'Primer piso migrado — semana del 7 de septiembre.',
        },
      },
      {
        headline: {
          en: 'GREEN — Momentum from two July wins; keep the chat-module date safe for ATRIA.',
          es: 'VERDE — Impulso de dos logros de julio; proteger la fecha del módulo de chat para ATRIA.',
        },
        wins: [
          {
            en: 'SSO cutover was a non-event — zero authentication tickets in the first week.',
            es: 'El cambio a SSO pasó sin incidencias — cero tickets de autenticación en la primera semana.',
          },
          {
            en: 'Meeting recordings migration script validated on 2TB of pilot content.',
            es: 'Script de migración de grabaciones validado con 2TB de contenido piloto.',
          },
          {
            en: 'Adoption micro-trainings recorded in Spanish and Portuguese.',
            es: 'Micro-capacitaciones de adopción grabadas en español y portugués.',
          },
        ],
        watch: [
          {
            en: 'Chat module ships in the September wave — ATRIA test plan runs the week after; hold the date.',
            es: 'El módulo de chat sale en la ola de septiembre — el plan de pruebas de ATRIA corre la semana siguiente; sostener la fecha.',
          },
          {
            en: 'One alternate SKU shows firmware drift — lock versions in the golden image.',
            es: 'Un equipo alternativo muestra desvío de firmware — fijar versiones en la imagen dorada.',
          },
        ],
        ask: {
          en: 'Nominate two floor champions per country for the migration waves by 28 August.',
          es: 'Nominar dos referentes de piso por país para las olas de migración antes del 28 de agosto.',
        },
        next: {
          en: 'Chat module + first floors — September wave; 50% rooms by 16 October.',
          es: 'Módulo de chat + primeros pisos — ola de septiembre; 50% de salas al 16 de octubre.',
        },
      },
    ],
  },

  // ────────────────────────────── ATRIA ──────────────────────────────
  atria: {
    exec: [
      {
        headline: {
          en: 'GREEN — MTTR down 34% and holding; the XLA model is proving itself.',
          es: 'VERDE — MTTR 34% menor y estable; el modelo XLA está demostrando su valor.',
        },
        wins: [
          {
            en: 'Onsite ticket MTTR reduced from 6.1 to 4.0 days via the DMAIC cycle; control phase live since 29 July.',
            es: 'MTTR de tickets en sitio reducido de 6.1 a 4.0 días con el ciclo DMAIC; fase de control activa desde el 29 de julio.',
          },
          {
            en: 'Skill-based routing live since 8 July — first-touch resolution up six points.',
            es: 'Enrutamiento por competencias activo desde el 8 de julio — resolución en primer contacto seis puntos arriba.',
          },
          {
            en: 'Forecast at completion $1.65M against a $1.8M budget.',
            es: 'Pronóstico al cierre de $1.65M contra un presupuesto de $1.8M.',
          },
        ],
        watch: [
          {
            en: 'XLA telemetry quality varies by country — scorecard in place, two collectors re-instrumented in August.',
            es: 'La calidad de telemetría XLA varía por país — tablero activo, dos recolectores re-instrumentados en agosto.',
          },
          {
            en: 'ACRUX MFA enforcement in October will surge desk volume — scripted flows and staffing plan ready.',
            es: 'La exigencia de MFA de ACRUX en octubre elevará el volumen de la mesa — guiones y plan de dotación listos.',
          },
        ],
        ask: {
          en: 'No decision needed — the DMAIC result is offered as a template for two other service lines in 2027 planning.',
          es: 'Sin decisiones — el resultado DMAIC se ofrece como plantilla para dos líneas de servicio más en la planificación 2027.',
        },
        next: {
          en: 'Self-service portal v2 — 9 October.',
          es: 'Portal de autoservicio v2 — 9 de octubre.',
        },
      },
      {
        headline: {
          en: 'GREEN — Experience metrics, not ticket counts, now steer the desk — and they are improving.',
          es: 'VERDE — Las métricas de experiencia, no el volumen de tickets, dirigen la mesa — y están mejorando.',
        },
        wins: [
          {
            en: 'All five countries reporting against XLA baselines since May — one shared scoreboard.',
            es: 'Los cinco países reportan contra líneas base XLA desde mayo — un tablero compartido.',
          },
          {
            en: 'DMAIC case documented end-to-end: define through control, with the before/after control chart.',
            es: 'Caso DMAIC documentado de punta a punta: de definir a controlar, con el gráfico de control antes/después.',
          },
          {
            en: 'Ticket backlog older than 10 days down 41% since March.',
            es: 'El backlog de tickets de más de 10 días bajó 41% desde marzo.',
          },
        ],
        watch: [
          {
            en: 'Hold the MTTR gain through the October MFA surge — that is the control phase’s first real test.',
            es: 'Sostener la mejora de MTTR durante el pico de MFA de octubre — la primera prueba real de la fase de control.',
          },
          {
            en: 'Portal v2 content localization runs behind development by one sprint — recoverable.',
            es: 'La localización de contenidos del portal v2 corre un sprint detrás del desarrollo — recuperable.',
          },
        ],
        ask: {
          en: 'Sponsor visibility: share the DMAIC case at the monthly exec review.',
          es: 'Visibilidad de patrocinadores: presentar el caso DMAIC en la revisión ejecutiva mensual.',
        },
        next: {
          en: 'Self-service portal v2 — 9 October.',
          es: 'Portal de autoservicio v2 — 9 de octubre.',
        },
      },
    ],
    team: [
      {
        headline: {
          en: 'GREEN — Control phase discipline: measure, hold, don’t drift.',
          es: 'VERDE — Disciplina de la fase de control: medir, sostener, no desviarse.',
        },
        wins: [
          {
            en: 'Weekly MTTR held at 3.9–4.1 days for four consecutive weeks post-improvement.',
            es: 'MTTR semanal sostenido en 3.9–4.1 días por cuatro semanas consecutivas tras la mejora.',
          },
          {
            en: 'Parts pre-staging adopted at all onsite hubs — the biggest single contributor to the gain.',
            es: 'Preparación previa de repuestos adoptada en todos los centros en sitio — el mayor aporte individual a la mejora.',
          },
          {
            en: 'History import cleanup at 96% matched categories.',
            es: 'Limpieza del histórico importado con 96% de categorías conciliadas.',
          },
        ],
        watch: [
          {
            en: 'Any two consecutive weeks above 4.5 days triggers the control-phase review — no waiting for month-end.',
            es: 'Dos semanas consecutivas sobre 4.5 días activan la revisión de la fase de control — sin esperar el cierre de mes.',
          },
          {
            en: 'Colombia collector re-instrumentation lands 15 August; watch for a telemetry gap that week.',
            es: 'La re-instrumentación del recolector de Colombia llega el 15 de agosto; atentos a un hueco de telemetría esa semana.',
          },
        ],
        ask: {
          en: 'Desk leads: freeze routing-rule changes until the September review unless sev-1.',
          es: 'Líderes de mesa: congelar cambios de reglas de enrutamiento hasta la revisión de septiembre salvo severidad 1.',
        },
        next: {
          en: 'Portal v2 content freeze — 12 September.',
          es: 'Congelamiento de contenidos del portal v2 — 12 de septiembre.',
        },
      },
      {
        headline: {
          en: 'GREEN — Preparing the desk for October: MFA surge is a plannable event, so plan it.',
          es: 'VERDE — Preparando la mesa para octubre: el pico de MFA es un evento planificable, así que se planifica.',
        },
        wins: [
          {
            en: 'MFA-surge playbook drafted with ACRUX: scripted flows, staffing curve, self-service deflection targets.',
            es: 'Playbook del pico de MFA redactado con ACRUX: guiones, curva de dotación, metas de derivación al autoservicio.',
          },
          {
            en: 'Knowledge articles for the top-20 MFA scenarios written in Spanish and Portuguese.',
            es: 'Artículos de conocimiento para los 20 escenarios principales de MFA escritos en español y portugués.',
          },
          {
            en: 'Chat-workflow test plan agreed with HADAR for the September module drop.',
            es: 'Plan de pruebas de flujos de chat acordado con HADAR para la entrega de septiembre.',
          },
        ],
        watch: [
          {
            en: 'Fallback stands: web chat stays on the current tool until November if the HADAR module slips.',
            es: 'El plan alternativo sigue vigente: el chat web permanece en la herramienta actual hasta noviembre si el módulo de HADAR se atrasa.',
          },
          {
            en: 'Portal v2 localization one sprint behind — pull one writer forward after the content freeze.',
            es: 'Localización del portal v2 un sprint detrás — adelantar un redactor tras el congelamiento de contenidos.',
          },
        ],
        ask: {
          en: 'Country leads: validate the October staffing curve against local calendars by 29 August.',
          es: 'Líderes de país: validar la curva de dotación de octubre contra calendarios locales antes del 29 de agosto.',
        },
        next: {
          en: 'HADAR chat-module joint test — late September; portal v2 — 9 October.',
          es: 'Prueba conjunta del módulo de chat de HADAR — fines de septiembre; portal v2 — 9 de octubre.',
        },
      },
    ],
  },
}
