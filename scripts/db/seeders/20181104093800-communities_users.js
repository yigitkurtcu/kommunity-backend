import { CommunityUser as Model } from '../../../src/models/sql';
import bulkPromise from '../utils/bulk-promise';

const items = [
  {
    communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'applied',
    role: 'guest',
  },
  {
    communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'moderator',
  },
  {
    communityUuid: '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'admin',
  },
  {
    communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'applied',
    role: 'guest',
  },
  {
    communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'moderator',
  },
  {
    communityUuid: '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'admin',
  },
  {
    communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'applied',
    role: 'guest',
  },
  {
    communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'moderator',
  },
  {
    communityUuid: '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'admin',
  },
  {
    communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'member',
  },
  {
    communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'banned',
    role: 'moderator',
  },
  {
    communityUuid: '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'moderator',
  },
  {
    communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'invited',
    role: 'admin',
  },
  {
    communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'applied',
    role: 'guest',
  },
  {
    communityUuid: '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'moderator',
  },
  {
    communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467fee-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'owner',
  },
  {
    communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '3346776a-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'member',
  },
  {
    communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'approved',
    role: 'member',
  },
  {
    communityUuid: '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1',
    userUuid: '33467a44-d69d-11e8-9f8b-f2801f1b9fd1',
    status: 'banned',
    role: 'member',
  },
];

module.exports = {
  up: () => bulkPromise(Model, items),
  down: () => {},
};
