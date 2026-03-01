"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function PackageInquiryForm({ packageName }: { packageName: string }) {
  const t = useTranslations("contact.form");
  const ts = useTranslations("contact.success");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // In production, this would submit to Supabase via server action
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-primary mb-2">{ts("title")}</h3>
        <p className="text-muted">{ts("message")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="package" value={packageName} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="name"
          name="name"
          label={`${t("name")} *`}
          required
          placeholder={t("name")}
        />
        <Input
          id="phone"
          name="phone"
          label={`${t("phone")} *`}
          type="tel"
          required
          placeholder="092-989-4495"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="email"
          name="email"
          label={t("email")}
          type="email"
          placeholder={t("email")}
        />
        <Input
          id="line_id"
          name="line_id"
          label={t("lineId")}
          placeholder="@username"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="date"
          name="date"
          label={t("preferredDate")}
          type="date"
        />
        <Input
          id="guests"
          name="guests"
          label={t("estimatedGuests")}
          type="number"
          placeholder="50"
        />
      </div>
      <Textarea
        id="message"
        name="message"
        label={t("message")}
        placeholder={t("message")}
        rows={4}
      />
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
