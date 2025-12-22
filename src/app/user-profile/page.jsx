import Header from '@/components/common/Header';
import UserProfileInteractive from './components/UserProfileInteractive';

export const metadata = {
  title: 'Mi Perfil - ChemClean Commerce',
  description: 'Gestiona tu información personal, direcciones, métodos de pago y configuración de distribuidor en ChemClean Commerce',
};

export default function UserProfilePage() {
  const mockUser = {
    id: 1,
    name: 'Carlos Rodríguez Martínez',
    email: 'carlos.rodriguez@example.com',
    accountType: 'distributor',
  };

  const initialData = {
    user: {
      name: 'Carlos Rodríguez Martínez',
      email: 'carlos.rodriguez@example.com',
      phone: '+34 612 345 678',
      businessName: 'Distribuciones Rodríguez SL',
      taxId: 'B12345678',
      language: 'es',
      emailNotifications: true,
      smsNotifications: false,
      accountType: 'distributor',
    },
    addresses: [
      {
        id: 1,
        label: 'Casa',
        fullName: 'Carlos Rodríguez Martínez',
        street: 'Calle Mayor 123, 2º A',
        city: 'Madrid',
        state: 'Madrid',
        postalCode: '28013',
        country: 'España',
        phone: '+34 612 345 678',
        isDefault: true,
        allowsHazmat: true,
      },
      {
        id: 2,
        label: 'Oficina',
        fullName: 'Distribuciones Rodríguez SL',
        street: 'Polígono Industrial Las Rozas, Nave 45',
        city: 'Las Rozas',
        state: 'Madrid',
        postalCode: '28232',
        country: 'España',
        phone: '+34 916 789 012',
        isDefault: false,
        allowsHazmat: true,
      },
    ],
    paymentMethods: [
      {
        id: 1,
        type: 'card',
        cardNumber: '4532123456789012',
        cardHolder: 'Carlos Rodríguez Martínez',
        expiryMonth: '12',
        expiryYear: 2027,
        isDefault: true,
      },
      {
        id: 2,
        type: 'bank',
        bankName: 'Banco Santander',
        accountNumber: 'ES9121000418450200051332',
        isDefault: false,
      },
    ],
    distributor: {
      level: 'Plata',
      commissionRate: 15,
      commissionPreference: 'bank',
      taxId: 'B12345678',
      marketingConsent: true,
      referralLink: 'https://chemclean.com/ref/carlos-rodriguez',
      autoRenewal: true,
      newsletterFrequency: 'weekly',
      totalSales: 1247,
      teamSize: 23,
      totalCommissions: 18450,
    },
    security: {
      lastPasswordChange: '15/11/2025',
      twoFactorEnabled: true,
      loginHistory: [
        {
          id: 1,
          device: 'Chrome en Windows',
          location: 'Madrid, España',
          ip: '185.45.123.45',
          date: '21/12/2025',
          time: '14:32',
        },
        {
          id: 2,
          device: 'Safari en iPhone',
          location: 'Madrid, España',
          ip: '185.45.123.46',
          date: '20/12/2025',
          time: '09:15',
        },
        {
          id: 3,
          device: 'Chrome en Windows',
          location: 'Madrid, España',
          ip: '185.45.123.45',
          date: '19/12/2025',
          time: '16:48',
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} cartItemCount={3} />

      <main className="w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            Mi Perfil
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Gestiona tu información personal y configuración de cuenta
          </p>
        </div>

        <UserProfileInteractive initialData={initialData} />
      </main>
    </div>
  );
}