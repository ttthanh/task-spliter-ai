import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
    UserStory: a.model({
        id: a.id().required(),
        content: a.string(),
        userstory_id: a.string(),
        team_assigned: a.string(),
        sprint: a.string(),
        isDone: a.boolean(),
        inCharge: a.string(),
        tasks: a.hasMany('Task', 'user_story_id'),
    })
    .authorization(allow => [allow.publicApiKey()]),
    Task: a.model({
        title: a.string(),
        order: a.string(),
        progress: a.string(),
        estimate: a.string(),
        assignedTo: a.string(),
        user_id: a.string(),
        note: a.string(),
        user_story_id: a.string(),
        userstory: a.belongsTo('UserStory', 'user_story_id')
    }).authorization(allow => [allow.publicApiKey()]),
    ChatUS: a.model({
        room_id: a.string().required(),
        id: a.id().required(),
        user_id: a.string(),
        user_name: a.string(),
        chat_content: a.string()
    }).identifier(['room_id', 'id'])
    .authorization(allow => [allow.publicApiKey()]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: { expiresInDays: 30 }
    }
});