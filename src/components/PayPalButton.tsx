"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface PayPalButtonProps {
    itemId: string | number;
    type: "template" | "package";
    amount: number;
    templateSlug?: string;
    onSuccess?: (details: any) => void;
    clientId?: string;
    currency?: string;
}

export default function PayPalButton({ itemId, type, templateSlug, amount, onSuccess, clientId, currency = "USD" }: PayPalButtonProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const initialOptions = {
        clientId: clientId || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: currency,
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="w-full space-y-3">
                {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <PayPalButtons
                    style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "pay",
                    }}
                    disabled={isPending}
                    createOrder={async () => {
                        setError(null);
                        setIsPending(true);
                        try {
                            const res = await fetch("/api/paypal/create-order", {
                                method: "POST",
                                body: JSON.stringify({ itemId, type }),
                            });
                            const order = await res.json();
                            if (order.id) return order.id;
                            throw new Error(order.error || "Failed to create order");
                        } catch (err: any) {
                            setError(err.message);
                            setIsPending(false);
                            throw err;
                        }
                    }}
                    onApprove={async (data) => {
                        try {
                            const res = await fetch("/api/paypal/capture-order", {
                                method: "POST",
                                body: JSON.stringify({
                                    orderID: data.orderID,
                                    itemId,
                                    type
                                }),
                            });
                            const captureData = await res.json();

                            if (captureData.status === "COMPLETED") {
                                if (onSuccess) onSuccess(captureData);
                                router.push(`/thank-you?orderId=${captureData.id}&type=${type}&item=${itemId}${templateSlug ? `&slug=${templateSlug}` : ""}`);
                            } else {
                                throw new Error("Payment failed to capture");
                            }
                        } catch (err: any) {
                            setError(err.message);
                        } finally {
                            setIsPending(false);
                        }
                    }}
                    onCancel={() => {
                        setIsPending(false);
                    }}
                    onError={(err) => {
                        console.error("PayPal Error:", err);
                        setError("An error occurred with PayPal checkout");
                        setIsPending(false);
                    }}
                />

                {isPending && (
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Processing transaction...
                    </div>
                )}
            </div>
        </PayPalScriptProvider>
    );
}
