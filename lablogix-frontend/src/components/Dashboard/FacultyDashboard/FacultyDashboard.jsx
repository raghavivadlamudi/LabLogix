import React from "react";
import PendingSubmissionsTable from "./PendingSubmissionsTable";
import InternalEvaluation from "./InternalEvaluation";
import ExternalEvaluation from "./ExternalEvaluation";
import GenerateReportsButton from "./GenerateReportsButton";
import NotificationList from "./NotificationList";

export default function FacultyDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Faculty Dashboard</h1>

      <NotificationList />

      <div className="my-6">
        <h2 className="text-2xl mb-2">Pending Submissions</h2>
        <PendingSubmissionsTable />
      </div>

      <div className="my-6">
        <h2 className="text-2xl mb-2">Internal Evaluation</h2>
        <InternalEvaluation />
      </div>

      <div className="my-6">
        <h2 className="text-2xl mb-2">External Evaluation</h2>
        <ExternalEvaluation />
      </div>

      <div className="my-6">
        <GenerateReportsButton />
      </div>
    </div>
  );
}
