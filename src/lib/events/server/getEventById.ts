export async function getEventById(eventId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`, { cache: "no-cache",});
    if (!res.ok) throw new Error('Failed to fetch event');
    return res.json();
}