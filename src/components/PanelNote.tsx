import { useI18n } from '../i18n'

/** Quiet footer on data panels — signals the real toolchain while staying honest. */
export function PanelNote() {
  const { t } = useI18n()
  return <p className="mt-3 text-[11px] leading-relaxed text-muted/80">{t('ov.simFeeds')}</p>
}
