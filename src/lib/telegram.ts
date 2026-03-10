const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function sendTelegram(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
    return false
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    )
    const data = await res.json()
    if (!data.ok) {
      console.error('[Telegram] API error:', data)
      return false
    }
    return true
  } catch (err) {
    console.error('[Telegram] Fetch error:', err)
    return false
  }
}

// Riyadh timezone timestamp
export function riyadhTime(): string {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Riyadh',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function newLeadMessage(data: {
  name: string
  email: string
  phone?: string
  package_interest?: string
  message?: string
}): string {
  return `🔔 <b>NEW LEAD — BridgeFlow</b>
  
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Package: ${data.package_interest || 'Not specified'}
Message: ${data.message || 'N/A'}
Time: ${riyadhTime()} (Riyadh)`
}

export function newPurchaseMessage(data: {
  package_name: string
  amount: number
  buyer_name: string
  buyer_email: string
  transaction_id: string
}): string {
  return `💰 <b>NEW SALE — BridgeFlow</b>

Package: ${data.package_name}
Amount: $${data.amount}
Buyer: ${data.buyer_name} (${data.buyer_email})
PayPal ID: ${data.transaction_id}
Time: ${riyadhTime()} (Riyadh)`
}
