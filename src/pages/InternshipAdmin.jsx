import { useState } from "react";
import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

function InternshipAdmin() {
  const [internships, setInternships] = useState([]);

  const form = useForm({
    initialValues: {
      title: "",
      company: "",
      location: "",
      duration: "",
      deadline: "",
      description: "",
      salary: "",
      requirements: "",
      idealCandidate: "",
      keyResponsibilities: "",
      internshipBenefits: "",
      expectedOutcomes: "",



    },
  });

  const handleSubmit = (values) => {
    setInternships([...internships, values]);
    form.reset(); // clear form after submit
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Admin - Add Internship</h2>

      {/* FORM */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Internship Title"
          placeholder="e.g Software Engineering Intern"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Company Name"
          placeholder="e.g Cavendish University"
          mt="sm"
          {...form.getInputProps("company")}
        />

        <TextInput
          label="Location"
          placeholder="e.g Lusaka / Remote"
          mt="sm"
          {...form.getInputProps("location")}
        />

        <TextInput
          label="Duration"
          placeholder="e.g 3 months"
          mt="sm"
          {...form.getInputProps("duration")}
        />

        <TextInput
          label="Application Deadline"
          placeholder="e.g 30 April 2026"
          mt="sm"
          {...form.getInputProps("deadline")}
        />

        <Textarea
          label="Description"
          placeholder="Describe the internship..."
          mt="sm"
          {...form.getInputProps("description")}
        />

        <Textarea
        label="Salary/Stipend"
        placeholder="e.g $1000/month or Unpaid"
        mt="sm"
        {...form.getInputProps("salary")}
        />


        <Textarea
          label="Requirements"
          placeholder="List requirements..."
          mt="sm"
          {...form.getInputProps("requirements")}
        />

        <Textarea
          label="Internship Benefits"
          placeholder="List the benefits..."
          mt="sm"
          {...form.getInputProps("internshipBenefits")}
        />

        <Textarea
          label="Key Responsibilities"
          placeholder="List the key responsibilities..."
          mt="sm"
          {...form.getInputProps("keyResponsibilities")}
        />

        <Textarea
          label="Ideal Candidate"
          placeholder="Describe the ideal candidate..."
          mt="sm"
          {...form.getInputProps("idealCandidate")}
        />

        <Textarea
            label="Expected Outcomes"   
            placeholder="List the expected outcomes..."
            mt="sm"
            {...form.getInputProps("expectedOutcomes")}
        />


        <Button type="submit" fullWidth mt="md">
          Add Internship
        </Button>
      </form>

      {/* DISPLAY */}
      <h3 style={{ marginTop: "20px" }}>Available Internship</h3>

      {internships.map((item, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <strong>{item.title}</strong>
          <p>{item.company}</p>
          <p>{item.location}</p>
          <p>{item.duration}</p>
          <p>{item.deadline}</p>
        </div>
      ))}
    </div>
  );
}

export default InternshipAdmin;