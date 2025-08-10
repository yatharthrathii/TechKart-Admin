import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10">
        <motion.h2
          className="text-3xl font-semibold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">Welcome, Admin</div>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            to="/admin/products"
            title="Manage Products"
            description="View, add, edit, or delete products."
            delay={0.1}
          />
          <DashboardCard
            to="/admin/categories"
            title="Manage Categories"
            description="Add and organize product categories."
            delay={0.2}
          />
          <DashboardCard
            to="/admin/orders"
            title="Manage Orders"
            description="Track and update user orders."
            delay={0.3}
          />
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({ to, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ scale: 1.02 }}
  >
    <Link
      to={to}
      className="block p-6 bg-white rounded-2xl shadow-md border border-stone-300 hover:bg-stone-50 transition"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-stone-600">{description}</p>
    </Link>
  </motion.div>
);

export default Dashboard;
