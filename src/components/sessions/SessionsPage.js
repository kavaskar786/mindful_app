import React, { useEffect, useState } from "react";

const SessionsPage = ({ userId }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const updatedSessions = await fetchSessions(userId);
      setSessions(updatedSessions);
    };

    fetchSessions();
  }, [userId]);

  return (
    <div>
      <h2>Your Sessions</h2>
      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <p>
                <strong>Date:</strong> {session.schedule}
              </p>
              <p>
                <strong>Google Meet Link:</strong>{" "}
                <a
                  href={session.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Meeting
                </a>
              </p>
              <p>
                <strong>Status:</strong> {session.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions scheduled.</p>
      )}
    </div>
  );
};

export default SessionsPage;
