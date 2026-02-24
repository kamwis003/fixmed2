import { useDocumentTitle } from '@/hooks/use-document-title'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, BookOpen, FileText, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/paths'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslation } from 'react-i18next'

export const FertilityDashboard = () => {
  const { t } = useTranslation()
  useDocumentTitle('fertility.dashboard.title')

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t('fertility.dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('fertility.dashboard.description')}</p>
      </div>

      <Alert>
        <AlertDescription className="text-sm">
          ⚠️ {t('fertility.disclaimer')}
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('fertility.dashboard.tracking')}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {t('fertility.dashboard.trackingDescription')}
            </CardDescription>
            <Button asChild className="w-full">
              <Link to={ROUTES.FERTILITY_TRACKING}>
                {t('fertility.dashboard.goToTracking')}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('fertility.dashboard.calendar')}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {t('fertility.dashboard.calendarDescription')}
            </CardDescription>
            <Button asChild className="w-full" variant="outline">
              <Link to={ROUTES.FERTILITY_CALENDAR}>
                {t('fertility.dashboard.viewCalendar')}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('fertility.dashboard.education')}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {t('fertility.dashboard.educationDescription')}
            </CardDescription>
            <Button asChild className="w-full" variant="outline">
              <Link to={ROUTES.FERTILITY_EDUCATION}>
                {t('fertility.dashboard.learnMore')}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('fertility.dashboard.consultation')}
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {t('fertility.dashboard.consultationDescription')}
            </CardDescription>
            <Button asChild className="w-full" variant="default">
              <Link to={ROUTES.FERTILITY_CONSULTATION}>
                {t('fertility.dashboard.requestConsultation')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}