import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchAllLeads } from "../api/leads";
import { buildWhatsAppUrlTo } from "../utils/whatsapp";
import { toWhatsAppNumber } from "../utils/phone";
import EmailLeadModal from "./EmailLeadModal";
import styles from "./LeadsManager.module.css";

function LeadsManager() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailingLead, setEmailingLead] = useState(null);

  useEffect(() => {
    fetchAllLeads(token)
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading leads...</p>;
  if (leads.length === 0) return <p>No leads captured yet.</p>;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.source}</td>
              <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td>
                <div className={styles.actions}>
                  <a
                    href={buildWhatsAppUrlTo(
                      toWhatsAppNumber(lead.phone),
                      `Hi ${lead.name}, following up on your ATClean inquiry!`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    WhatsApp
                  </a>
                  <button
                    className={styles.actionButton}
                    onClick={() => setEmailingLead(lead)}
                  >
                    Email
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {emailingLead && (
        <EmailLeadModal lead={emailingLead} onClose={() => setEmailingLead(null)} />
      )}
    </div>
  );
}

export default LeadsManager;
