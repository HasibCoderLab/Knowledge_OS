# FEATURES.md - KnowledgeOS Feature Specification

KnowledgeOS is a multi-faceted application. Below is the complete breakdown of intended features, categorized by functional module.

---

## 👤 Core & Identity
- **Authentication**: Secure Login, Registration, Password Reset, and Session Management (JWT).
- **User Profile**: Custom avatar, bio, and personal stats (Reading/Learning/Habit streaks).
- **Settings**: Theme selection (Dark/Light/System), language, notification preferences, and privacy settings.

## 🏠 Dashboard (The Command Center)
- **Overview**: At-a-glance view of "Today's Progress".
- **Widgets**:
  - Current Book & Reading %
  - Today's Habits checklist
  - Top Tasks for today
  - Upcoming Goals/Deadlines
  - Quick-Add buttons (Add Book, Add Note, Add Task)
  - Daily Quote/Inspiration

## 📚 Book & Reading Engine
- **Book Library**: A digital shelf to manage all books (Reading, Completed, Wishlist, Dropped).
- **Book Profiles**: Detailed view including cover, author, category, pages, and status.
- **Reading Tracker**:
  - Log reading sessions (Date, Time, Pages read).
  - Progress bar (Current page vs. Total pages).
  - Reading Streak tracking.
- **Knowledge Capture**:
  - **Highlights**: Extracting key passages.
  - **Notes**: Contextual notes linked to specific books or pages.
  - **Vocabulary**: A dedicated space for new words found in books.
  - **Quote Library**: A collection of favorite quotes for easy retrieval.

## 📝 Knowledge Base (Smart Notes)
- **Markdown Support**: Writing notes using Markdown syntax.
- **Rich Text Support**: For a more visual note-taking experience.
- **Tagging System**: Cross-referencing notes with tags (e.g., `#psychology`, `#coding`).
- **Attachments**: Attaching images, PDFs, or screenshots to notes.
- **Linking**: Ability to link notes to books or other notes.

## 🎯 Productivity & Growth
- **Goal Management**:
  - **Long-term Goals**: Major life/career milestones.
  - **Short-term Goals**: Smaller, actionable objectives.
  - **Progress Tracking**: Visual progress bars for each goal.
- **Task Manager**:
  - Todo lists categorized by priority and due date.
  - Recurring tasks support.
- **Habit Tracker**:
  - Daily habit checklists.
  - Visual Heatmap (similar to GitHub contribution graph).
- **Journaling**:
  - Daily reflections and "Today I Learned" entries.
  - Mood tracking and productivity reflections.

## 📊 Insights & Discovery
- **Analytics Dashboard**:
  - Charts for reading time, habit completion, and goal progress.
  - Statistical trends (e.g., "Most productive day of the week").
- **Global Search**: A powerful search bar to find anything (Books, Notes, Tasks, Quotes, etc.) instantly.
- **Periodic Reviews**: Automated prompts for Weekly, Monthly, and Yearly reflections.

## 🛠️ Utilities & System
- **File Management**: Uploading images/PDFs (Cloudinary integration).
- **Data Portability**: Exporting data in JSON, Markdown, or PDF formats.
- **Backup & Restore**: Ensuring user data is safe and recoverable.
- **Achievements**: Gamification via badges and milestones (e.g., "10 Books Read").
- **Notifications**: Reminders for reading, habits, and upcoming tasks.

## 🚀 Future Enhancements (Roadmap)
- **AI Assistant**: AI-powered note summarization, quiz generation, and concept explanation.
- **Spaced Repetition**: Smart review system for vocabulary and notes.
- **Focus Mode**: Pomodoro timer and distraction-free reading interface.
