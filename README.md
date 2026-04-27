[Live Demo](https://jobtracker-iota-peach.vercel.app/login)

# Job Interview Tracker

A simple web application to track job applications and interview processes, helping candidates manage interview stages, notes, salary expectations, and outcomes.

This project was built to explore **AI-assisted development** while maintaining high standards for **code quality, architecture, and maintainability**.

---

## ✨ Features

- Track job applications and interview processes
- Manage interview stages (HR, technical, final, etc.)
- Store notes for each interview step
- Track salary expectations and offers
- Sort and filter interview records
- Responsive UI

---

## 🧠 AI-assisted development

This project was initially started using **Cursor** to experiment with AI-driven prompts and AI-assisted development.

While AI was used to help bootstrap parts of the implementation, the codebase was **reviewed, refactored, and improved manually** to ensure:

- Readability
- Maintainability
- Type safety
- Good architectural practices

The goal was to explore how AI tools integrate into a **real-world development workflow** rather than relying entirely on generated code.

---

## 🛠 Tech Stack

**Frontend**

- Next.js (App Router)
- React
- TypeScript
- TanStack Table
- React Hook Form
- Zod
- TailwindCSS
- shadcn/ui
- Zustand (UI state management)

**Backend**

- Next.js Server Actions
- Prisma
- PostgreSQL

---

## 🏗 Architecture decisions

Some notable design choices:

- **Schema validation with Zod** for type-safe forms
- **DTO pattern** to separate database models from API responses
- **Server-side authentication checks** instead of trusting client input
- **Reusable form field components** to reduce duplication
- **Component maps instead of conditionals** for dynamic rendering
- **Strict TypeScript typing** across the entire stack

### State Management Strategy

The application separates **server state** from **UI state**:

**Server State**

- Interviews
- Interview steps
- Invoices
- Business Profiles

Handled through:

- Prisma
- Next.js Server Actions

**UI State**

- Modal visibility
- Temporary UI interactions
- Cross-component UI updates

Handled using **Zustand** to keep global UI state lightweight and predictable.

---

## 🚀 Getting Started

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env` file:

```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
```

### 4. Run database migration

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📚 What I learned

- How AI-assisted development can accelerate early development
- The importance of reviewing and refactoring AI-generated code
- Designing type-safe full-stack applications with Next.js and Prisma
- Structuring reusable form components with React Hook Form + Zod

## ⚠️ Technical Debt

- [ ] Update shadcn Form components (currently using Field + Input patterns)
- [x] Prisma models are transformed into DTOs before being returned to the client:

  ```ts
    export function mapInterviewToDTO(
      interview: Prisma.Interview
    ): InterviewDTO {
      return {
        id: interview.id,
        amount: interview.amount.toNumber(),
        ...
      };
    }

  ```

  This avoids exposing Prisma-specific types (such as Decimal) directly to the frontend.

- [ ] Retrieve userId directly from requireCurrentUser() in Server Actions
- [ ] Refactor tables to support pagination and reusable sorting logic
- [ ] Add pagination to business profiles for clients
- [ ] Improve loading skeletons when opening business profile modals
- [ ] Implement rate limit on server-actions and endpoints
- [x] Refactor register page
- [ ] Refactor hook to detect changes. Instead of create one for each record, we should have one hook where we can pass the record name to detect the change
- [ ] Call actions instead of data to fetch records on the UI

---

## 🔮 Future Improvements

- [-] Add **i18n** to standardize UI text and support multiple languages
- [ ] Implement **invoice generation**
- [ ] Track invoice status (sent, paid, pending)
- [ ] Add a **financial dashboard**
- [ ] Add query to know in which tab you are on invoice settings
- [ ] Add dropdown to change language (Should we save it?)

## 🚧 Work in Progress

The project is currently being extended with **invoice generation and tracking** features.

The goal is to allow users to:

- Generate invoices for completed work
- Track invoice status (sent, paid, pending)
- View financial information in a simple dashboard

These features are currently under development and will evolve as the project progresses.
