import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [spiceLevel, setSpiceLevel] = useState(1);
  const [isConstructorOpen, setIsConstructorOpen] = useState(false);

  const bases = [
    { id: 'tonkotsu', name: 'Тонкоцу', price: 450, spicy: 1 },
    { id: 'miso', name: 'Мисо', price: 420, spicy: 2 },
    { id: 'shoyu', name: 'Сёю', price: 400, spicy: 1 },
    { id: 'spicy', name: 'Острый', price: 480, spicy: 4 }
  ];

  const toppings = [
    { id: 'egg', name: '🥚 Яйцо', price: 50 },
    { id: 'pork', name: '🥩 Мясо', price: 120 },
    { id: 'seaweed', name: '🌿 Водоросли', price: 40 },
    { id: 'corn', name: '🌽 Кукуруза', price: 30 },
    { id: 'onion', name: '🧅 Лук', price: 20 }
  ];

  const addTopping = (toppingId: string) => {
    if (!selectedToppings.includes(toppingId)) {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const removeTopping = (toppingId: string) => {
    setSelectedToppings(selectedToppings.filter(id => id !== toppingId));
  };

  const calculateTotal = () => {
    const basePrice = bases.find(b => b.id === selectedBase)?.price || 0;
    const toppingsPrice = selectedToppings.reduce((sum, toppingId) => {
      const topping = toppings.find(t => t.id === toppingId);
      return sum + (topping?.price || 0);
    }, 0);
    return basePrice + toppingsPrice;
  };

  const getSpiceEmoji = (level: number) => {
    const emojis = ['😋', '🌶️', '🔥', '💀', '👻'];
    return emojis[level - 1] || '😋';
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-white font-plex">
      {/* Header */}
      <header className="relative overflow-hidden p-4">
        <div className="glassmorphism rounded-2xl p-6 neon-glow">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 font-plex-bold bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">
              РАМЕН СТРИТ
            </h1>
            <p className="text-lg opacity-80">Киберпанк лапшичная будущего</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="p-4 mb-6">
        <div className="relative rounded-3xl overflow-hidden glassmorphism electric-glow">
          <img 
            src="/img/77ed2039-aa00-481c-bdfb-7c70ee5c9dd5.jpg" 
            alt="Рамен" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold mb-2 font-plex-bold">Собери свой идеальный рамен</h2>
            <Button 
              onClick={() => setIsConstructorOpen(true)}
              className="pulse-neon bg-gradient-to-r from-neon-pink to-electric-blue text-white rounded-2xl px-8 py-3 font-bold"
            >
              🍜 СОБРАТЬ РАМЕН
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Menu */}
      <section className="p-4 mb-6">
        <h3 className="text-xl font-bold mb-4 font-plex-bold">Популярные варианты</h3>
        <div className="space-y-3">
          {bases.map((base) => (
            <Card key={base.id} className="glassmorphism p-4 border-0">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg">{base.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {getSpiceEmoji(base.spicy)} {base.spicy}/5
                    </Badge>
                    <span className="text-neon-pink font-bold">{base.price}₽</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-electric-blue hover:bg-electric-blue/80 rounded-xl"
                  onClick={() => {
                    setSelectedBase(base.id);
                    setIsConstructorOpen(true);
                  }}
                >
                  Выбрать
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Constructor Modal */}
      {isConstructorOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 p-4">
          <div className="bg-cyber-dark rounded-3xl max-h-full overflow-y-auto glassmorphism neon-glow">
            {/* Constructor Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-plex-bold">Конструктор рамена</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsConstructorOpen(false)}
                  className="text-cyber-white hover:bg-white/10"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Base Selection */}
              <div>
                <h3 className="text-lg font-bold mb-3 font-plex-bold">1. Выбери основу</h3>
                <div className="grid grid-cols-2 gap-3">
                  {bases.map((base) => (
                    <Card 
                      key={base.id}
                      className={`p-3 cursor-pointer transition-all border-2 ${
                        selectedBase === base.id 
                          ? 'border-neon-pink neon-glow' 
                          : 'border-white/20 glassmorphism'
                      }`}
                      onClick={() => setSelectedBase(base.id)}
                    >
                      <div className="text-center">
                        <h4 className="font-bold">{base.name}</h4>
                        <div className="text-sm mt-1">
                          {getSpiceEmoji(base.spicy)} {base.spicy}/5
                        </div>
                        <div className="text-neon-pink font-bold mt-1">{base.price}₽</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Toppings Selection */}
              <div>
                <h3 className="text-lg font-bold mb-3 font-plex-bold">2. Добавь топпинги</h3>
                <div className="grid grid-cols-2 gap-3">
                  {toppings.map((topping) => (
                    <Card 
                      key={topping.id}
                      className={`p-3 cursor-pointer transition-all border-2 ${
                        selectedToppings.includes(topping.id)
                          ? 'border-electric-blue electric-glow'
                          : 'border-white/20 glassmorphism'
                      }`}
                      onClick={() => 
                        selectedToppings.includes(topping.id) 
                          ? removeTopping(topping.id)
                          : addTopping(topping.id)
                      }
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{topping.name.split(' ')[0]}</div>
                        <h4 className="font-bold text-sm">{topping.name.split(' ')[1]}</h4>
                        <div className="text-electric-blue font-bold mt-1">+{topping.price}₽</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div>
                <h3 className="text-lg font-bold mb-3 font-plex-bold">3. Уровень остроты</h3>
                <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSpiceLevel(Math.max(1, spiceLevel - 1))}
                    className="text-cyber-white"
                  >
                    <Icon name="Minus" size={20} />
                  </Button>
                  <div className="text-center">
                    <div className="text-3xl mb-1">{getSpiceEmoji(spiceLevel)}</div>
                    <div className="text-sm">{spiceLevel}/5</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSpiceLevel(Math.min(5, spiceLevel + 1))}
                    className="text-cyber-white"
                  >
                    <Icon name="Plus" size={20} />
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              {selectedBase && (
                <div className="glassmorphism rounded-2xl p-4 border border-neon-pink/30">
                  <h3 className="font-bold mb-3 font-plex-bold">Твой рамен:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{bases.find(b => b.id === selectedBase)?.name}</span>
                      <span className="text-neon-pink">{bases.find(b => b.id === selectedBase)?.price}₽</span>
                    </div>
                    {selectedToppings.map(toppingId => {
                      const topping = toppings.find(t => t.id === toppingId);
                      return (
                        <div key={toppingId} className="flex justify-between">
                          <span>{topping?.name}</span>
                          <span className="text-electric-blue">+{topping?.price}₽</span>
                        </div>
                      );
                    })}
                    <div className="border-t border-white/20 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">
                          {calculateTotal()}₽
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fixed Bottom Button */}
            <div className="sticky bottom-0 p-6 bg-cyber-dark border-t border-white/20">
              <Button 
                disabled={!selectedBase}
                className="w-full pulse-neon bg-gradient-to-r from-neon-pink to-electric-blue text-white rounded-2xl py-4 font-bold text-lg disabled:opacity-50"
                onClick={() => {
                  // Here would be order logic
                  alert(`Заказ на ${calculateTotal()}₽ оформлен! 🚀`);
                  setIsConstructorOpen(false);
                }}
              >
                🛒 В КОРЗИНУ • {calculateTotal()}₽
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section className="p-4 mb-6">
        <Card className="glassmorphism p-6 border-0">
          <div className="flex items-center gap-4">
            <img 
              src="/img/0bf520ee-701f-478d-a41b-8f74b4b26c7a.jpg" 
              alt="Шеф-повар" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold font-plex-bold">Мастер Хироши</h3>
              <p className="text-sm opacity-80">15 лет опыта • Токио → Москва</p>
              <p className="text-xs mt-1">"Каждая порция — это космическое путешествие вкуса"</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Delivery Info */}
      <section className="p-4 mb-20">
        <h3 className="text-xl font-bold mb-4 font-plex-bold">Доставка</h3>
        <div className="grid grid-cols-3 gap-3">
          <Card className="glassmorphism p-3 text-center border-0">
            <Icon name="Clock" size={24} className="mx-auto mb-2 text-electric-blue" />
            <div className="text-sm font-bold">25-35 мин</div>
            <div className="text-xs opacity-70">Время доставки</div>
          </Card>
          <Card className="glassmorphism p-3 text-center border-0">
            <Icon name="Truck" size={24} className="mx-auto mb-2 text-neon-pink" />
            <div className="text-sm font-bold">Бесплатно</div>
            <div className="text-xs opacity-70">От 800₽</div>
          </Card>
          <Card className="glassmorphism p-3 text-center border-0">
            <Icon name="MapPin" size={24} className="mx-auto mb-2 text-electric-blue" />
            <div className="text-sm font-bold">По всей Москве</div>
            <div className="text-xs opacity-70">Зона доставки</div>
          </Card>
        </div>
      </section>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-cyber-dark/90 backdrop-blur-md border-t border-white/20">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="text-cyber-white flex-col h-auto p-2"
          >
            <Icon name="Home" size={20} />
            <span className="text-xs mt-1">Главная</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-cyber-white flex-col h-auto p-2"
          >
            <Icon name="Search" size={20} />
            <span className="text-xs mt-1">Поиск</span>
          </Button>
          <Button 
            onClick={() => setIsConstructorOpen(true)}
            className="bg-gradient-to-r from-neon-pink to-electric-blue rounded-full p-4 pulse-neon"
          >
            <Icon name="Plus" size={24} />
          </Button>
          <Button 
            variant="ghost" 
            className="text-cyber-white flex-col h-auto p-2"
          >
            <Icon name="ShoppingCart" size={20} />
            <span className="text-xs mt-1">Корзина</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-cyber-white flex-col h-auto p-2"
          >
            <Icon name="User" size={20} />
            <span className="text-xs mt-1">Профиль</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;