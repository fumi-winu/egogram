import { NextResponse } from "next/server";
import {
  REPORT_PRICE_JPY,
  REPORT_PRODUCT_NAME,
} from "@/lib/report-product";
import {
  buildResultPath,
  parseResultPayload,
  toResultMetadata,
} from "@/lib/result-url";
import { resolveRequestOrigin } from "@/lib/site-url";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    console.error(
      "STRIPE_SECRET_KEY is not set. Put `STRIPE_SECRET_KEY=sk_test_...` in `.env.local` (not the key alone) and restart the server.",
    );
    return NextResponse.json(
      { error: "決済の準備が整っていません。" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストの形式が正しくありません。" },
      { status: 400 },
    );
  }

  const result = parseResultPayload(body);
  if (!result) {
    return NextResponse.json(
      { error: "診断データの形式が正しくありません。" },
      { status: 400 },
    );
  }

  const origin = resolveRequestOrigin(request);

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      locale: "ja",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "jpy",
            unit_amount: REPORT_PRICE_JPY,
            product_data: {
              name: REPORT_PRODUCT_NAME,
            },
          },
        },
      ],
      metadata: toResultMetadata(result),
      success_url: `${origin}/result/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${buildResultPath(result)}`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "決済画面のURLを発行できませんでした。" },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout session creation failed:", error);
    return NextResponse.json(
      { error: "決済セッションの作成に失敗しました。" },
      { status: 502 },
    );
  }
}
