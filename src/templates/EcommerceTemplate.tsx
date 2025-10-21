import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white shadow-md ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <BrandLogoLeft />
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-carnales-purple font-semibold transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-carnales-purple font-semibold transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-carnales-pink/10"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-6 w-6 text-carnales-purple" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-carnales-pink text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-carnales-purple">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`gradient-carnales text-white py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <BrandLogoLeft />
            </div>
            <p className="text-white/90 font-semibold">
              Los chicharrones de maíz más sabrosos 🌽
            </p>
            <p className="text-white/80 mt-2">
              ¡Comparte con tus carnales!
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-carnales-yellow">Enlaces</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-white/90 hover:text-carnales-yellow transition-colors font-semibold"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block text-white/90 hover:text-carnales-yellow transition-colors font-semibold"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-carnales-yellow">Síguenos</h3>
            <SocialLinks />
            <p className="text-white/80 mt-4 text-sm">
              Comparte tus momentos con #LosCarnales
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-white/80 font-semibold">
            &copy; 2024 Los Carnales. Todos los derechos reservados.
          </p>
          <p className="text-white/70 text-sm mt-2">
            Hecho con ❤️ para compartir con tus carnales
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}