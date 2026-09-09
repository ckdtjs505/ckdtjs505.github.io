import ClientPage from './client-page';

export function generateStaticParams() {
  return [{ tina: [] }];
}

export default function TinaAdminPage() {
  return <ClientPage />;
}
