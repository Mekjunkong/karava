"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function InquiryForm() {
  const t = useTranslations("contact.form");
  const ts = useTranslations("contact.success");
  const tp = useTranslations("packages.filter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const traditionOptions = [
    { value: "buddhist", label: tp("buddhist") },
    { value: "christian", label: tp("christian") },
    { value: "chinese", label: tp("chinese") },
    { value: "secular", label: tp("secular") },
    { value: "custom", label: tp("custom") },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // In production, call the server action:
    // const formData = new FormData(e.currentTarget);
    // const result = await submitInquiry(formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={56} className="text-success mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-primary mb-3">{ts("title")}</h3>
        <p className="text-muted text-lg">{ts("message")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          placeholder="0XX-XXX-XXXX"
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

      <Select
        id="tradition"
        name="tradition"
        label={t("tradition")}
        options={traditionOptions}
        placeholder={t("tradition")}
      />

      <Input
        id="deceased_name"
        name="deceased_name"
        label={t("deceasedName")}
        placeholder={t("deceasedName")}
      />

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
          min="1"
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
