import { useState } from 'react'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'

export const CycleCalendar = () => {
  const { t } = useTranslation()
  useDocumentTitle('fertility.calendar.title')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Mock data - replace with actual data from backend
  const mockCycleDays = [
    new Date(2026, 1, 10),
    new Date(2026, 1, 11),
    new Date(2026, 1, 12),
    new Date(2026, 1, 13),
    new Date(2026, 1, 14),
  ]

  const mockStats = {
    averageLength: 28,
    lastCycles: [
      { startDate: new Date(2026, 1, 10), length: 28 },
      { startDate: new Date(2026, 0, 13), length: 29 },
      { startDate: new Date(2025, 11, 16), length: 27 },
    ]
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t('fertility.calendar.title')}</h1>
        <p className="text-muted-foreground">{t('fertility.calendar.description')}</p>
      </div>

      <Alert>
        <AlertDescription className="text-sm">
          ⚠️ {t('fertility.disclaimer')}
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Kalendarz cyklu</CardTitle>
              <CardDescription>
                Wizualizacja twojego cyklu menstruacyjnego
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  cycleDays: mockCycleDays
                }}
                modifiersStyles={{
                  cycleDays: {
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    fontWeight: 'bold'
                  }
                }}
              />
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Legenda</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary" />
                <span className="text-sm">Dni menstruacji</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-primary" />
                <span className="text-sm">Dzisiejszy dzień</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statystyki</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Średnia długość cyklu</p>
                <p className="text-3xl font-bold">{mockStats.averageLength} dni</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Ostatnie cykle:</p>
                <div className="space-y-2">
                  {mockStats.lastCycles.map((cycle, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md text-sm">
                      <span>{cycle.startDate.toLocaleDateString('pl-PL')}</span>
                      <Badge variant="secondary">{cycle.length} dni</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Statystyki są wyłącznie informacyjne i nie stanowią prognozy medycznej.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informacje</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Kalendarz pokazuje historię twoich cykli na podstawie wprowadzonych danych.
              </p>
              <p>
                Regularne zapisywanie informacji pomoże ci lepiej zrozumieć twój organizm.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}