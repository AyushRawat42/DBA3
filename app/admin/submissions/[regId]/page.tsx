interface Props {
  params: { regId: string }
}

export default async function AdminSubmissionDetailPage({ params }: Props) {
  const { regId } = params
  // Later: fetch from /api/admin/submissions/[regId]
  const submission = null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary">
        Submission {regId}
      </h2>
      <p className="text-sm text-muted-foreground">
        This page will show all form fields and attached documents for the
        selected registration once backend is connected.
      </p>
    </div>
  )
}
