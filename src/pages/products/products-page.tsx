import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Package, AlertCircle } from 'lucide-react'
import { ROUTES } from '@/routes/paths'
import { apiRequest } from '@/utils/api'

interface IProduct {
  id: string
  slug: string
  title: string
  description?: string
  price?: number
  isPurchased?: boolean
}

interface IProductsResponse {
  data: IProduct[]
}

type TTab = 'catalog' | 'my'

export const ProductsPage = () => {
  useDocumentTitle('pages.products.title')
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeTab: TTab = location.pathname.includes(ROUTES.PRODUCTS.MY) ? 'my' : 'catalog'

  useEffect(() => {
    let cancelled = false
    const fetchProducts = async () => {
      setError(null)
      setIsLoading(true)
      try {
        const res = await apiRequest<IProductsResponse>('/products', { method: 'GET' })
        if (!cancelled) setProducts(res.data ?? [])
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : t('pages.products.error')
          setError(msg)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    void fetchProducts()
    return () => {
      cancelled = true
    }
  }, [t])

  const handleTabChange = (value: string) => {
    const tab = value as TTab
    const path = tab === 'my' ? ROUTES.PRODUCTS.MY : ROUTES.PRODUCTS.CATALOG
    navigate(path, { replace: true })
  }

  const catalogProducts = products
  const myProducts = products.filter((p) => p.isPurchased === true)

  const renderList = (items: IProduct[]) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      )
    }

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground mt-16 gap-4">
          <Package className="h-16 w-16 text-gray-300" />
          <p className="text-lg font-medium">
            {activeTab === 'my'
              ? t('pages.products.noPurchasedProducts')
              : t('pages.products.noResults')}
          </p>
          <p className="text-sm">
            {activeTab === 'my'
              ? t('pages.products.noPurchasedProductsHint')
              : t('pages.products.noResultsHint')}
          </p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(ROUTES.PRODUCTS.DETAILS(product.slug))}
          >
            <h3 className="font-semibold text-base mb-2">{product.title}</h3>
            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{t('pages.products.title')}</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t('pages.products.backendUnavailable')}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="catalog">{t('pages.products.catalog')}</TabsTrigger>
          <TabsTrigger value="my">{t('pages.products.my')}</TabsTrigger>
        </TabsList>
        <TabsContent value="catalog">{renderList(catalogProducts)}</TabsContent>
        <TabsContent value="my">{renderList(myProducts)}</TabsContent>
      </Tabs>
    </div>
  )
}
