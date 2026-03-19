export default function AdminSubmissionsPage() {
  // Later: fetch from /api/admin/submissions (DynamoDB queue)
  const items: any[] = []

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary">Submissions</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No submissions yet. This will list athlete/coach/academy registrations once backend is wired.
        </p>
      ) : (
        <div className="overflow-x-auto rounded border">
          {/* table rendering here when API exists */}
        </div>
      )}
    </div>
  )
}
