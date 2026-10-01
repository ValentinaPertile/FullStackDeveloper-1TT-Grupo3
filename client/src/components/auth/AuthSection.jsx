export default function AuthSection({ children }) {
  return (
    /** Fondo texturizado */
    <main className="min-h-screen w-full bg-[var(--alabastro)] flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-[var(--alabastro)] bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')] bg-center opacity-30 pointer-events-none" />

      {children}
    </main>
  );
}
