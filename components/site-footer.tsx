import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">Aspire Academy</p>
          <p className="mt-3 max-w-md text-sm text-secondary-foreground/75">
            Admissions and coaching support for Aspire Sports Academy and Aspire Defence Academy in Dehradun.
          </p>
        </div>
        <div>
          <p className="font-semibold">Academies</p>
          <div className="mt-3 grid gap-2 text-sm text-secondary-foreground/75">
            <Link href="/sports-academy" className="hover:text-secondary-foreground">
              Sports Academy
            </Link>
            <Link href="/defence-academy" className="hover:text-secondary-foreground">
              Defence Academy
            </Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">Admissions</p>
          <div className="mt-3 grid gap-2 text-sm text-secondary-foreground/75">
            <Link href="/sports-registration" className="hover:text-secondary-foreground">
              Sports Registration
            </Link>
            <Link href="/coaching-registration" className="hover:text-secondary-foreground">
              Coaching Registration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
