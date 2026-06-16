import type { APIRoute } from "astro";

export const prerender = false;

interface RSVPPayload {
  name: string;
  attending: "yes" | "no";
  plus_one?: string | null;
  meal_pref?: string | null;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const db = (locals as any).runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: "Database not configured." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: RSVPPayload;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  const { name, attending, plus_one, meal_pref } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return json({ error: "Name is required." }, 400);
  }
  if (attending !== "yes" && attending !== "no") {
    return json({ error: "attending must be 'yes' or 'no'." }, 400);
  }

  const cleanName    = name.trim().slice(0, 200);
  const cleanPlusOne = typeof plus_one === "string" ? plus_one.trim().slice(0, 200) : null;
  const cleanMeal    = typeof meal_pref === "string" ? meal_pref.trim().slice(0, 100) : null;

  try {
    await db
      .prepare(
        `INSERT INTO rsvps (name, attending, plus_one, meal_pref, submitted_at)
         VALUES (?, ?, ?, ?, datetime('now'))`
      )
      .bind(cleanName, attending, cleanPlusOne, cleanMeal)
      .run();

    return json({ ok: true }, 201);
  } catch (err) {
    console.error("RSVP insert error:", err);
    return json({ error: "Failed to save RSVP. Please try again." }, 500);
  }
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
