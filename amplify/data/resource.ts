import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
    UserStory: a.model({
        content: a.string(),
        isDone: a.boolean(),
        inCharge: a.string(),
    })
    .authorization(allow => [allow.publicApiKey()]),
    Task: a.model({
        title: a.string(),
        description: a.string(),
        status: a.string(),
        assignedTo: a.string(),
        user_story_id: a.string(),
    }).authorization(allow => [allow.publicApiKey()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: { expiresInDays: 30 }
    }
});