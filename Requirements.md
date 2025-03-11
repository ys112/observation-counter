Below is a suggested product requirements document in Markdown format:
(Build for mobile and desktop)

Observation Counter App - Product Requirements

1. Overview
   An application for recording animal behaviors. Users can set up counters for different activities, increment counts during a timed observation period, and save these session results to local storage.

2. Core Features
   Counter Creation and Management

Add counters with custom names (e.g., “Eating,” “Sleeping,” etc.).
Increment counters during an observation interval.
Display current values in a simple dashboard or list.
Session Saving

Save the current set of counters (names and values) to local storage as one session.
Provide an option to clear or reset counters for a new session.
Session Archive

View previously saved sessions in a table or list.
Include timestamps or session labels.
Timer/Interval Control

Display a timer to pace observation (e.g., 1 minute “record,” followed by 2 minutes “rest”).
Allow a configurable duration for both record and rest times. 3. Technical Requirements
Local Storage

Use browser local storage to store counter sessions.
Store each session as structured data (e.g., JSON).
UI/UX

Simple form or dialog to create or edit counters.
A large, clear counter display that updates in real time.
Timer controls and status indicators (e.g., “Recording,” “Rest,” “Time remaining”).
Responsiveness

Work on mobile, tablet, and desktop devices with a responsive layout.
Usability

Provide clear instructions or labels for adding counters and starting/stopping the timer.
Keep session data discoverable and easy to review.

4. User Flows
   Creating Counters
   User opens the app → clicks “Add Counter” → enters a new counter name → the counter appears on the main screen.
   Recording Observations
   User starts the timer → app displays the countdown → user increments counters when behaviors are observed → end of session triggers an option to save.
   Saving and Viewing Sessions
   User saves the current session → data is stored with date/time → user can then view past sessions in a table.

5. Enhancements
   Export sessions to CSV or PDF.
   Add charts or graphs for session analytics.
   User authentication for sharing data between devices.
