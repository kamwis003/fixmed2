import { useState } from 'react'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { CycleFormData } from '@/types/fertility'
import { CycleEntryForm } from '@/components/fertility/cycle-entry-form'

export const CycleTracking = () => {
  const { t } = useTranslation()
  const { toast } = useToast()
  useDocumentTitle('fertility.tracking.title')

  const handleSubmit = (data: CycleFormData) => {
    console.log('Cycle entry submitted:', data)
    
    // TODO: Save to backend/database
    
    toast({
      title: 'Sukces',
      description: 'Wpis cyklu został zapisany',
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t('fertility.tracking.title')}</h1>
        <p className="text-muted-foreground">{t('fertility.tracking.description')}</p>
      </div>

      <Alert>
        <AlertDescription className="text-sm">
          ⚠️ {t('fertility.disclaimer')}
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <CycleEntryForm onSubmit={handleSubmit} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informacje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium mb-1">Jak rejestrować cykl?</p>
                <p className="text-muted-foreground">
                  Zaznacz datę pierwszego dnia menstruacji jako początek cyklu. Opcjonalnie możesz dodać datę zakończenia.
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">Objawy</p>
                <p className="text-muted-foreground">
                  Zaznacz wszystkie objawy, które występują i oceń ich intensywność w skali 1-5.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kiedy skonsultować się z lekarzem?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Cykl trwa krócej niż 21 dni lub dłużej niż 35 dni</p>
              <p>• Bardzo silny ból utrudniający codzienne funkcjonowanie</p>
              <p>• Nieregularny cykl (różnice &gt;7 dni między cyklami)</p>
              <p>• Bardzo obfite krwawienie</p>
              <p>• Brak menstruacji przez 3+ miesiące</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}