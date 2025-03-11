# Observation Counter

A web application for recording and tracking behavioral observations with timed sessions.

## Features

- Create custom counters for different behaviors
- Record observations with a configurable timer
- Save observation sessions
- View previous sessions
- Export data to CSV

## Usage Instructions

1. **Creating Counters**

   - Enter a behavior name in the "Counter Name" field
   - Click "Add Counter" to create a new counter
   - Repeat for each behavior you want to track

2. **Setting up the Timer**

   - Adjust "Record Time" for observation duration (in seconds)
   - Adjust "Rest Time" for break duration (in seconds)
   - Settings can only be changed when timer is stopped

3. **Recording Observations**

   - Click "Start Timer" to begin recording
   - Use the "+" button to count each occurrence of a behavior
   - Use the "-" button to correct mistakes
   - Counters are only active during recording phase
   - Timer will automatically switch between record and rest periods

4. **Saving Sessions**

   - Click "Save Session" to store the current counts
   - All counters will reset to 0 after saving
   - Previous sessions are displayed in the table below

5. **Exporting Data**
   - Click "Export CSV" to download all sessions
   - The CSV file includes dates, durations, and counts for all behaviors
