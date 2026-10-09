// Die Seite ist eine "use client"-Komponente und kann selbst keine Metadata
// exportieren. Dieses Layout bindet die daneben liegende metadata.ts ein -
// ohne sie lief die Route mit dem Default-Titel aus dem Root-Layout.
export { metadata } from './metadata';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
