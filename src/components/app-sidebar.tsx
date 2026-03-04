import {
  LayoutDashboard,
  Heart,
  Activity,
} from 'lucide-react'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import * as React from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/assets/logo'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { LanguageSwitcher } from './language-switcher'
import { Skeleton } from './ui/skeleton'
import { ROUTES } from '../routes/paths'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, userData, isUserLoading } = useAuth()
  const { t } = useTranslation()
  const { setOpenMobile } = useSidebar()

  const fertilityNavData = [
    {
      title: t('pages.fertility'),
      url: ROUTES.FERTILITY,
      icon: Heart,
      items: [
        { url: ROUTES.FERTILITY_TRACKING, title: t('fertility.tracking.title') },
        { url: ROUTES.FERTILITY_CALENDAR, title: t('fertility.calendar.title') },
        { url: ROUTES.FERTILITY_EDUCATION, title: t('fertility.education.title') },
        { url: ROUTES.FERTILITY_CONSULTATION, title: t('fertility.consultation.title') },
      ],
    },
  ]

  const endometriosisNavData = [
    {
      title: t('pages.endometriosis'),
      url: ROUTES.ENDOMETRIOSIS,
      icon: Activity,
      items: [
        { url: ROUTES.ENDOMETRIOSIS_INFO, title: t('endometriosis.info.title') },
        { url: ROUTES.ENDOMETRIOSIS_DIARY, title: t('endometriosis.diary.title') },
        { url: ROUTES.ENDOMETRIOSIS_VISUALIZATION, title: t('endometriosis.visualization.title') },
        { url: ROUTES.ENDOMETRIOSIS_ADVICE, title: t('endometriosis.advice.title') },
      ],
    },
  ]

  const platformNavData = [
    {
      title: t('pages.dashboard'),
      url: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
    },
  ]

  const navUserData = {
    firstName: userData?.firstName || user?.user_metadata.first_name || '',
    lastName: userData?.lastName || user?.user_metadata.last_name || '',
    email: userData?.email || user?.email || '',
    avatar: userData?.avatar || user?.user_metadata.avatar_url || '',
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex h-16 items-center justify-between p-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-3">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-auto shrink-0 group-data-[collapsible=icon]:h-7" />
            <h2 className="whitespace-nowrap text-lg font-semibold group-data-[collapsible=icon]:hidden">
              Virtual Fixmed
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 md:hidden"
            onClick={() => setOpenMobile(false)}
          >
            <X className="size-6" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={fertilityNavData} label={t('navigation.fertility')} />
        <NavMain items={endometriosisNavData} label={t('navigation.endometriosis')} />
        <NavMain items={platformNavData} label={t('navigation.other')} />
      </SidebarContent>
      <SidebarFooter className="p-0 md:p-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center p-2 md:hidden">
            <React.Suspense fallback={<Skeleton className="h-10 w-32" />}>
              <LanguageSwitcher />
            </React.Suspense>
          </div>
          {isUserLoading ? (
            <div className="flex items-center gap-2 p-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ) : (
            <NavUser user={navUserData} />
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}