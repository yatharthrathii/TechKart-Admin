const AdminFooter = () => {
  return (
    <footer className="bg-stone-100 text-stone-700 border-t border-stone-300">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Admin Panel • Built by <span className="font-medium">Yatharth</span>
        </p>
        <p className="text-xs mt-1 text-stone-500">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AdminFooter;
