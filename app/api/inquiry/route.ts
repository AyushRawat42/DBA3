import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { createSubmissionItem } from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"
import {
  coachingRegistrationSchema,
  sportsRegistrationSchema,
} from "@/lib/validations"

export const runtime = "nodejs"

const formConfiguration = {
  "athlete-registration-form": {
    label: "Athlete Registration",
    databaseType: "sports",
    schema: sportsRegistrationSchema,
  },
  "coaching-registration-form": {
    label: "Coaching Registration",
    databaseType: "coaching",
    schema: coachingRegistrationSchema,
  },
} as const

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function formatFieldLabel(field: string) {
  return field
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (character) => character.toUpperCase())
}

function renderFieldValue(value: unknown) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No"
  }

  if (typeof value === "string" || typeof value === "number") {
    return escapeHtml(String(value)).replace(/\r?\n/g, "<br>")
  }

  return ""
}

function createEmailHtml(formLabel: string, fields: Record<string, unknown>) {
  const rows = Object.entries(fields)
    .filter(([key, value]) => key !== "_gotcha" && value !== undefined && value !== "")
    .map(
      ([key, value]) => `
        <tr>
          <th scope="row" style="padding:12px 14px;border-bottom:1px solid #e5e7eb;text-align:left;vertical-align:top;color:#374151;font-size:14px;width:38%">
            ${escapeHtml(formatFieldLabel(key))}
          </th>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;word-break:break-word">
            ${renderFieldValue(value)}
          </td>
        </tr>`
    )
    .join("")

  return `
    <!doctype html>
    <html>
      <body style="margin:0;padding:24px 12px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
          <div style="padding:20px 24px;background:#111827;color:#ffffff">
            <p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#d1d5db">Website Inquiry</p>
            <h1 style="margin:0;font-size:21px;line-height:1.35">${escapeHtml(formLabel)}</h1>
          </div>
          <div style="padding:20px 12px">
            <p style="margin:0 12px 16px;font-size:14px;line-height:1.5;color:#4b5563">A new lead was submitted through the ${escapeHtml(formLabel)} form.</p>
            <table role="presentation" style="width:100%;border-collapse:collapse">
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </body>
    </html>`
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON submission" }, { status: 400 })
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
  }

  const payload = body as Record<string, unknown>

  if (
    payload._gotcha !== undefined &&
    payload._gotcha !== null &&
    String(payload._gotcha).trim() !== ""
  ) {
    return NextResponse.json({ ok: true })
  }

  const formType = payload.formType
  if (
    formType !== "athlete-registration-form" &&
    formType !== "coaching-registration-form"
  ) {
    return NextResponse.json({ error: "Invalid form type" }, { status: 400 })
  }

  const configuration = formConfiguration[formType]
  const fields = { ...payload }
  delete fields.formType
  delete fields._gotcha
  const parsed = configuration.schema.safeParse(fields)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const receiverEmail = process.env.CLIENT_RECEIVER_EMAIL

  if (
    !smtpHost ||
    !Number.isInteger(smtpPort) ||
    smtpPort < 1 ||
    smtpPort > 65535 ||
    !smtpUser ||
    !smtpPass ||
    !receiverEmail
  ) {
    console.error("Inquiry email configuration is incomplete or invalid")
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 500 })
  }

  const submitterName =
    "studentFullName" in parsed.data && typeof parsed.data.studentFullName === "string"
      ? parsed.data.studentFullName.replace(/[\r\n]+/g, " ").trim()
      : "Unknown"
  const submitterEmail =
    "email" in parsed.data && typeof parsed.data.email === "string"
      ? parsed.data.email
      : undefined

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await db.send(
      new PutCommand({
        TableName: TABLE_MAIN,
        Item: createSubmissionItem(
          crypto.randomUUID(),
          configuration.databaseType,
          parsed.data
        ),
        ConditionExpression: "attribute_not_exists(PK)",
      })
    )

    await transporter.sendMail({
      from: `"Website Inquiry" <${smtpUser}>`,
      to: receiverEmail,
      ...(submitterEmail ? { replyTo: submitterEmail } : {}),
      subject: `New ${configuration.label} Submission from ${submitterName}`,
      html: createEmailHtml(configuration.label, parsed.data),
    })
  } catch (error) {
    console.error("Inquiry submission delivery error:", error)
    return NextResponse.json(
      { error: "Could not deliver your inquiry. Please try again." },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
