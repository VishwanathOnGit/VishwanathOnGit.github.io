
# 📌 PROJECT BRIEF: Polished Static Portfolio (Frontend Only)

## 🧠 Goal
Build a **highly polished, fully responsive**, and **static-only** portfolio website using **Next.js (App Router)** and **TailwindCSS**. The focus is on **UI/UX excellence**, visual transitions, and user engagement — no backend for now.

---

## 🛠️ Tech Stack

| Layer         | Tech                    |
|---------------|-------------------------|
| Framework     | **Next.js (App Router)**|
| Styling       | **TailwindCSS**         |
| Animations    | **Framer Motion**       |
| Visual Effects| **Meteor.js** (for banner or background UI) |
| Deployment    | **Vercel**              |

---

## 🔧 Functional Scope (Static-Only)

### 🧑‍🚀 Hero Section
- [ ] Fullscreen banner with **dynamic Meteor.js background**
- [ ] Catchy headline, subtitle, and CTA buttons (e.g., “View Projects” / “Contact Me”)
- [ ] Smooth entrance animations (Framer Motion)
- [ ] Optional: Typewriter or fade-in text effects

### 👨‍💼 About Section
- [ ] Short, impactful bio
- [ ] Profile image with hover effects
- [ ] Skills grid (icons or tags with subtle animation)
- [ ] Responsive timeline for experience/education

### 🧩 Projects Section
- [ ] Showcase 3–6 featured projects
- [ ] Card-style layout with hover transitions
- [ ] Modal or link to `/projects/[slug]` for detail view (still static)
- [ ] Tags for tech stack used (e.g., React, Tailwind, Firebase)

### 📄 Resume Section
- [ ] Button to **download resume**
- [ ] Optionally embed a preview in a modal

### 📫 Contact Section
- [ ] **No form** (since no backend)
- [ ] Use mailto link with pre-filled subject/message
- [ ] Display email, LinkedIn, GitHub buttons
- [ ] Optionally: QR code for resume or contact

### 🔘 UI Polish & Micro-UX
- [ ] **Dark/light mode toggle** using `next-themes`
- [ ] Smooth **scroll and section transitions**
- [ ] **Button hover states** with visual feedback
- [ ] **Scroll-to-top button**
- [ ] Section indicator in navbar (active highlighting)

### 🚀 Performance & Accessibility
- [ ] Use `next/image` for optimized images
- [ ] Lighthouse score >90 (accessibility, perf, SEO)
- [ ] Mobile-first responsive breakpoints
- [ ] Keyboard-navigable components
- [ ] Descriptive alt texts, roles, and labels

### 📘 Optional Additions
- [ ] Blog section using MDX (static markdown files)
- [ ] Projects/skills loaded from static JSON for easy updates

---

## 📁 Suggested Folder Structure

```
/app
  /about
  /projects
  /resume
  /contact
  layout.tsx
  page.tsx
/components
  Hero.tsx
  ProjectCard.tsx
  SkillTag.tsx
  TimelineItem.tsx
  Navbar.tsx
  Footer.tsx
  ThemeToggle.tsx
/data
  projects.json
  skills.json
/public
/styles
  globals.css
  tailwind.config.ts
/utils
/types
```

---

## 🧪 Quality Focus

- [ ] **Pixel-perfect layout** on all devices
- [ ] Smooth page load and transitions
- [ ] Thoughtful motion and hover feedback
- [ ] Typography and spacing based on a design system
- [ ] No backend — all content pre-rendered or static

---
