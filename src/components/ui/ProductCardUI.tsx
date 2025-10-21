import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Este componente solo maneja la presentación del ProductCard.
 * Toda la lógica viene del HeadlessProductCard.
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-white border-2 border-carnales-purple/20 hover:border-carnales-purple hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-gradient-carnales-soft overflow-hidden relative group">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-6xl">🌽</span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-carnales-pink text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                      -{logic.discountPercentage}% OFF
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-carnales-yellow text-carnales-purple text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                      ⭐ Destacado
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-gray-600 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                      Agotado
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-carnales-purple font-bold text-lg mb-2 line-clamp-2">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </div>
            </Link>

            {logic.hasVariants && logic.options && (
              <div className="px-4 pb-3 space-y-2">
                {logic.options.map((opt) => (
                  <div key={opt.id}>
                    <div className="text-xs font-bold text-carnales-purple mb-1">{opt.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                        const isSelected = logic.selected[opt.name] === val
                        const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                        if (swatch) {
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              title={`${opt.name}: ${val}`}
                              className={`h-7 w-7 rounded-full border-2 ${
                                isSelected ? 'border-carnales-purple ring-2 ring-carnales-purple/30' : 'border-gray-300'
                              } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                              style={{ backgroundColor: swatch }}
                              aria-label={`${opt.name}: ${val}`}
                            />
                          )
                        }

                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => logic.handleOptionChange(opt.name, val)}
                            className={`border-2 rounded-lg px-3 py-1 text-sm font-bold transition-all ${
                              isSelected 
                                ? 'border-carnales-purple bg-carnales-purple text-white shadow-md' 
                                : logic.selected[opt.name] && !isSelected
                                  ? 'border-gray-300 bg-white text-gray-500 opacity-40'
                                  : 'border-carnales-purple/30 bg-white text-carnales-purple hover:bg-carnales-purple/10'
                            }`}
                            aria-pressed={isSelected}
                            aria-label={`${opt.name}: ${val}`}
                            title={`${opt.name}: ${val}`}
                          >
                            {val}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="px-4 pb-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-carnales-purple font-black text-xl">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-gray-400 text-sm line-through">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logic.onAddToCartSuccess()
                  logic.handleAddToCart()
                }}
                disabled={!logic.canAddToCart}
                className="bg-gradient-to-r from-carnales-pink to-carnales-purple text-white border-0 font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {logic.inStock ? '🛒 Agregar' : 'Agotado'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}