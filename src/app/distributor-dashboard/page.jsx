import Header from '@/components/common/Header';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata = {
  title: 'Panel de Distribuidor - ChemClean Commerce',
  description: 'Gestiona tu red de distribución, realiza seguimiento de ventas y comisiones en ChemClean Commerce'
};

export default function DistributorDashboard() {
  const mockUser = {
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@chemclean.es",
    accountType: "distributor"
  };

  const dashboardData = {
    metrics: [
      {
        id: 1,
        title: "Ventas Mensuales",
        value: "€12.450",
        subtitle: "Diciembre 2025",
        icon: "CurrencyEuroIcon",
        trend: "up",
        trendValue: "+18%",
        bgColor: "bg-card"
      },
      {
        id: 2,
        title: "Comisiones Ganadas",
        value: "€2.490",
        subtitle: "Este mes",
        icon: "BanknotesIcon",
        trend: "up",
        trendValue: "+22%",
        bgColor: "bg-card"
      },
      {
        id: 3,
        title: "Tamaño del Equipo",
        value: "28",
        subtitle: "Distribuidores activos",
        icon: "UsersIcon",
        trend: "up",
        trendValue: "+4",
        bgColor: "bg-card"
      },
      {
        id: 4,
        title: "Rango Actual",
        value: "Oro",
        subtitle: "85% a Platino",
        icon: "TrophyIcon",
        trend: "neutral",
        trendValue: "",
        bgColor: "bg-card"
      }
    ],
    salesData: [
      { month: "Jul", sales: 8500, commission: 1700 },
      { month: "Ago", sales: 9200, commission: 1840 },
      { month: "Sep", sales: 10100, commission: 2020 },
      { month: "Oct", sales: 9800, commission: 1960 },
      { month: "Nov", sales: 11200, commission: 2240 },
      { month: "Dic", sales: 12450, commission: 2490 }
    ],
    distributors: [
      {
        id: 1,
        name: "María González",
        email: "maria.gonzalez@email.com",
        level: 1,
        monthlySales: 4200,
        commission: 840,
        status: "active"
      },
      {
        id: 2,
        name: "Juan Martínez",
        email: "juan.martinez@email.com",
        level: 1,
        monthlySales: 3800,
        commission: 760,
        status: "active"
      },
      {
        id: 3,
        name: "Ana López",
        email: "ana.lopez@email.com",
        level: 2,
        monthlySales: 2100,
        commission: 420,
        status: "active"
      },
      {
        id: 4,
        name: "Pedro Sánchez",
        email: "pedro.sanchez@email.com",
        level: 2,
        monthlySales: 1900,
        commission: 380,
        status: "inactive"
      },
      {
        id: 5,
        name: "Laura Fernández",
        email: "laura.fernandez@email.com",
        level: 1,
        monthlySales: 3500,
        commission: 700,
        status: "active"
      }
    ],
    activities: [
      {
        id: 1,
        type: "enrollment",
        description: "Nuevo distribuidor: Laura Fernández se unió a tu equipo",
        time: "Hace 2 horas"
      },
      {
        id: 2,
        type: "sale",
        description: "María González completó una venta de €850 en productos de limpieza industrial",
        time: "Hace 5 horas"
      },
      {
        id: 3,
        type: "achievement",
        description: "¡Felicidades! Has alcanzado €10,000 en ventas mensuales",
        time: "Hace 1 día"
      },
      {
        id: 4,
        type: "promotion",
        description: "Nueva promoción disponible: 15% de descuento en desinfectantes",
        time: "Hace 2 días"
      },
      {
        id: 5,
        type: "sale",
        description: "Juan Martínez realizó un pedido mayorista de €1,200",
        time: "Hace 3 días"
      }
    ],
    networkData: {
      id: 1,
      name: "Carlos Rodríguez (Tú)",
      level: 0,
      sales: 12450,
      teamSize: 28,
      performance: "high",
      children: [
        {
          id: 2,
          name: "María González",
          level: 1,
          sales: 4200,
          teamSize: 8,
          performance: "high",
          children: [
            {
              id: 6,
              name: "Ana López",
              level: 2,
              sales: 2100,
              teamSize: 3,
              performance: "medium",
              children: []
            },
            {
              id: 7,
              name: "Pedro Sánchez",
              level: 2,
              sales: 1900,
              teamSize: 2,
              performance: "low",
              children: []
            }
          ]
        },
        {
          id: 3,
          name: "Juan Martínez",
          level: 1,
          sales: 3800,
          teamSize: 6,
          performance: "high",
          children: [
            {
              id: 8,
              name: "Carmen Ruiz",
              level: 2,
              sales: 1600,
              teamSize: 2,
              performance: "medium",
              children: []
            }
          ]
        },
        {
          id: 4,
          name: "Laura Fernández",
          level: 1,
          sales: 3500,
          teamSize: 5,
          performance: "medium",
          children: []
        }
      ]
    },
    commissionRates: {
      base: 10,
      silver: 15,
      gold: 20,
      platinum: 25
    },
    quickActions: [
      {
        id: 1,
        title: "Invitar Distribuidor",
        description: "Comparte tu enlace de referido",
        icon: "UserPlusIcon"
      },
      {
        id: 2,
        title: "Material de Marketing",
        description: "Descarga catálogos y folletos",
        icon: "DocumentTextIcon"
      },
      {
        id: 3,
        title: "Capacitación",
        description: "Accede a videos y recursos",
        icon: "AcademicCapIcon"
      },
      {
        id: 4,
        title: "Soporte",
        description: "Contacta con tu mentor",
        icon: "ChatBubbleLeftRightIcon"
      }
    ],
    rankProgress: {
      currentRank: "Oro",
      nextRank: "Platino",
      progress: 85,
      requirements: [
        {
          description: "Alcanzar €15,000 en ventas mensuales",
          completed: false,
          current: "€12,450",
          target: "€15,000"
        },
        {
          description: "Tener al menos 30 distribuidores activos",
          completed: false,
          current: "28",
          target: "30"
        },
        {
          description: "Mantener 3 meses consecutivos de crecimiento",
          completed: true
        },
        {
          description: "Completar capacitación de liderazgo avanzado",
          completed: true
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} cartItemCount={0} />
      
      <main className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            Panel de Distribuidor
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            Gestiona tu red, realiza seguimiento de ventas y maximiza tus comisiones
          </p>
        </div>

        <DashboardInteractive initialData={dashboardData} />
      </main>
    </div>
  );
}