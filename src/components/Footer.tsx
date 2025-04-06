export default function Footer() {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-secondary">
          <p>© {new Date().getFullYear()} iTech Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 