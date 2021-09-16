// CREATE FOUNDER UPDATE - NORMAL
{
  type: "sendTweet",
  triggers: ["create"], // trigger when new record is put into founder updates table
  shouldRun: ({ row }) => !row.doNotPublish, // only run if doNotPublish is false
  requiredFields: ["title"], 
  sparkBody: { 
    status: ({row}) => `${row.title}`,
    createdBy: ({row}) => row.createdBy,
  }
}