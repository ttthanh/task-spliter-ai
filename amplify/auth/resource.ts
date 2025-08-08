import { defineAuth } from "@aws-amplify/backend"

export const auth = defineAuth({
    loginWith: {
        email: true,
    },
    userAttributes: {
        preferredUsername: {
            mutable: true,
            required: false
        },
        "custom:team_name": {
            dataType: "String",
            mutable: true,
            maxLen: 100,
            minLen: 1,
        }
    },
    groups: ["ADMINS", "USERS"],
})