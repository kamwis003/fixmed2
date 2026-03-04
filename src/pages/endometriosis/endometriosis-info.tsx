import { useDocumentTitle } from '@/hooks/use-document-title'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const EndometriosisInfo = () => {
  const { t } = useTranslation()
  useDocumentTitle('endometriosis.info.title')

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t('endometriosis.info.title')}</h1>
        <p className="text-muted-foreground">{t('endometriosis.info.description')}</p>
      </div>

      <Alert>
        <AlertDescription className="text-sm">
          ⚠️ {t('endometriosis.disclaimer')}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>{t('endometriosis.info.whatIsTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>{t('endometriosis.info.whatIsContent')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
