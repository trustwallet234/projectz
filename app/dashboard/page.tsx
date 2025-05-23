import ProtectedRoute from '@/components/ProtectedRoute';
import CardList from '@/components/cards/CardList';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <CardList />
      </div>
    </ProtectedRoute>
  );
}