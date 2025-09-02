import React, { useMemo, useState } from "react";
import FeedbackList from "./components/FeedbackList.jsx";

export default function App() {
  const batches = useMemo(() => {
    const years = [];
    for (let y = 2020; y <= 2025; y++) years.push(String(y));
    return years;
  }, []);

  const courses = [
    "Data Structures",
    "Operating Systems",
    "Database Systems",
    "Software Engineering",
    "Computer Networks",
    "Discrete Mathematics",
  ];

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    batch: "",
    course: "",
    instructor: "",
    rating: "",
    feedback: "",
  });
  const [errors, setErrors] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const newErr = {};
    if (!form.email.trim()) newErr.email = "Email is required";
    if (!form.batch) newErr.batch = "Batch is required";
    if (!form.course) newErr.course = "Course is required";
    if (!form.instructor.trim()) newErr.instructor = "Instructor is required";
    if (!form.rating) newErr.rating = "Rating is required";
    if (!form.feedback.trim()) newErr.feedback = "Feedback is required";
    return newErr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErr = validate();
    if (Object.keys(newErr).length) {
      setErrors(newErr);
      setSuccess("");
      return;
    }

    const entry = {
      id: crypto.randomUUID(),
      fullName: form.fullName.trim() || "Anonymous",
      email: form.email.trim(),
      batch: form.batch,
      course: form.course,
      instructor: form.instructor.trim(),
      rating: Number(form.rating),
      feedback: form.feedback.trim(),
    };

    setFeedbacks((list) => [entry, ...list]);
    setSuccess("Feedback submitted successfully!");

    setForm({
      fullName: "",
      email: "",
      batch: "",
      course: "",
      instructor: "",
      rating: "",
      feedback: "",
    });
    setErrors({});

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="brand">Student Feedback Portal</h1>
        <p className="tagline">Share your course experience with us</p>
      </header>

      <main className="container">
        <section className="card">
          <h2 className="section-title">Submit Feedback</h2>
          {success && <div className="alert alert--success">{success}</div>}

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="grid">
              <div className="form__field">
                <label htmlFor="fullName">Full name (optional)</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g., Ayesha Khan"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="form__field">
                <label htmlFor="email">
                  Email <span className="req">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="form__field">
                <label htmlFor="batch">
                  Batch <span className="req">*</span>
                </label>
                <select
                  id="batch"
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                >
                  <option value="">Select batch</option>
                  {batches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                {errors.batch && <p className="error">{errors.batch}</p>}
              </div>

              <div className="form__field">
                <label htmlFor="course">
                  Course <span className="req">*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.course && <p className="error">{errors.course}</p>}
              </div>

              <div className="form__field">
                <label htmlFor="instructor">
                  Instructor <span className="req">*</span>
                </label>
                <input
                  id="instructor"
                  name="instructor"
                  type="text"
                  placeholder="e.g., Dr. Ahmed"
                  value={form.instructor}
                  onChange={handleChange}
                />
                {errors.instructor && (
                  <p className="error">{errors.instructor}</p>
                )}
              </div>

              <fieldset className="form__field form__field--full">
                <legend>
                  Rating (1–5) <span className="req">*</span>
                </legend>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <label key={r} className="rating__option">
                      <input
                        type="radio"
                        name="rating"
                        value={r}
                        checked={String(form.rating) === String(r)}
                        onChange={handleChange}
                      />
                      <span className="rating__label">{r}</span>
                    </label>
                  ))}
                </div>
                {errors.rating && <p className="error">{errors.rating}</p>}
              </fieldset>

              <div className="form__field form__field--full">
                <label htmlFor="feedback">
                  Feedback <span className="req">*</span>
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Write your comments here..."
                  rows={5}
                  value={form.feedback}
                  onChange={handleChange}
                />
                {errors.feedback && <p className="error">{errors.feedback}</p>}
              </div>
            </div>

            <div className="form__actions">
              <button type="submit" className="btn">
                Submit
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setForm({
                    fullName: "",
                    email: "",
                    batch: "",
                    course: "",
                    instructor: "",
                    rating: "",
                    feedback: "",
                  });
                  setErrors({});
                  setSuccess("");
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        <section className="card">
          <h2 className="section-title">All Feedback</h2>
          <FeedbackList items={feedbacks} />
        </section>
      </main>

      <footer className="app__footer"></footer>
    </div>
  );
}
