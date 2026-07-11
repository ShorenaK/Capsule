import { useEffect, useState, useCallback } from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CapsulesList from "../components/CapsulesList.jsx";
import CapsuleForm from "../components/CapsuleForm.jsx";

export default function IndexPage() {
  const [data, setCapsules] = useState(null);

  const fetchCapsules = useCallback(() => {
    fetch("/api/capsules")
      .then((response) => response.json())
      .then((data) => setCapsules(data));
  }, []);

  useEffect(() => {
    fetchCapsules();
  }, [fetchCapsules]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCapsules();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchCapsules]);

  const handleSubmit = async (capsule) => {
    try {
      const response = await fetch("/api/capsules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(capsule),
      });

      if (!response.ok) {
        throw new Error("Failed to create capsule");
      }

      const newCapsule = await response.json();
      setCapsules((prevCapsules) => [...prevCapsules, newCapsule]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row>
      <Col>
        <h1>Capsules</h1>
        <CapsulesList capsules={data} />
        <CapsuleForm onSubmit={handleSubmit} />
      </Col>
    </Row>
  );
}
