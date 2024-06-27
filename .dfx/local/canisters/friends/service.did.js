export const idlFactory = ({ IDL }) => {
  const FriendRequest = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'sender' : IDL.Principal,
    'message' : IDL.Text,
  });
  const Friend = IDL.Record({
    'name' : IDL.Text,
    'canisterId' : IDL.Principal,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const FriendRequestError = IDL.Variant({
    'AlreadyRequested' : IDL.Null,
    'AlreadyFriend' : IDL.Null,
    'NotEnoughCycles' : IDL.Null,
  });
  const FriendRequestResult = IDL.Variant({
    'ok' : IDL.Null,
    'err' : FriendRequestError,
  });
  const FriendsCanister = IDL.Service({
    'reboot_friends_getFriendRequests' : IDL.Func(
        [],
        [IDL.Vec(FriendRequest)],
        ['query'],
      ),
    'reboot_friends_getFriends' : IDL.Func([], [IDL.Vec(Friend)], []),
    'reboot_friends_handleFriendRequest' : IDL.Func(
        [IDL.Nat, IDL.Bool],
        [Result],
        [],
      ),
    'reboot_friends_receiveFriendRequest' : IDL.Func(
        [IDL.Text, IDL.Text],
        [FriendRequestResult],
        [],
      ),
    'reboot_friends_removeFriend' : IDL.Func([IDL.Principal], [Result], []),
    'reboot_friends_sendFriendRequest' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [FriendRequestResult],
        [],
      ),
    'reboot_supportedStandards' : IDL.Func(
        [],
        [IDL.Vec(IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text }))],
        ['query'],
      ),
  });
  return FriendsCanister;
};
export const init = ({ IDL }) => { return [IDL.Text]; };
