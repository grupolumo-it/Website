import Header from '@/components/common/Header';
import RegistrationInteractive from './components/RegistrationInteractive';

export const metadata = {
  title: 'Registro de Usuario - ChemClean Commerce',
  description: 'Crea tu cuenta en ChemClean Commerce como cliente o distribuidor. Accede a productos químicos de limpieza profesionales y oportunidades de negocio.'
};

export default function UserRegistrationPage() {
  const mockValidReferralCodes = [
    { code: 'DIST-123456', name: 'María González' },
    { code: 'DIST-789012', name: 'Carlos Ruiz' },
    { code: 'DIST-345678', name: 'Ana Martínez' },
    { code: 'DIST-901234', name: 'Roberto Sánchez' }
  ];

  const pageData = {
    validReferralCodes: mockValidReferralCodes
  };

  return (
    <>
      <Header user={null} cartItemCount={0} />
      <RegistrationInteractive initialData={pageData} />
    </>
  );
}