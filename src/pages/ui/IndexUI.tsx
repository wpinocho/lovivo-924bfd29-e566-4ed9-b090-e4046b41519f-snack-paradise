import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section - Los Carnales Style */}
      <section className="relative gradient-carnales py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-6 animate-bounce-slow">
            <Sparkles className="h-12 w-12 text-yellow-300 mx-auto" />
          </div>
          
          <h1 className="hero-title text-white mb-6 leading-tight">
            ¡Bienvenido a<br />
            <span className="text-carnales-yellow">Los Carnales!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white font-bold mb-8 max-w-3xl mx-auto">
            Los chicharrones de maíz más sabrosos y crujientes.<br />
            ¡Perfectos para compartir con tus carnales! 🌽✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-carnales text-lg px-8 py-6"
              onClick={() => {
                const productsSection = document.getElementById('productos');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Todos los Sabores
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="bg-carnales-yellow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌽</span>
              <span className="font-bold text-lg">100% Maíz Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🔥</span>
              <span className="font-bold text-lg">Sabores Únicos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎉</span>
              <span className="font-bold text-lg">Para Compartir</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16 gradient-carnales-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title text-carnales-purple mb-4">
                Nuestras Colecciones
              </h2>
              <p className="text-lg text-gray-700">
                Descubre todos nuestros deliciosos sabores
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <div key={collection.id} className="transform hover:scale-105 transition-transform duration-300">
                  <CollectionCard 
                    collection={collection} 
                    onViewProducts={handleViewCollectionProducts} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="productos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="section-title text-carnales-orange mb-2">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Colección'}` 
                  : '🌟 Nuestros Sabores 🌟'
                }
              </h2>
              <p className="text-lg text-gray-600">
                Chicharrones de maíz con sabores que te van a encantar
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="border-2 border-carnales-purple text-carnales-purple hover:bg-carnales-purple hover:text-white font-bold"
              >
                Ver Todos los Productos
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gradient-carnales-soft rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 gradient-carnales-soft rounded-3xl">
              <p className="text-2xl font-bold text-carnales-purple mb-2">
                ¡Ups! No hay productos disponibles
              </p>
              <p className="text-gray-600">
                Pronto tendremos más sabores deliciosos para ti
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 gradient-carnales">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-white text-center mb-12">
            ¿Por Qué Los Carnales?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-8 text-center card-carnales">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-carnales-purple mb-3">
                Sabor Auténtico
              </h3>
              <p className="text-gray-700">
                Recetas únicas que combinan tradición mexicana con sabores innovadores
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur rounded-2xl p-8 text-center card-carnales">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-carnales-orange mb-3">
                Calidad Premium
              </h3>
              <p className="text-gray-700">
                Ingredientes naturales y proceso de elaboración cuidadoso
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur rounded-2xl p-8 text-center card-carnales">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-carnales-blue mb-3">
                Para Compartir
              </h3>
              <p className="text-gray-700">
                El tamaño perfecto para disfrutar con familia y amigos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};