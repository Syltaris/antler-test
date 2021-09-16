# Antler Founder's Hub

## Issue

Antler India has just set up a new cohort in the Antler Founder’s Hub, and have reached out to
you to advise of a bug which all of the founders are experiencing when clicking into their ‘My
Team’ section.

Debug msg: Cannot read property `replace` of undefined.

## Steps

1. Clarify on the issue

- Get more details from the user if possible
  -- User's account data (user id, etc., so we can see if there's issue with unclean data)
  -- Find out if it's the first time it happened
  -- Has it happened before? Did it happen after an update? (reference to own deployments)

- Try to get the sequence of the user's actions
  -- We want to get the specifics of what exactly happened before they reached this error
  -- Could hint towards some buggy data, or unclean state
  -- Can try to replicate on developer's env/staging

2. Attempt to replicate the issue

- On own environment, try to replicate the user's actions, see if error occurs
- Should also set up environment to match current production state (latest code changes)
- If can't replicate on own environment, then can try analyzing the user's data, and replicate that state

Idea is to attempt to pinpoint to the specific problem in code. Also helps to get a better sense of the exact
group of users affected.

3. Pinpoint the erroneous code

- Get more details on errors if possible
  -- Open up web inspector, and check if there's console logs or network issues that are raised
- Analyze the error message if present, luckily we have the hint: `Cannot read property replace of undefined`
  -- The hint suggests that some variable is undefined, and we're trying to call `.replace` on the variable
  -- This probably hints that some string/list variable that is supposed to be present is unexpectedly not so, hence the error

4. Attempt to fix the code

- For this specific problem, there are 2 ways we can fix it:
  -- We either use optional chaining, which will show a blank string/list if it's undefined. `variable?.`
  -- Or, more likely, it's a data issue, and we should help update the values in the database if it's missing, or it could be a
  -- frontend issue, where the data is not passed down to that specific component somehow. If this is the case, then the error
  -- likely needs a bit more work to be done to fix, as it could be symptom of another issue (e.g. data not being updated properly elsewhere)

- Urgent bugs should have a hotfix, else we can have a datapatch first

5. Sound off to the team

- The error occurred for a reason, means there's something to improve on
  -- e.g. improving code reviews
