import { Link, Outlet, useLocation } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { ROUTES } from "@/routes/paths";
import { useAuth } from "@/hooks/use-auth";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

function MobileMenuButton() {
  const { setOpenMobile } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="md:hidden p-0"
      onClick={() => setOpenMobile(true)}
    >
      <Menu className="size-6" />
      <span className="sr-only">Open menu</span>
    </Button>
  );
}

export const DashboardLayout = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useIsMobile();

  const breadcrumbItems = useMemo(() => {
    if (pathnames.length === 0) {
      return [{ name: t("pages.dashboard"), to: ROUTES.dashboard }];
    }

    return [];
  }, [t, pathnames]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
            <div className="flex items-center gap-2">
              <MobileMenuButton />
              <div className="hidden items-center gap-2 md:flex">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbItems.map((item, index) => {
                      const last = index === breadcrumbItems.length - 1;
                      return (
                        <React.Fragment key={`${item.to}-${index}`}>
                          <BreadcrumbItem>
                            {last ? (
                              <BreadcrumbPage className="font-bold">
                                {item.name}
                              </BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink asChild>
                                <Link to={item.to}>{item.name}</Link>
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {!last && <BreadcrumbSeparator />}
                        </React.Fragment>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isMobile && (
                <React.Suspense fallback={<Skeleton className="h-10 w-32" />}>
                  <LanguageSwitcher />
                </React.Suspense>
              )}
              <ModeToggle />
              {!isMobile && (
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut className="size-5" />
                </Button>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div>
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
