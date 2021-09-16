# Creating a basic working example of functionality using Antler technology.

...

## Spark/Extensions feature

- Ability for 'cloud functions' to be written and deployed at front-end
- When items within a table are created (insert into collection), updated or deleted,
  set of sparks are triggered, which variety of conditions to checked with
  ** e.g. send slack message to channel
  ** sync to Algolia
- Spark logic is in Google Cloud Run container

# Task

Magnus, our CEO, has approached the tech team to figure out a solution to founders having to
copy and paste links from the Antler Investor Platform to their personal twitter feeds. The
product team prioritises and summarises this request, and comes to the conclusion that this can
be achieved through a Firetable spark which posts to Twitter whenever a new document is
added into the founder update table.

## Example (Sparks)

```
    interface IFounderUpdate {
        title: string;
        updateBody: string;
        createdAt: firebase.firestore.Timestamp;
        createdBy: string;
        doNotPublish: boolean;
    }

// spark.ts
  {
    triggers: ["create"], // RUN ON TABLE CREATE
    shouldRun: ({ row }) => !row.directOnboard, // FILTER PARAMS/CONDITIONALS
    requiredFields: ["firstName", "email"],  // FILTER, CHECKS FOR REQUIRED FIELDS ON DATA ROW


    type: "sendgridEmail", // TYPE OF SPARK TO RUN
    sparkBody: {
        // HOW TO GENERATE THE MESSAGE
      msg: ({ row }) => ({
        from: "Heath @ Antler Launch Academy<heath.jamieson@antler.co>", // PRE-POPULATE WITH USER DETAILS
        personalizations: [
          {
            to: row.email,
            dynamic_template_data: {
              first_name: row.firstName,
            },
          },
        ],
        templateId: "d-c192e027e6f64fea9dfefaf416f07c2c", // SENDGRID?
        asm: {
          group_id: 93235,
        },
      }),
    },
  },
```

This spark is triggered from the ‘students’ table, when:
● A new row is created (triggers: [‘create’])
● As long as the student is not a directOnboard student (shouldRun: ({row}) => !row.directOnboard)
● The row has the firstName and email fields (requiredFields: [‘firstName’, ‘email’])

## Output

For this exercise, you should ignore all requirements around security, authorization, setting up
the environments, and performance, but feel free to raise them if you believe they are highly
relevant in the design. You also only need to implement the required parameters through the
API (being ‘status’) for the below.

As an output of this exercise, we should have:
● The backend spark, which sits in the ‘sparksLib’ folder, which sends a Tweet using the
POST Statuses Twitter API endpoint
● The frontend spark, which is triggered when a new update is put into the founder
updates table, and sends the title of the update to twitter as long as doNotPublish is
false
