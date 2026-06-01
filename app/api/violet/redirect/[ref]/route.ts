/**
 * GET /api/violet/redirect/[ref]
 *
 * VioletMediaPay sends the user here after they finish (or abandon) the
 * payment on the gateway's hosted page. We bounce them to our own deposit
 * detail page so they see a branded experience either way.
 *
 * The status itself is updated by the webhook at /api/violet/callback, which
 * is more authoritative than what the user's browser sees.
 */
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { ref: string } },
) {
  const url = new URL(`/dashboard/deposit/${params.ref}`, req.url);
  return NextResponse.redirect(url);
}
