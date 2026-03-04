import { useDocumentTitle } from '@/hooks/use-document-title'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'

export const EndometriosisVisualization = () => {
  const { t } = useTranslation()
  useDocumentTitle('endometriosis.visualization.title')

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t('endometriosis.visualization.title')}</h1>
        <p className="text-muted-foreground">{t('endometriosis.visualization.description')}</p>
      </div>

      <Alert>
        <AlertDescription className="text-sm">
          ⚠️ {t('endometriosis.disclaimer')}
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">
          <p>{t('endometriosis.visualization.placeholder')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
