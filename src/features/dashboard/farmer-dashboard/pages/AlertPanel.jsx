import React from "react";
import ChartCard from "../components/ChartCard";
import AlertTriggered from "../components/AlertTriggered";
import PendingAction from "../components/PendingAction";
import ServiceBooking from "../components/ServiceBooking";
import TicketResolved from "../components/TicketResolved";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function AlertPanel() {
  // Placeholder data for alerts and notifications
  const alertMetrics = [
    { label: "Total Alerts Triggered", value: 15 },
    { label: "Alerts Acknowledged (%)", value: "80%" },
    { label: "Advisory Tickets Resolved (%)", value: "70%" },
    { label: "Pending Actions", value: 4 },
    { label: "Services Booked", value: 2 },
  ];

  return (
    <ContentWrapper>
      <ChartCard title="Alerts & Notifications">
        <AlertTriggered />
        <TicketResolved />
        <PendingAction />
        <ServiceBooking />
      </ChartCard>
    </ContentWrapper>
  );
}
