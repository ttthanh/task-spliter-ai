import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource.ts';
import { auth } from './auth/resource.ts';

defineBackend({
    data,
    auth
});