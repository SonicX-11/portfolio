"use client";

export default function Footer() {
  return (
    <footer className="border-t border-line py-6">
      <div className="container-x flex flex-col items-center justify-between gap-2 font-body text-[11px] text-muted md:flex-row">
        <p>© {new Date().getFullYear()} Ebrahim Fadel</p>
        <p>Senior Video Editor</p>
      </div>
    </footer>
  );
}
