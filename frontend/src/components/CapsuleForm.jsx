import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function CapsuleForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting capsule:", { name, description });
    await onSubmit({ name, description });
    setName("");
    setDescription("");
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="name" label="Name">
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="description" label="Description">
        <Form.Control
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FloatingLabel>
      <Button type="submit">Submit</Button>
    </Form>
  );
}   